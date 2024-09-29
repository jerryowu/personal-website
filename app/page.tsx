"use client";
import Image from "next/image";

import camera_photo from "/public/camera.jpg";
import headshot from "/public/headshot.jpg";
import spikey from "/public/spikey.jpg";
import bread from "/public/bread.jpg";
import { useState } from "react";

export default function Home() {
  const [imageStack, setImageStack] = useState([
    headshot,
    camera_photo,
    spikey,
    bread,
  ]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState("right");

  const handleImageClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const newDirection = Math.random() < 0.5 ? "left" : "right";
    setAnimationDirection(newDirection);

    requestAnimationFrame(() => {
      setImageStack((prevStack) => [
        ...prevStack.slice(1),
        { ...prevStack[0], animatingOut: true },
      ]);

      setTimeout(() => {
        setImageStack((prevStack) => [
          ...prevStack.slice(0, -1),
          {
            ...prevStack[prevStack.length - 1],
            animatingOut: false,
          },
        ]);
        setIsAnimating(false);
      }, 300);
    });
  };

  return (
    <main className="flex h-100 flex-row items-center justify-between p-16">
      <p className="w-1/2 pl-20 text-xl">
        Hi! I&apos;m Jerry. I&apos;m a 4th year undergraduate student studying
        computer science at UC Davis. I am interested in full stack development
        and UI/UX design.
      </p>
      <div className="relative w-[400px] h-[400px] mr-40">
        {imageStack
          .slice()
          .reverse()
          .map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`image-${index}`}
              width={400}
              height={400}
              priority
              draggable={false}
              className={`absolute top-0 left-0 rounded-md transition-all duration-300 ease-in-out ${
                "animatingOut" in image && image.animatingOut
                  ? animationDirection === "right"
                    ? "translate-x-full rotate-[30deg] z-[1]"
                    : "-translate-x-full rotate-[-30deg] z-[1]"
                  : `${
                      index === imageStack.length - 1
                        ? "rotate-0"
                        : index === imageStack.length - 2
                        ? "rotate-6"
                        : index === imageStack.length - 3
                        ? "rotate-3"
                        : "-rotate-6"
                    } ${
                      index === imageStack.length - 1
                        ? "scale-100"
                        : `scale-${95 + (imageStack.length - index - 1) * 2}`
                    }`
              }`}
              onClick={handleImageClick}
            />
          ))}
      </div>
    </main>
  );
}
