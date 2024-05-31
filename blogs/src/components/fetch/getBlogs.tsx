import "dotenv/config";

import Message, { Project } from "@/components/schema/schema";
import messageList from "@/components/testData/messages";
import { backendServer } from "@/components/backendServer";

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
const backendURL = backendServer;
export const fetchBlog = async (blogId: number) => {
  try {
    const response = await fetch(`${backendURL}/blogs/${blogId}`);

    if (response.ok) {
      const blog = await response.json();
      return blog;
    } else {
      console.error("Error fetching blog post reqSent:", response.statusText);
      // Handle error (e.g., display an error message)
      return project;
    }
  } catch (error) {
    console.error("Error fetching blog post:", error);
    // Handle error (e.g., display an error message)
    return project;

  }
};

export const fetchBlogs = async (category:string) => {
  try {
    const response = await fetch(`${backendURL}/blogs/category/${category}`);

    if (response.ok) {
      const blogsData = await response.json();
      return blogsData;
    } else {
      console.error('Error fetching blogs reqSent:', response.statusText);
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
    const response = await fetch(`${backendURL}/categories`);
    if (response.ok) {
      var categories = await response.json();
      categories = categories.map((item: { category: any; }) => item.category);

      
      return categories;
    } else {
      console.error('Error fetching categories Req:', response.statusText);
      // Handle error (e.g., display an error message)
      
      
      return [];
    }
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Handle error (e.g., display an error message)
    return [];
  }
};