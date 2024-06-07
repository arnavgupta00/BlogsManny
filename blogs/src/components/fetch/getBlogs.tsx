"use server"
import axios from 'axios';
import Message, { Project } from "@/components/schema/schema";
import messageList from "@/components/testData/messages";

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
}

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
    const response = await axios.get(`${backendUrl}/api/blogs/category/${category}`);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Error fetching blogs:', response.statusText);
      // Handle error (e.g., display an error message)
      return messages;
    }
  } catch (error) {
    console.error('Error fetching blogs:', error);
    // Handle error (e.g., display an error message)
    return messages;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/categories/All`);

    if (response.status === 200) {
      const categories = response.data.map((item: { category: any; }) => item.category);
      return categories;
    } else {
      console.error('Error fetching categories:', response.statusText);
      // Handle error (e.g., display an error message)
      return [];
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Handle error (e.g., display an error message)
    return [];
  }
};
