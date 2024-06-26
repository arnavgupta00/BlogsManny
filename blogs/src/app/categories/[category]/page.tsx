import { Metadata, ResolvingMetadata } from "next";
import { Eye, Link as LucideLink } from "lucide-react";
import { Card } from "@/components/card/card";
import { Article } from "@/app/categories/[category]/article";
import { fetchBlogs, fetchCategories } from "@/components/fetch/getBlogs";
import Button from "@/components/Button/button";
import LinkA from "next/link";
import Particles from "@/components/Particles/particles";

interface Message {
  id: number;
  sender: string;
  category: string;
  title: string;
  shortDescription: string;
  content: string;
  timestamp: string;
  replies: number;
  views: number;
  imageURL?: string;
  URL?: string;
}

// Fetch data at the server side
export async function generateMetadata(
  { params }: { params: { category: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const category = params.category;

  // Fetch categories and blogs data
  const categoriesList: string[] = await fetchCategories();
  const messages: Message[] = await fetchBlogs(category);

  const featured = messages[0];

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: category ? `${category} Blog's` : "Home Page",
    description: featured
      ? featured.shortDescription
      : "Welcome to our homepage",
    openGraph: {
      title: category ? `Category: ${category}` : "Home Page",
      description: featured
        ? featured.shortDescription
        : "Welcome to our homepage",
      images: featured?.imageURL
        ? [featured.imageURL, ...previousImages]
        : previousImages,
      type: "website",
      url: `http://194.164.125.204:4173`,
    },
    twitter: {
      card: "summary_large_image",
      title: category ? `Category: ${category}` : "Home Page",
      description: featured
        ? featured.shortDescription
        : "Welcome to our homepage",
    },
  };
}

// Fetch data at the server side
export default async function HomePage({
  params,
}: {
  params: { category: string };
}) {
  const category = params.category; // Replace with your category logic if needed

  // Fetch categories and blogs data
  const categoriesList: string[] = await fetchCategories();
  const messages: Message[] = await fetchBlogs(category);

  const featured = messages[0];
  const top2 = messages[1];
  const top3 = messages[2];
  const sorted = messages.slice(3);

  const constProject: Message = {
    id: 0,
    sender: "",
    category: "",
    title: "",
    shortDescription: "",
    content: "",
    timestamp: "",
    replies: 0,
    views: 0,
    URL: "",
    imageURL: "",
  };

  return (
    <div className="flex flex-row justify-center items-center w-5/5 flex-wrap bg-black gap-2 pb-4 pt-4 min-h-screen h-0vh">
      <Particles
        className="absolute inset-0 -z-1 animate-fade-in w-full h-full"
        quantity={100}
      />
      <div className="relative pb-16">
        
        <div className="flex flex-row justify-center flex-wrap items-center w-12/12 h-fit gap-4 p-2 pt-16">
          <LinkA key={-1} href={"/categories/All"}>
            <button
              key={-1}
              className="w-fit h-fit p-4 pt-1 pb-1 bg-gray-500 border-solid border-4 rounded-xl text-zinc-200"
              style={{
                zIndex: "15",
                borderRadius: "15px",
                borderColor: "transparent",
                backgroundColor: "#000000",
                boxShadow: "2px 2px 4px #96969e, -2px -2px 2px #acacb6",
              }}
              // onClick={() => {
              //   console.log("clicked");
              //   //setBlogCategory(category);
              //   window.location.href = "/categories/" + category;
              //   //setCatergoryState(category);
              // }}
            >
              All
            </button>
          </LinkA>
          {categoriesList.map((category, index) => {
            if (index < 10) {
              return (
                <LinkA key={index} href={"/categories/" + category}>
                  <button
                    key={index}
                    className="w-fit h-fit p-4 pt-1 pb-1 bg-gray-500 border-solid border-4 rounded-xl text-zinc-200"
                    style={{
                      zIndex: "15",
                      borderRadius: "15px",
                      borderColor: "transparent",
                      backgroundColor: "#000000",
                      boxShadow: "2px 2px 4px #96969e, -2px -2px 2px #acacb6",
                    }}
                    // onClick={() => {
                    //   console.log("clicked");
                    //   //setBlogCategory(category);
                    //   window.location.href = "/categories/" + category;
                    //   //setCatergoryState(category);
                    // }}
                  >
                    {category}
                  </button>
                </LinkA>
              );
            }
          })}
        </div>
        <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
          <div className="max-w-2xl mx-auto lg:mx-0 flex flex-row w-5/5">
            <h2 className="text-3xl font-bold tracking-tight text-black-100 sm:text-4xl">
              {category}
            </h2>
          </div>

          <div className="w-full h-px bg-black-800" />

          <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
            <Card>
              <LinkA href={"/categories/blogs" + "/" + featured?.id.toString()}>
                <article
                  // onClick={() => {
                  //   //console.log("clicked");
                  //   //setBlogId(featured?.id ?? 0);
                  //   window.location.href = "/blog"+"/"+featured?.id.toString();
                  // }}
                  className="relative w-full h-full p-4 md:p-8"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-xs text-black-100">
                      {featured?.timestamp ? (
                        <time className="text-gray-50" dateTime={featured?.timestamp}>
                          {Intl.DateTimeFormat(undefined, {
                            dateStyle: "medium",
                          }).format(new Date(featured?.timestamp))}
                        </time>
                      ) : (
                        <span>SOON</span>
                      )}
                    </div>
                    <span className="flex items-center gap-1 text-xs text-gray-50">
                      <Eye className="w-4 h-4" />{" "}
                      {Intl.NumberFormat("en-US", {
                        notation: "compact",
                      }).format(featured?.views ?? 0)}
                    </span>
                  </div>

                  <h2
                    id="featured-post"
                    className="mt-4 text-3xl font-bold text-gray-50 group-hover:text-white sm:text-4xl font-display"
                  >
                    {featured?.title}
                  </h2>
                  <p className="mt-4 leading-8 duration-150 text-gray-50 group-hover:text-gray-50">
                    {featured?.shortDescription}
                  </p>
                  <div className="absolute bottom-4 md:bottom-8">
                    <p className="hidden text-gray-50 hover:text-gray-50 lg:block">
                      Read more <span aria-hidden="true">&rarr;</span>
                    </p>
                  </div>
                </article>
              </LinkA>
            </Card>

            <div className="flex flex-col w-full gap-8 mx-auto border-t border-black-900/10 lg:mx-0 border-t-0 ">
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
