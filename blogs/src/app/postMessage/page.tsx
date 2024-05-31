"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { backendServer } from "@/components/backendServer";


interface FormData {
  sender: string;
  category: string;
  title: string;
  shortDescription: string;
  content: string;
  imageURL: string;
  URL: string;
  password: string;
}

const BlogForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    sender: "",
    category: "",
    title: "",
    shortDescription: "",
    content: "",
    imageURL: "",
    URL: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const backendURL = backendServer;
    try {
        const response = await fetch(`${backendURL}/blogs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          // Blog created successfully
          // Redirect or display success message
          console.log("Blog created successfully");
        } else {
          // Handle error response
          console.error("Failed to create blog");
        }
      
    } catch (error: any) {
      console.error("Error creating blog:", error.message);
    }
  };
  return (
    <div
      className="bg-zinc-400 pt-16 pb-16"
      style={{ maxWidth: "100vw", maxHeight: "max" }}
    >
      <div className="max-w-lg mx-auto mt-8 p-6 bg-zinc-600 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center text-white">
          Create a New Blog
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="sender"
              className="block text-sm font-medium text-white"
            >
              Sender:
            </label>
            <input
              type="text"
              id="sender"
              name="sender"
              value={formData.sender}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-white"
            >
              Category:
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-white"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="shortDescription"
              className="block text-sm font-medium text-white"
            >
              Short Description:
            </label>
            <textarea
              id="shortDescription"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-white"
            >
              Content:
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="imageURL"
              className="block text-sm font-medium text-white"
            >
              Image URL:
            </label>
            <input
              type="text"
              id="imageURL"
              name="imageURL"
              value={formData.imageURL}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="URL"
              className="block text-sm font-medium text-white"
            >
              URL:
            </label>
            <input
              type="text"
              id="URL"
              name="URL"
              value={formData.URL}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white"
            >
              PASSWORD
            </label>
            <input
              type="text"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
