"use server";
import { prismaConnect } from "@/db/prismaGenerate";

var loginBoolean = false;
export async function SetloginState(email: string, password: string) {
  if (
    email == process.env.ADMIN_EMAIL &&
    password == process.env.ADMIN_PASSWORD
  ) {
    loginBoolean = true;
  } else {
    loginBoolean = false;
  }
}
export async function getLoginState() {
  "use client";
  return loginBoolean;
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
