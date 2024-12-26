import Image from "next/image";
import resumePng from "/public/Jerry Wu Resume.png";

export default function Resume() {
  return (
    <div className="flex flex-col items-center mt-16 md:mt-[20px] pb-6 md:pb-[50px] px-4 md:px-0">
      <div className="flex justify-end w-full max-w-4xl mb-4">
        <div className="relative w-full max-w-4xl">
          <Image
            src={resumePng}
            alt="Resume"
            width={800}
            height={1000}
            priority
            className="w-full mb-4 rounded shadow-lg"
          />
          <a
            href="/Jerry Wu Resume.pdf"
            download
            className="absolute top-2 right-2 bg-[#928374] hover:bg-[#7c6f64] text-[#fbf1c7] font-bold p-2 md:p-3 rounded flex items-center justify-center shadow-md transition-colors duration-200"
            title="Download Resume"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 md:h-6 md:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
