"use client";

import Link from "next/link";
import ClickableBlock from "./ClickableBlock";
import { Post } from "../types/types";

export default function DigitalGarden() {
  const posts: Post[] = [
    {
      Title: "Intro",
      Content: "intro content",
      PostId: "intro",
      Date: "November 2024",
    },
    {
      Title: "Adversarial Nature to Life",
      Content: "adversarial nature content",
      PostId: "adversarial-nature",
      Date: "November 2024",
    },
  ];

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {posts.map((post) => (
        <Link key={post.PostId} href={`/digital-garden/${post.PostId}`}>
          <div>
            <ClickableBlock key={post.Title} title={post.Title} />
          </div>
        </Link>
      ))}
    </div>
  );
}
