import RootLayout from "@/app/layout";
import Button from "@/components/Button/button";
import Link from "next/link";
import Particles from "@/components/Particles/particles";

export default function Home() {
  const catergories = [
    "Technology",
    "Science",
    "Art",
    "Music",
    "Sports",
    "Politics",
    "Fashion",
    "Food",
    "Travel",
    "Health",
    "Fitness",
    "Lifestyle",
    "Entertainment",
  ];
  const navigation = [
    { name: "Blogs", href: "categories/category" },
    { name: "Contact", href: "contact" },
  ];
  

  return (
      <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
        <nav className="my-16 animate-fade-in">
          <ul className="flex items-center justify-center gap-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
              >
                {item.name}
              </Link>
            ))}
          </ul>
        </nav>
        <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
        <Particles
          className="absolute inset-0 -z-10 animate-fade-in"
          quantity={100}
        />
        <h1  className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
          2blive
        </h1>

        <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
        <div className="my-16 text-center animate-fade-in">
          <h2 className="text-sm text-zinc-500 ">
            We are a
            {" "}
            <Link
              target="_blank"
              href="https://2blive.in"
              className="underline duration-500 hover:text-zinc-300"
            >
               LiveStreaming
            </Link>{" "}
            Platform that provides a unique experience
          </h2>
        </div>
      </div>
  );
}
