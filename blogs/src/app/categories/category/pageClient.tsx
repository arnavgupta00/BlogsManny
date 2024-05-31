"use client";
import Message from "@/components/schema/schema";
import messageList from "@/components/testData/messages";
import { Eye, Heart } from "lucide-react";
import { catergoriesList } from "@/components/testData/messages";
import Link from "next/link";
import { Card } from "@/components/card/card";
import { Article } from "@/app/categories/category/article";

import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from "next";
import Button from "@/components/Button/button";
import { blogCategory, setBlogCategory, setBlogId } from "@/components/variableSet/variableSet";
import { useEffect, useState } from "react";
import { fetchBlogs, fetchCategories } from "@/components/fetch/getBlogs";
import { useRouter } from "next/navigation";

export default function HomePageClient() {
  const category = blogCategory;
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]); // Use React state to manage messages
  const [featured, setFeatured] = useState<Message | undefined>(undefined);
  const [top2, setTop2] = useState<Message | undefined>(undefined);
  const [top3, setTop3] = useState<Message | undefined>(undefined);
  const [sorted, setSorted] = useState<Message[]>([]);
  const [catergoriesList, setCatergoriesList] = useState<string[]>([]);
  const [catergoryState, setCatergoryState] = useState<string>("All");

  useEffect(() => {
    const fetchBlogsC = async () => {
      const catergoriesListC = await fetchCategories();
      setCatergoriesList(catergoriesListC);
      const messageFetch = await fetchBlogs(catergoryState);
      setMessages(messageFetch);
      setFeatured(messageFetch[0]);
      setTop2(messageFetch[1]);
      setTop3(messageFetch[2]);
      setSorted(messageFetch.slice(3));
    };

    fetchBlogsC();
  }, [catergoryState]);

  const constProject: Message = {
    URL: messages[0]?.URL,
    title: messages[0]?.title,
    shortDescription: messages[0]?.shortDescription,
    content: messages[0]?.content,
    views: messages[0]?.views,
    category: messages[0]?.category,
    imageURL: messages[0]?.imageURL,
    id: 0,
    sender: "",
    timestamp: undefined,
    replies: 0,
  };

  return (
    <div className="flex flex-row justify-center items-center w-5/5 flex-wrap  bg-zinc-400 gap-2  pb-4 pt-4 min-h-screen h-0vh">
      <div className="relative pb-16">
        <div className="flex flex-row justify-center flex-wrap items-center w-12/12 h-fit gap-4 p-2 pt-16">
          <Button key={-1} catergory={"All"} />
          {catergoriesList.map((catergory, index) => {
            if (index < 10) {
              return (
                <button
                  key={index}
                  className="w-fit h-fit p-4 pt-1 pb-1 bg-gray-500 	border-solid border-4 rounded-xl text-zinc-200"
                  style={{
                    zIndex: "15",
                    borderRadius: "15px",
                    borderColor: "transparent",
                    backgroundColor: "#A1A1AA",
                    boxShadow: "8px 8px 16px #96969e, -8px -8px 16px #acacb6",
                  }}
                  onClick={() => {
                    console.log("clicked");
                    setBlogCategory(catergory);
                    setCatergoryState(catergory);
                  }}
                >
                  {catergory}
                </button>
              );
            }
          })}
        </div>
        <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32 ">
          <div className="max-w-2xl mx-auto lg:mx-0 flex flex-row w-5/5">
            <h2 className="text-3xl font-bold tracking-tight text-black-100 sm:text-4xl">
              {category}
            </h2>
          </div>

          <div className="w-full h-px bg-black-800" />

          <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
            <Card>
              <article
                onClick={() => {
                  console.log("clicked");
                  setBlogId(featured?.id ?? 0);
                  router.push(`blogs/id`);
                }}
                className="relative w-full h-full p-4 md:p-8"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs text-black-100">
                    {featured?.timestamp ? (
                      <time dateTime={featured?.timestamp}>
                        {Intl.DateTimeFormat(undefined, {
                          dateStyle: "medium",
                        }).format(new Date(featured?.timestamp))}
                      </time>
                    ) : (
                      <span>SOON</span>
                    )}
                  </div>
                  <span className="flex items-center gap-1 text-xs text-black-500">
                    <Eye className="w-4 h-4" />{" "}
                    {Intl.NumberFormat("en-US", {
                      notation: "compact",
                    }).format(featured?.views ?? 0)}
                  </span>
                </div>

                <h2
                  id="featured-post"
                  className="mt-4 text-3xl font-bold text-black-100 group-hover:text-white sm:text-4xl font-display"
                >
                  {featured?.title}
                </h2>
                <p className="mt-4 leading-8 duration-150 text-black-400 group-hover:text-black-300">
                  {featured?.shortDescription}
                </p>
                <div className="absolute bottom-4 md:bottom-8">
                  <p className="hidden text-black-200 hover:text-black-50 lg:block">
                    Read more <span aria-hidden="true">&rarr;</span>
                  </p>
                </div>
              </article>
            </Card>

            <div className="flex flex-col w-full gap-8 mx-auto border-t border-black-900/10 lg:mx-0 lg:border-t-0 ">
              {[top2, top3].map((project) => (
                <Card key={project?.id}>
                  <Article
                    project={project || constProject}
                    views={project?.views ?? 0}
                  />
                </Card>
              ))}
            </div>
          </div>
          <div className="hidden w-full h-px md:block bg-black-800" />

          <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
            <div className="grid grid-cols-1 gap-4">
              {sorted
                .filter((_, i) => i % 3 === 0)
                .map((project) => (
                  <Card key={project?.id}>
                    <Article project={project} views={project?.views ?? 0} />
                  </Card>
                ))}
            </div>
            <div className="grid grid-cols-1 gap-4">
              {sorted
                .filter((_, i) => i % 3 === 1)
                .map((project) => (
                  <Card key={project?.id}>
                    <Article project={project} views={project?.views ?? 0} />
                  </Card>
                ))}
            </div>
            <div className="grid grid-cols-1 gap-4">
              {sorted
                .filter((_, i) => i % 3 === 2)
                .map((project) => (
                  <Card key={project?.id}>
                    <Article project={project} views={project?.views ?? 0} />
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
