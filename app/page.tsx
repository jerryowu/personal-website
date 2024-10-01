import camera_photo from "/public/home/camera.jpg";
import headshot from "/public/home/headshot.jpg";
import spikey from "/public/home/spikey.jpg";
import bread from "/public/home/bread.jpg";

import ImageStack from "./components/ImageStack";
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram } from "react-icons/fa";

export default function Home() {
  const images = [headshot, camera_photo, spikey, bread];

  return (
    <main className="flex h-100 flex-col items-center justify-between p-16">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="w-1/2 pl-20">
          <p className="text-xl mb-6">
            Hi! I&apos;m Jerry. I&apos;m a 4th year undergraduate student
            studying computer science at UC Davis. I am interested in full stack
            development and UI/UX design.
          </p>
          <div className="flex space-x-6">
            <a
              href="https://www.linkedin.com/in/jerryowu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-4xl text-blue-600 hover:text-blue-800 transition-colors duration-300"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/jerrywusa/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-4xl text-gray-800 hover:text-gray-600 transition-colors duration-300"
            >
              <FaGithub />
            </a>
            <a
              href="mailto:mrjerryowu@gmail.com"
              className="text-4xl text-red-600 hover:text-red-800 transition-colors duration-300"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://www.instagram.com/jerry.o.wu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-4xl text-pink-600 hover:text-pink-800 transition-colors duration-300"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className="relative w-[400px] h-[400px] mr-64">
          <ImageStack images={images} />
        </div>
      </div>
    </main>
  );
}
