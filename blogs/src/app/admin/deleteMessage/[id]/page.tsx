"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

import { SideBar } from "../../sidebar";
import { getLoginState } from "../../loginState";
import { useRouter } from "next/navigation";

import Admin from "../../adminLogin";
interface FormData {
  blogID: string;
  password: string;
}

const BlogForm: React.FC<{params: {id: string}}> = (params) => {
  const [loginState, setLoginState] = useState<boolean>(false);
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    blogID: params.params.id,
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
        // Blog deleted successfully
        // Redirect or display success message
        console.log("Blog deleted successfully");
        setFormData({
          blogID: "",
          password: "",
        });
        router.push("/admin");
      } else {
        // Handle error response
        console.error("Failed to delete blog");
      }
    } catch (error: any) {
      console.error("Error deleting blog:", error.message);
    }
  };
  
  const fetchLoginState = async () => {
    setLoginState(await getLoginState());
  };
  useEffect(() => {
    fetchLoginState();
  }, []);
  if (loginState === false) {
    return <Admin />;
  } else {
    return (
      <div className="w-screen h-screen flex flex-row bg-gray-100">
        <div className="h-full w-1/6 bg-gray-700">
          <SideBar />
        </div>
        <div className="h-full w-5/6 flex justify-center items-center">
          <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
              Delete a Blog
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="blogID"
                  className="block text-sm font-medium text-gray-700"
                >
                  Blog ID:
                </label>
                <input
                  type="text"
                  id="blogID"
                  name="blogID"
                  value={formData.blogID}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Admin Password:
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default BlogForm;
