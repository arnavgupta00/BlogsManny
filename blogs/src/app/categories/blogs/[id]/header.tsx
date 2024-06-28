"use client";
import {
  ArrowLeft,
  ClipboardCheck,
  Eye,
  Facebook,
  Github,
  Share,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Project } from "@/components/schema/schema";
import { Heart, Clipboard } from "lucide-react";
import { likeBlog } from "@/components/fetch/getBlogs";
type Props = {
  project: Project;

  views: number;
  likes: number;
};
export const Header: React.FC<Props> = ({ project, views, likes }) => {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);
  const [likeClicked, setLikeClicked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const links: { label: string; href: string }[] = [];

  const [clipboardCopy, setClipboardCopy] = useState(false);

  if (project.URL) {
    links.push({
      label: "Website",
      href: project.URL,
    });
  }
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleLike = async () => {
    if (likeClicked) return;

    await likeBlog(project.id as number);

    setLikeClicked(true);
    setLikeCount(likeCount + 1);
  };

  const [popup, setPopup] = useState(false);

  const handleClosePopup = () => {
    setPopup(false);
  };

  return (
    <header
      ref={ref}
      className="relative isolate overflow-hidden bg-gradient-to-tl from-black via-zinc-900 to-black"
    >
      <div
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur lg:backdrop-blur-none duration-200 border-b lg:bg-transparent ${
          isIntersecting
            ? "bg-zinc-900/0 border-transparent"
            : "bg-white/10  border-zinc-200 lg:border-transparent"
        }`}
      >
        <div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
          <div className="flex justify-between gap-8">
            <span
              title="View counter for this page"
              className={`duration-200 hover:font-medium flex items-center gap-1 ${
                isIntersecting
                  ? " text-zinc-400 hover:text-zinc-100"
                  : "text-zinc-600 hover:text-zinc-900"
              } `}
            >
              <Eye className="w-5 h-5" />{" "}
              {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                views
              )}
            </span>
            <span
              title="Likes for this page"
              className={`duration-200 hover:font-medium flex items-center gap-1 ${
                isIntersecting
                  ? " text-zinc-400 hover:text-zinc-100"
                  : "text-zinc-600 hover:text-zinc-900"
              } `}
            >
              <Heart
                className={`w-5 h-5 ${likeClicked ? "text-red-500" : ""}`}
                onClick={() => {
                  handleLike();
                }}
              />{" "}
              {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                likeCount
              )}
            </span>

            <span
              title="Share this page"
              className={`duration-200 hover:font-medium flex items-center gap-1 ${
                isIntersecting
                  ? " text-zinc-400 hover:text-zinc-100"
                  : "text-zinc-600 hover:text-zinc-900"
              } `}
            >
              <Share
                className={`w-5 h-5 `}
                onClick={() => {
                  setClipboardCopy(false);
                  setPopup(true);
                }}
              />{" "}
            </span>
          </div>

          <Link
            href="/"
            className={`duration-200 hover:font-medium ${
              isIntersecting
                ? " text-zinc-400 hover:text-zinc-100"
                : "text-zinc-600 hover:text-zinc-900"
            } `}
          >
            <ArrowLeft className="w-6 h-6 " />
          </Link>
        </div>
      </div>
      <div className="container mx-auto relative isolate overflow-hidden  py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-display">
              {project.title}
            </h1>
            <div
              className="mt-6 text-lg leading-8 text-zinc-300"
              dangerouslySetInnerHTML={{ __html: project.shortDescription }}
            />
          </div>

          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-y-6 gap-x-8 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
              {links.map((link) => (
                <Link target="_blank" key={link.label} href={link.href}>
                  {link.label} <span aria-hidden="true">&rarr;</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {popup && (
        <div>
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg">
                <h2 className="text-2xl font-bold">Share this page</h2>
                <hr className="my-4" />
                <div className="flex flex-row gap-4 mt-4 justify-center">
                  <Twitter
                    className="w-8 h-8 cursor-pointer"
                    onClick={() => {
                      window.open(
                        `https://twitter.com/intent/tweet?text=${project.title}&url=${window.location.href}`
                      );
                    }}
                  />
                  {/* <Github
                    className="w-8 h-8 cursor-pointer"
                    onClick={() => {
                      window.open(
                        `https://github.com/new?title=${project.title}&body=${window.location.href}`
                      );
                    }}
                  /> */}
                  {clipboardCopy ? (
                    <ClipboardCheck
                      className="w-8 h-8 cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                      }}
                    />
                  ) : (
                    <Clipboard
                      className="w-8 h-8 cursor-pointer"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        setClipboardCopy(true);
                      }}
                    />
                  )}
                </div>
                <button
                  onClick={handleClosePopup}
                  className="mt-6 px-4 py-2 bg-gray-800 text-white rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
