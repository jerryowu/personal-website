"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 25;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <div className="flex flex-col">
      <div
        className={`flex flex-row items-center justify-between transition-colors duration-500 ${
          scrolled ? "bg-[#f2e5bc]" : "bg-[#fbf1c7]"
        }`}
      >
        <Link
          href="/"
          className={`text-3xl p-2 transition-all hover:scale-105 hover:underline ml-20 mt-10 ${
            pathname === "/" ? "underline scale-105" : ""
          }`}
        >
          Jerry Wu
        </Link>
        <div className="mr-20 mt-10 flex space-x-20">
          <Link
            href="/news"
            className={`text-lg p-1 transition-all hover:scale-105 hover:underline ${
              pathname === "/news" ? "underline scale-105" : ""
            }`}
          >
            News
          </Link>
          <Link
            href="/resume"
            className={`text-lg p-1 transition-all hover:scale-105 hover:underline ${
              pathname === "/resume" ? "underline scale-105" : ""
            }`}
          >
            Resume
          </Link>
          <Link
            href="/fun"
            className={`text-lg p-1 transition-all hover:scale-105 hover:underline ${
              pathname === "/fun" ? "underline scale-105" : ""
            }`}
          >
            Fun
          </Link>
          <Link
            href="/reading"
            className={`text-lg p-1 transition-all hover:scale-105 hover:underline ${
              pathname === "/reading" ? "underline scale-105" : ""
            }`}
          >
            Reading
          </Link>
        </div>
      </div>
    </div>
  );
}
