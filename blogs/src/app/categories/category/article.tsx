"use client";

import Link from "next/link";
import { Eye, View } from "lucide-react";
import Message from "@/components/schema/schema";
import { setBlogId } from "@/components/variableSet/variableSet";
import { useRouter } from "next/navigation";

type Props = {
  project: Message;
  views: number;
};

export const Article: React.FC<Props> = ({ project, views }) => {
  const router = useRouter();

  return (
    <article
      onClick={() => {
        console.log("clicked");
        setBlogId(project.id);
        router.push(`blogs/id`);
      }}
      className="p-4 md:p-8"
    >
      <div className="flex justify-between gap-2 items-center">
        <span className="text-xs duration-1000 text-gray-200 group-hover:text-white group-hover:border-gray-200 drop-shadow-orange">
          {project.timestamp ? (
            <time dateTime={project.timestamp}>
              {Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
                new Date(project.timestamp)
              )}
            </time>
          ) : (
            <span>SOON</span>
          )}
        </span>
        <span className="text-gray-500 text-xs  flex items-center gap-1">
          <Eye className="w-4 h-4" />{" "}
          {Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
        </span>
      </div>
      <h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-gray-200 group-hover:text-white font-display">
        {project.title}
      </h2>
      <p className="z-20 mt-4 text-sm  duration-1000 text-gray-400 group-hover:text-gray-200">
        {project.shortDescription}
      </p>
    </article>
  );
};
