"use server";
import axios from "axios";
import Message, { Project } from "@/components/schema/schema";
import messageList from "@/components/testData/messages";
import { prismaConnect } from "@/db/prismaGenerate";
const messages: Message[] = messageList();

const project: Project = {
  URL: messages[0].URL,
  title: messages[0].title,
  shortDescription: messages[0].shortDescription,
  content: messages[0].content,
  views: messages[0].views,
  category: messages[0].category,
  imageURL: messages[0]?.imageURL,
  repository: "string",
};

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const postBlog = async (formData: any) => {
  try {
    const response = await axios.post(`${backendUrl}/api/blogs`, formData);

    if (response.status === 201) {
      // Blog created successfully
      // Redirect or display success message
      console.log("Blog created successfully");
      return true;
    } else {
      console.error("Error creating blog post:", response.statusText);
      // Handle error (e.g., display an error message)
      return false;
    }
  } catch (error) {
    console.error("Error creating blog post:", error);
    // Handle error (e.g., display an error message)
    return false;
  }
};

export const likeBlog = async (blogId: number) => {
  const prisma = prismaConnect;

  const blog = await prisma.message.findUnique({
    where: { id: blogId },
    select: { likes: true },
  });

  if (blog && blog.likes !== null) {
    const likes = blog.likes + 1;

    await prisma.message.update({
      where: { id: blogId },
      data: { likes: likes },
    });

    prisma.$disconnect();

    return likes;
  } else {
    prisma.$disconnect();
    return 0;
  }
  
}

export const postComment = async (
  blogId: number,
  user: string,
  content: string
) => {
  try {
    const response = await axios.post(`${backendUrl}/api/blogs/${blogId}`, {
      user,
      content,
    });

    if (response.status === 201) {
      // Comment created successfully
      // Redirect or display success message
      console.log("Comment created successfully");
      return true;
    } else {
      console.error("Error creating comment:", response.statusText);
      // Handle error (e.g., display an error message)
      return false;
    }
  } catch (error) {
    console.error("Error creating comment:", error);
    // Handle error (e.g., display an error message)
    return false;
  }
};

export const fetchComments = async (blogId: number) => {
  // Use PrismaClient to fetch comments from the database
  const prisma = prismaConnect;
  const comments = await prisma.comment.findMany({
    where: { messageId: blogId },
    select: {
      user: true,
      content: true,
      likes: true,
      createdAt: true,
    },
  });

  prisma.$disconnect();

  return comments;
};

export const putBlog = async (
  blogId: number,
  draft: boolean,
  password: string
) => {
  try {
    const response = await axios.put(`${backendUrl}/api/blogs`, {
      blogID: blogId,
      draft: draft,
      password: password,
    });

    if (response.status === 200) {
      // Blog updated successfully
      // Redirect or display success message
      console.log("Blog updated successfully");
      return true;
    } else {
      console.error("Error updating blog post:", response.statusText);
      // Handle error (e.g., display an error message)
      return false;
    }
  } catch (error) {
    console.error("Error updating blog post:", error);
    // Handle error (e.g., display an error message)
    return false;
  }
};

export const fetchBlog = async (blogId: number) => {
  try {
    const response = await axios.get(`${backendUrl}/api/blogs/${blogId}`);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Error fetching blog post:", response.statusText);
      // Handle error (e.g., display an error message)
      return project;
    }
  } catch (error) {
    console.error("Error fetching blog post:", error);
    // Handle error (e.g., display an error message)
    return project;
  }
};

export const fetchBlogs = async (category: string) => {
  try {
    const response = await axios.get(
      `${backendUrl}/api/blogs/category/${category}`
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Error fetching blogs:", response.statusText);
      // Handle error (e.g., display an error message)
      return messages;
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    // Handle error (e.g., display an error message)
    return messages;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/categories/All`);

    if (response.status === 200) {
      const categories = response.data.map(
        (item: { category: any }) => item.category
      );
      return categories;
    } else {
      console.error("Error fetching categories:", response.statusText);
      // Handle error (e.g., display an error message)
      return [];
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    // Handle error (e.g., display an error message)
    return [];
  }
};
