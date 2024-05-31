"use client"


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
import { setBlogId } from "@/components/variableSet/variableSet";
import { getStaticProps } from "next/dist/build/templates/pages";
import { fetchBlogs } from "@/components/fetch/getBlogs";
import HomePageClient from "@/app/categories/category/pageClient";



export default function HomePage(
) {

  return (
    <HomePageClient />
  );
}

