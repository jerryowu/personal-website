"use client";
import Image from "next/image";

import camera_photo from "/public/camera.jpg";
import headshot from "/public/headshot.jpg";
import spikey from "/public/spikey.jpg";
import { useState } from "react";

export default function Home() {
  const [imageStack, setImageStack] = useState([
    camera_photo,
    headshot,
    spikey,
  ]);

  const handleImageClick = () => {
    const newImageStack = [...imageStack.slice(1), imageStack[0]];
    setImageStack(newImageStack);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="px-60 pt-10">
        <div className="flex items-center justify-between">
          <p className="flex-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            atdoloribus optio, nobis dolorum, odio quas pariatur dolore iste,
            similique nihil facilis sunt? Optio eos numquam sit, maxime
            excepturi nemo.
          </p>
          <div className="relative w-[400px] h-[400px]">
            {imageStack
              .slice()
              .reverse()
              .map((image, index) => (
                <Image
                  key={imageStack.length - 1 - index}
                  src={image}
                  alt={`image-${imageStack.length - 1 - index}`}
                  width={400}
                  height={400}
                  priority
                  className={`absolute top-0 left-0 rounded-md rotate-${
                    (imageStack.length - 1 - index) * 3
                  }`}
                  onClick={() => handleImageClick()}
                />
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
