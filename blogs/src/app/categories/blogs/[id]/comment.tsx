"use client";

import { fetchComments, postComment } from "@/components/fetch/getBlogs";
import { useEffect, useState } from "react";

interface Props {
  propId: string;
}

export default function Comment({propId}: Props) {
  const id = propId;
  const [comments, setComments] = useState<any>([]);
  const [newComment, setNewComment] = useState<any>({ user: "", content: "" });

  async function loadComments() {
    const comments = await fetchComments(id ? parseInt(id) : 0);
    setComments(comments);
  }
  useEffect(() => {
    
    loadComments();
  }, [id]);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewComment({ ...newComment, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const postedComment = await postComment(
      id ? parseInt(id) : 0,
      newComment.user,
      newComment.content
    );
    setComments([...comments, {
        ...newComment, likes: 0,
        createdAt: new Date().toLocaleDateString(),
    }]);
    setNewComment({ user: "", content: "" });
    loadComments();
  };

  return (
    <section className="px-4 py-12 mx-auto prose prose-zinc">
      <h2>Comments</h2>
      <hr className="my-4" />
      <form onSubmit={handleSubmit} className="mt-8 flex flex-row flex-wrap gap-4">
        <div className="mb-1 w-1/6">
          <input
            type="text"
            name="user"
            placeholder="Name"
            value={newComment.user}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-1 w-4/6">
          <input
            name="content"
            placeholder="Comment"
            value={newComment.content}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          ></input>
        </div>
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-black rounded-md hover:bg-gray-800"
        >
          Post Comment
        </button>
      </form>
      <hr className="my-4" />
      {comments.map((comment:any) => (
        <div key={comment.id} className="mb-4">
          <p>
            <strong>{comment.user}</strong> - {new Date(comment.createdAt).toLocaleDateString()}
          </p>
          <p>{comment.content}</p>
        </div>
      ))}

      
    </section>
  );
}
