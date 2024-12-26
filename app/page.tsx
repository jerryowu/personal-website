import camera_photo from "/public/home/camera.jpg";
import headshot from "/public/home/headshot.jpg";
import spikey from "/public/home/spikey.jpg";
import bread from "/public/home/bread.jpg";

import ImageStack from "./components/ImageStack";
import { FaLinkedin, FaGithub, FaEnvelope, FaInstagram } from "react-icons/fa";

export default function Home() {
  const images = [headshot, camera_photo, spikey, bread];

  return (
    <main className="flex h-100 flex-col items-center justify-between p-4 md:p-16">
      <div className="flex flex-col md:flex-row items-center justify-between w-full mt-8">
        <div className="w-full md:w-1/2 px-4 md:pl-20 mb-8 md:mb-0 mt-8">
          <p className="text-lg md:text-xl mb-6">
            Hi! I&apos;m Jerry. I&apos;m a 4th year undergraduate student
            studying computer science at UC Davis. I am interested in
            entrepreneurship and full stack development.
          </p>
          <div className="flex justify-center md:justify-start space-x-6">
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
              href="https://www.instagram.com/jerryowu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-4xl text-pink-600 hover:text-pink-800 transition-colors duration-300"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] md:mr-48">
          <ImageStack images={images} />
        </div>
      </div>
    </main>
  );
}
