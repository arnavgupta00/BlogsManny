"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  blogID: string;

  password: string;
}

const BlogForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    blogID: "",
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
    try {
      const response = await fetch(`/api/blogs`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Blog created successfully
        // Redirect or display success message
        console.log("Blog Deleted successfully");
        setFormData({
          blogID: "",
          password: "",
        });
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
              Blog ID:
            </label>
            <input
              type="text"
              id="sender"
              name="blogID"
              value={formData.blogID}
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
