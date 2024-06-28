"use server";
import { prismaConnect } from "@/db/prismaGenerate";
import axios from "axios";

var loginBoolean = false;
export async function SetloginState(email: string, password: string) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const response = await axios.post(`${backendUrl}/api/admin`, {
    email: email,
    password: password,
  });
  console.log(response.status);
  if (response.status == 200) {
    loginBoolean = true;
  } else {
    loginBoolean = false;
  }
}
export async function getLoginState() {
  "use client";
  return loginBoolean;
}

export async function getComments() {
  const prisma = prismaConnect;
  const comments = await prisma.comment.findMany({
    select: {
      content: true,
      messageId: true,
      user: true,
      id: true,
      likes: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  prisma.$disconnect();
  return comments;
}
export async function deleteComment(id: number) {
  const prisma = prismaConnect;
  const deleteComment = await prisma.comment.delete({
    where: { id: id },
  });
  prisma.$disconnect();
  return deleteComment;
}
export async function getBlogs() {
  const prisma = prismaConnect;
  const blogs = await prisma.message.findMany({
    select: {
      title: true,
      category: true,
      sender: true,
      id: true,
      views: true,
      draft: true,
      likes: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  prisma.$disconnect();
  return blogs;
}
export async function updateBlog(id: number, data: any) {
  const prisma = prismaConnect;

  if (data.password == process.env.ADMIN_PASSWORD) {
    const { password, ...dataWithoutPassword } = data;

    const update = await prisma.message.update({
      where: { id: id },
      data: dataWithoutPassword,
    });
    prisma.$disconnect();
    return update;
  }
}

export const getSingleBlog = async (id: number) => {
  const prisma = prismaConnect;
  const blog = await prisma.message.findUnique({
    where: { id: id },
  });
  prisma.$disconnect();

  return blog;
};
