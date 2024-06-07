"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { SideBar } from "../../sidebar";
import { getLoginState, getSingleBlog,updateBlog } from "../../loginState";
import Admin from "../../adminLogin";
import { useRouter } from "next/navigation";

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



const EditBlogForm: React.FC<{params: {id: string}}> = (params) => {
  const [loginState, setLoginState] = useState<boolean>(false);
  const router = useRouter();

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

  const blogId = parseInt(params.params.id);

  const fetchBlogData = async () => {
    try {
      
      const blog = await getSingleBlog(blogId);
      
      if (blog) {
        setFormData({
          sender: blog.sender || "",
          category: blog.category,
          title: blog.title,
          shortDescription: blog.shortDescription,
          content: blog.content,
          imageURL: blog.imageURL || "",
          URL: blog.URL || "",
          password: "", // Password should not be fetched for security reasons
        });
      }
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await updateBlog(blogId, formData);
      if (response) {
        console.log("Blog updated successfully");
        router.push("/admin");
      } else {
        console.error("Failed to update blog");
        router.push("/admin");
      }
    } catch (error: any) {
      console.error("Error updating blog:", error.message);
    }
  };

  const fetchLoginState = async () => {
    setLoginState(await getLoginState());
    fetchBlogData();
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
        <div
          className="h-full w-5/6 flex justify-center items-center"
          style={{ overflowY: "scroll" }}
        >
          <div className="w-full mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
              Edit Blog
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="flex w-full flex-row justify-center items-center gap-2">
                <div className="mb-4 w-4/12">
                  <label
                    htmlFor="sender"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Creator:
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
                <div className="mb-4 w-4/12">
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
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
                <div className="mb-4 w-4/12 ">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
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
              </div>

              <div className="mb-4">
                <label
                  htmlFor="shortDescription"
                  className="block text-sm font-medium text-gray-700"
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
                  className="block text-sm font-medium text-gray-700"
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
              <div className="flex w-full flex-row justify-center items-center gap-2">
                <div className="mb-4 w-1/3">
                  <label
                    htmlFor="imageURL"
                    className="block text-sm font-medium text-gray-700"
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
                <div className="mb-4 w-1/3">
                  <label
                    htmlFor="URL"
                    className="block text-sm font-medium text-gray-700"
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
                <div className="mb-4 w-1/3">
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
      </div>
    );
  }
};

export default EditBlogForm;
