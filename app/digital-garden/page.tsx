"use client";

import Link from "next/link";
import ClickableBlock from "./ClickableBlock";
import { Post } from "../types/types";

export default function DigitalGarden() {
  // const posts: Post[] = [
  //   {
  //     Title: "Intro",
  //     Content: "intro content",
  //     PostId: "intro",
  //     Date: "November 2024",
  //   },
  //   {
  //     Title: "Adversarial Nature to Life",
  //     Content: "adversarial nature content",
  //     PostId: "adversarial-nature",
  //     Date: "November 2024",
  //   },
  //   {
  //     Title: "Wealth",
  //     Content: "wealth content",
  //     PostId: "wealth",
  //     Date: "December 2024",
  //   },
  // ];

  return (
    <></>
    // <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-4 p-4 md:p-8 max-w-7xl mx-auto">
    //   {posts.map((post) => (
    //     <Link
    //       key={post.PostId}
    //       href={`/digital-garden/${post.PostId}`}
    //       className="w-full md:w-auto"
    //     >
    //       <div className="w-full">
    //         <ClickableBlock key={post.Title} title={post.Title} />
    //       </div>
    //     </Link>
    //   ))}
    // </div>
  );
}
