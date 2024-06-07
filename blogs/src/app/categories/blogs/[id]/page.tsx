import { Metadata, ResolvingMetadata } from 'next';
import { Header } from "./header";
import Image from "next/image";
import { fetchBlog } from "../../../../components/fetch/getBlogs";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Read route params
  const id = params.id;
 
  // Fetch blog data
  const fetchResult = await fetchBlog(id ? parseInt(id) : 0);
 
  // Optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
 
  return {
    title: fetchResult.title,
    description: fetchResult.excerpt,
    openGraph: {
      title: fetchResult.title,
      description: fetchResult.excerpt,
      images: [fetchResult.imageURL, ...previousImages],
      type: 'article',
      url: `http://194.164.125.204:4173/${id}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: fetchResult.title,
      description: fetchResult.excerpt,
    },
  };
}
 
export default async function BlogPage({
  params,
}: Props) {
  const id = params.id;

  const fetchResult = await fetchBlog(id ? parseInt(id) : 0);

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
              alt="Related Image"
            />
          ) : null}{" "}
          <p>{fetchResult.content}</p>
        </div>
      </article>
    </div>
  );
}

