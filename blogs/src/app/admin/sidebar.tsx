"use client";

import React from "react";
import { useRouter } from "next/navigation";

export const SideBar = () => {
  const router = useRouter();

  return (
    <div className="w-full h-full flex flex-col justify-start items-start gap-4 p-4 bg-gray-700 text-white">
      <div
        className="w-full p-3 font-semibold bg-white text-black shadow-md rounded-lg cursor-pointer hover:bg-gray-200 transition duration-300"
        onClick={() => {
          router.push("/admin");
        }}
      >
        Home
      </div>
      <div
        className="w-full p-3 font-semibold bg-white text-black shadow-md rounded-lg cursor-pointer hover:bg-gray-200 transition duration-300"
        onClick={() => {
          router.push("/admin/postMessage");
        }}
      >
        Post Blog
      </div>
      
    </div>
  );
};
