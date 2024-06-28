"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { postBlog } from "@/components/fetch/getBlogs";
import { SideBar } from "../sidebar";
import { getLoginState } from "../loginState";
import Admin from "../adminLogin";
import { Editor } from "@tinymce/tinymce-react";
import BlogPage from "../components/preview";
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

const BlogForm: React.FC = () => {
  const [blogId, setBlogId] = useState<string>();
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

  const handleEditorChange = (content: any, editor: any) => {
    setFormData((prevState) => ({
      ...prevState,
      content: content,
    }));
  };
  const handleEditorShortDescriptionChange = (content: any) => {
    setFormData((prevState) => ({
      ...prevState,
      shortDescription: content,
    }));
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDraftSave = async (e: FormEvent) => {
    try {
      const response = await postBlog({ ...formData, draft: true });
      if (response) {
        router.push("/admin");
        console.log("Blog Saved successfully");
      } else {
        // Handle error response
        console.error("Failed to create blog");
      }
    } catch (error: any) {
      console.error("Error creating blog:", error.message);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await postBlog({...formData, draft: false});
      if (response) {
        // Blog created successfully
        // Redirect or display success message
        console.log("Blog created successfully");
        setFormData({
          sender: "",
          category: "",
          title: "",
          shortDescription: "",
          content: "",
          imageURL: "",
          URL: "",
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
      <div
        className="w-screen h-full flex flex-row bg-gray-100"
        style={{
          overflowX: "hidden",
        }}
      >
        <div className="h-full w-1/6  mt-12">
          <SideBar />
        </div>
        <div
          className="h-full w-5/6 flex justify-center items-center"
          style={{ overflowY: "scroll" }}
        >
          <div className="w-full mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
            <div className="w-full flex gap-4 justify-between ">
              <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
                Create a New Blog
              </h2>
              <button
                onClick={handleDraftSave}
                className="w-48 mb-8 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 align-emd"
              >
                Save as Draft
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mb-8">
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
                <Editor
                  apiKey="ac8knsnqcp1rix0ctd8364iqb9qgqb44oujndmiymppcpbgr"
                  value={formData.shortDescription}
                  init={{
                    height: 200,
                    menubar: true,

                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | image",
                  }}
                  onEditorChange={handleEditorShortDescriptionChange}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  Content:
                </label>
                <Editor
                  apiKey="ac8knsnqcp1rix0ctd8364iqb9qgqb44oujndmiymppcpbgr"
                  value={formData.content}
                  init={{
                    height: 500,
                    menubar: true,

                    plugins: [
                      "advlist autolink lists link image charmap print preview anchor",
                      "searchreplace visualblocks code fullscreen",
                      "insertdatetime media table paste code help wordcount",
                    ],
                    toolbar:
                      "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | image",
                  }}
                  onEditorChange={handleEditorChange}
                />
              </div>
              <div className="flex w-full flex-row justify-center items-center gap-2">
                {/* <div className="mb-4 w-1/3">
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
                </div> */}
                <div className="mb-4 w-3/6">
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
                <div className="mb-4 w-3/6">
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
            <div className="w-full mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
              <h2 className="text-2xl font-bold mb-4 text-left text-gray-700">
                Preview
              </h2>
            </div>
            {formData && <BlogPage params={{ fetchResultProp: formData }} />}
          </div>
        </div>
      </div>
    );
  }
};

export default BlogForm;
