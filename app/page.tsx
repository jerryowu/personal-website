import camera_photo from "/public/home/camera.jpg";
import headshot from "/public/home/headshot.jpg";
import spikey from "/public/home/spikey.jpg";
import bread from "/public/home/bread.jpg";

import ImageStack from "./components/ImageStack";

export default function Home() {
  const images = [headshot, camera_photo, spikey, bread];

  return (
    <main className="flex h-100 flex-row items-center justify-between p-16">
      <p className="w-1/2 pl-20 text-xl">
        Hi! I&apos;m Jerry. I&apos;m a 4th year undergraduate student studying
        computer science at UC Davis. I am interested in full stack development
        and UI/UX design.
      </p>
      <div className="relative w-[400px] h-[400px] mr-64">
        <ImageStack images={images} />
      </div>
    </main>
  );
}
