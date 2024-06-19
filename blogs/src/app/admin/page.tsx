"use client";

import React, { useEffect, useState } from "react";
import { SideBar } from "./sidebar";
import { getLoginState } from "./loginState";
import Admin from "./adminLogin";
import Link from "next/link";
import { getBlogs } from "./loginState";
import { useRouter } from "next/navigation";
export default function Page() {
  const [loginState, setLoginState] = useState<boolean>(false);
  const [blogs, setBlogs] = useState<any>([]);
const router = useRouter();
  

  const fetchBlogs = async () => {
    setBlogs(await getBlogs());
  };
  const fetchLoginState = async () => {
    setLoginState(await getLoginState());
    fetchBlogs();
  };
  useEffect(() => {
    fetchLoginState();
  }, []);

  if (loginState === false) {
    return <Admin />;
  } else {
    return (
      <div className="w-screen h-screen flex flex-row justify-center items-center bg-gray-100">
        <div className="h-full w-1/6 bg-gray-200 shadow-md">
          <SideBar />
        </div>
        <div className="h-full w-5/6 bg-white p-6 flex flex-col justify-start items-center gap-4 overflow-y-scroll">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">Blog Posts</h1>
          {blogs &&
            blogs.map((blog: { title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; category: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; sender: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; id: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; views: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }, index: React.Key | null | undefined) => {
              return (
                <div
                  key={index}
                  className="w-full flex flex-row justify-start items-center bg-gray-50 text-gray-700 shadow-lg rounded-lg p-4"
                  //onClick={()=>router.push(`/categories/blogs/${blog.id}`)}
                >
                  <div className="w-5/6   flex flex-col gap-2">
                    <div className="text-lg font-semibold cursor-pointer" onClick={()=>router.push(`/categories/blogs/${blog.id}`)}>{blog.title}</div>
                    <div className="text-sm font-medium cursor-pointer" onClick={()=>router.push(`/categories/${blog.category}`)}>{blog.category}</div>
                    <div className="text-sm text-gray-500">{blog.sender}</div>
                    <div className="text-sm text-gray-500">
                      Blog ID : {blog.id}
                    </div>
                    <div className="text-sm text-gray-500">
                      Views: {blog.views}
                    </div>
                  </div>
                  <div className="w-1/6 flex flex-col justify-center gap-2 items-center">
                    
                      <button className="w-full p-2 bg-red-500 text-white shadow-md rounded-lg" onClick={()=>{
                        router.push(`/admin/deleteMessage/${blog.id}`)
                      
                      }}>
                        Delete
                      </button>
                    
                      <button className="w-full p-2 bg-blue-500 text-white shadow-md rounded-lg" onClick={()=>{
                        router.push(`/admin/editMessage/${blog.id}`)
                      
                      }}>
                        Edit
                      </button>
                    
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
