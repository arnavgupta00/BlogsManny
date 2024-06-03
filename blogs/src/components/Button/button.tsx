"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Button(props: {
  catergory: string;
  currentURL?: string;
}) {
  const catergory = props.catergory;
  const router = useRouter();

  return (
    <div>
      <Link href={`/categories/${catergory}`}>
        <button
          className="w-fit h-fit p-4 pt-1 pb-1 bg-gray-500 	border-solid border-4 rounded-xl text-zinc-200"
          style={{
            zIndex: "15",
            borderRadius: "15px",
            borderColor: "transparent",
            backgroundColor: "#A1A1AA",
            boxShadow: "8px 8px 16px #96969e, -8px -8px 16px #acacb6",
          }}
        >
          {catergory}
        </button>
      </Link>
    </div>
  );
}
export function NavButton(props: { url: string; name: string }) {
  const { url, name } = props;
  const router = useRouter();
  return (
    <div>
      <Link href={`${url}.html`}>
        <button
          className="w-56 h-16 bg-zinc-600 border-zinc-600	border-solid border-4 rounded-xl text-zinc-200"
          style={{ zIndex: "15" }}
          onClick={() => {
            console.log("clicked");
            router.push(`${url}`);
          }}
        >
          {name}
        </button>
      </Link>
    </div>
  );
}
