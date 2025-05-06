"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes } from "react-icons/fa";
import { LoginForm } from "./LoginForm";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        className={`flex flex-row items-center justify-between transition-colors duration-500 w-full ${
          scrolled ? "bg-[#f2e5bc]" : "bg-[#fbf1c7]"
        }`}
      >
        <Link
          href="/"
          className={`text-2xl md:text-3xl p-2 transition-all hover:scale-105 hover:underline ml-4 md:ml-20 mt-4 md:mt-10 ${
            pathname === "/" ? "underline scale-105" : ""
          }`}
        >
          Jerry Wu
        </Link>

        {/* Mobile menu button and login */}
        <div className="md:hidden flex items-center mt-4 mr-4 space-x-4">
          <button
            className="p-2 text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
          <LoginForm />
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex mr-20 mt-10 space-x-20">
          <Link
            href="/news"
            className={`text-lg p-1 transition-all hover:scale-105 hover:underline ${
              pathname === "/news" ? "underline scale-105" : ""
            }`}
          >
            News
          </Link>
          {/* <Link
            href="/resume"
            className={`text-lg p-1 transition-all hover:scale-105 hover:underline ${
              pathname === "/resume" ? "underline scale-105" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Resume
          </Link> */}

          <a
            href="https://en.wikipedia.org/wiki/Stalking"
            rel="noopener noreferrer"
            className={`text-lg p-1 transition-all hover:scale-105 hover:underline`}
            onClick={() => setIsMenuOpen(false)}
          >
            Resume
          </a>
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
          <Link
            href="/digital-garden"
            className={`text-lg p-1 transition-all hover:scale-105 hover:underline ${
              pathname.startsWith("/digital-garden")
                ? "underline scale-105"
                : ""
            }`}
          >
            Digital Garden
          </Link>
          <LoginForm />
        </div>
      </div>
      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ${
          isMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        } ${scrolled ? "bg-[#f2e5bc]" : "bg-[#fbf1c7]"}`}
      >
        <div className="flex flex-col items-center space-y-4 py-4">
          <Link
            href="/news"
            className={`text-lg p-1 transition-all hover:scale-105 hover:underline ${
              pathname === "/news" ? "underline scale-105" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            News
          </Link>
          <Link
            href="/resume"
            className={`text-lg p-1 transition-all hover:scale-105 hover:underline ${
              pathname === "/resume" ? "underline scale-105" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Resume
          </Link>
          <Link
            href="/fun"
            className={`text-lg p-1 transition-all hover:scale-105 hover:underline ${
              pathname === "/fun" ? "underline scale-105" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Fun
          </Link>
          <Link
            href="/reading"
            className={`text-lg p-1 transition-all hover:scale-105 hover:underline ${
              pathname === "/reading" ? "underline scale-105" : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Reading
          </Link>
          <Link
            href="/digital-garden"
            className={`text-lg p-1 transition-all hover:scale-105 hover:underline ${
              pathname.startsWith("/digital-garden")
                ? "underline scale-105"
                : ""
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Digital Garden
          </Link>
        </div>
      </div>
    </div>
  );
}
