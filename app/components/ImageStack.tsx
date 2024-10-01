"use client";
import { useState, useMemo } from "react";

import Image, { StaticImageData } from "next/image";

interface ImageStackProps {
  images: StaticImageData[];
}

export default function ImageStack({ images }: ImageStackProps) {
  const [imageStack, setImageStack] = useState(images);
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

  const rotationClasses = useMemo(
    () => ["rotate-0", "rotate-3", "rotate-6", "rotate-12"],
    []
  );

  return (
    <>
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
                      ? rotationClasses[0]
                      : rotationClasses[(index % 3) + 1]
                  } ${
                    index === imageStack.length - 1
                      ? "scale-100"
                      : `scale-${95 + (imageStack.length - index - 1) * 2}`
                  }`
            }`}
            onClick={handleImageClick}
          />
        ))}
    </>
  );
}
