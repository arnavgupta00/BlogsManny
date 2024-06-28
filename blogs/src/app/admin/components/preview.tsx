import { Metadata, ResolvingMetadata } from "next";
import { Header } from "./header";
import Image from "next/image";
import { fetchBlog } from "@/components/fetch/getBlogs";

export default  function BlogPage({
  params,
}: {
  params: { fetchResultProp: any };
}) {
  const fetchResult = params.fetchResultProp;

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header
        project={fetchResult}
        views={fetchResult.views ? fetchResult.views : 0}
      />

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <div>
          {fetchResult.imageURL ? (
            <Image
              src={fetchResult.imageURL}
              width={1000}
              height={1000}
              alt="Related Image"
            />
          ) : null}{" "}
          <div dangerouslySetInnerHTML={{ __html: fetchResult.content }} />
        </div>
      </article>
    </div>
  );
}
