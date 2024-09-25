import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex flex-row items-center justify-between">
      <Link
        href="/"
        className="text-3xl p-2 transition-all hover:scale-105 hover:underline ml-20 mt-10"
      >
        Jerry Wu
      </Link>
      <div className="mr-20 mt-10 flex space-x-20">
        <Link
          href="/about"
          className="text-lg p-1 transition-all hover:scale-105 hover:underline"
        >
          About
        </Link>
        <Link
          href="/resume"
          className="text-lg p-1 transition-all hover:scale-105 hover:underline"
        >
          Resume
        </Link>
        <Link
          href="/reading"
          className="text-lg p-1 transition-all hover:scale-105 hover:underline"
        >
          Reading
        </Link>
        <Link
          href="/build"
          className="text-lg p-1 transition-all hover:scale-105 hover:underline"
        >
          Build
        </Link>
      </div>
    </div>
  );
}
