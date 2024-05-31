"use client";

import messageList from "@/components/testData/messages";
import { Header } from "./header";
import { ReportView } from "./view";
import Message from "@/components/schema/schema";
import Image from "next/image";
import Link from "next/link";
import i from "./s.png";
import { blogId } from "@/components/variableSet/variableSet";
import { Project } from "@/components/schema/schema";
import { fetchBlog } from "@/components/fetch/getBlogs";
import { useEffect, useState } from "react";


export default function BlogPage() {
  const id = blogId;
  const messages: Message[] = messageList();


  const [fetchResult , setFetchResult] = useState<Project>({
    URL: messages[0].URL,
    title: messages[0].title,
    shortDescription: messages[0].shortDescription,
    content: messages[0].content,
    views: messages[0].views,
    category: messages[0].category,
    imageURL: messages[0]?.imageURL,
    repository: "string",
  })


  useEffect(()=>{
    const fetchResultFunk = async () => {
      const fetchResultC = await fetchBlog(id);
      setFetchResult(fetchResultC)
      console.log(fetchResultC)
    }

    fetchResultFunk();
  },[id])




  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header project={fetchResult} views={fetchResult.views} />
      <ReportView slug={"messages[0].title"} />

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <div>
          {fetchResult.imageURL ?<Image
            src={fetchResult.imageURL}
            width={1000}
            height={1000}
            alt="Releted Image"
          /> : null}
          {" "}
          <p>
            {fetchResult.content}
            
          </p>
        </div>
      </article>
    </div>
  );
}

