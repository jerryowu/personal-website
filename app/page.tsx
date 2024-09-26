import Image from "next/image";

import camera_photo from "/public/camera.jpg";

export default function Home() {
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
          <Image
            src={camera_photo}
            alt="Headshot"
            width={300}
            height={300}
            priority
          />
        </div>
      </div>
    </main>
  );
}
