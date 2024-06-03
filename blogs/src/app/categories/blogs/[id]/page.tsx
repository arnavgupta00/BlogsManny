import { Header } from "./header";
import Image from "next/image";
import Link from "next/link";
import { fetchBlog } from "../../../../components/fetch/getBlogs";

export default async function BlogPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;

  const fetchResult = await fetchBlog(id? parseInt(id) : 0);

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header project={fetchResult} views={fetchResult.views} />

      <article className="px-4 py-12 mx-auto prose prose-zinc prose-quoteless">
        <div>
          {fetchResult.imageURL ? (
            <Image
              src={fetchResult.imageURL}
              width={1000}
              height={1000}
              alt="Releted Image"
            />
          ) : null}{" "}
          <p>{fetchResult.content}</p>
        </div>
      </article>
    </div>
  );
}
