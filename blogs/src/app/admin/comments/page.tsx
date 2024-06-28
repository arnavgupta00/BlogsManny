"use client";

import React, { useEffect, useState } from "react";
import { SideBar } from "../sidebar";
import { deleteComment, getLoginState } from "../loginState";
import Admin from "../adminLogin";
import Link from "next/link";
import { getComments } from "../loginState";
import { useRouter } from "next/navigation";

export default function CommentsPage() {
  const [loginState, setLoginState] = useState<boolean>(false);
  const [comments, setComments] = useState<any>([]);
  const router = useRouter();

  const fetchComments = async () => {
    setComments(await getComments());
  };

  const fetchLoginState = async () => {
    setLoginState(await getLoginState());
    fetchComments();
  };

  const deleteCommentFunc = async (id: number) => {
    await deleteComment(id);
    await fetchComments();
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
          <h1 className="text-2xl font-bold text-gray-700 mb-4">Comments</h1>
          {comments &&
            comments.map(
              (
                comment: {
                  draft: boolean;
                  content: string;
                  user: string;
                  id: number;
                  likes: number;
                },
                index: React.Key | null | undefined
              ) => {
                console.log(comment);
                return (
                  <div
                    key={index}
                    className="w-full flex flex-row justify-start items-center bg-gray-50 text-gray-700 shadow-lg rounded-lg p-4"
                  >
                    <div className="w-5/6 flex flex-col gap-2">
                      <div className="text-lg font-semibold cursor-pointer">
                        {comment.content} 
                      </div>
                      <div className="text-sm text-gray-500">
                        {comment.user}
                      </div>
                      <div className="text-sm text-gray-500">
                        Comment ID: {comment.id}
                      </div>
                      <div className="text-sm text-gray-500">
                        Likes: {comment.likes}
                      </div>
                    </div>
                    <div className="w-1/6 flex flex-col justify-center gap-2 items-center">
                      <button
                        className="w-full p-2 bg-red-500 text-white shadow-md rounded-lg"
                        onClick={async() => {
                           await deleteCommentFunc(comment.id)
                        }}
                      >
                        Delete Comment
                      </button>

                      
                    </div>
                  </div>
                );
              }
            )}
        </div>
      </div>
    );
  }
}
