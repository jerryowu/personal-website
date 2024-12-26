import snowboarding1 from "/public/fun/snowboarding/IMG_0238.jpg";
import snowboarding2 from "/public/fun/snowboarding/IMG_0251.jpg";
import snowboarding3 from "/public/fun/snowboarding/IMG_0233.jpg";
import snowboarding4 from "/public/fun/snowboarding/IMG_0252.jpg";

import food1 from "/public/fun/food/uncooked_steak.png";
import food2 from "/public/fun/food/steak.png";
import food3 from "/public/fun/food/meal_prep.png";
import food4 from "/public/fun/food/burger.png";
import food5 from "/public/fun/food/breakfast.png";
import ImageStack from "../components/ImageStack";

export default function Fun() {
  const snowboardImages = [
    snowboarding1,
    snowboarding2,
    snowboarding3,
    snowboarding4,
  ];

  const foodImages = [food1, food2, food3, food4, food5];

  return (
    <main className="flex h-100 flex-col items-center justify-between p-4 md:p-16">
      <div className="flex flex-col md:flex-row pb-16 md:pb-16 w-full">
        <p className="w-full md:w-1/2 pb-8 md:pb-0 md:pr-8 text-lg md:text-xl text-center md:text-left flex items-center">
          There&apos;s something surreal about being immersed in nature,
          disconnected from technology, surrounded by fresh powder and snow
          covered pines. The experience of floating down the mountain with
          friends, all while enjoying the simple pleasure of a crusty peanut
          butter jelly sandwich, is pure tranquility.
        </p>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-[300px] h-[225px] md:w-[400px] md:h-[300px]">
            <ImageStack images={snowboardImages} />
          </div>
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row w-full mt-8 md:mt-0">
        <div className="w-full md:w-1/2 flex justify-center pt-8 md:pt-0">
          <div className="relative w-[300px] h-[225px] md:w-[400px] md:h-[300px]">
            <ImageStack images={foodImages} />
          </div>
        </div>
        <p className="w-full md:w-1/2 md:pl-8 text-lg md:text-xl text-center md:text-left flex items-center">
          Weightlifting is one of my favorite hobbies. It&apos;s a great way for
          me to unwind, and I&apos;ve made some of my closest friends at the
          gym. Rather than sharing lifting photos here, I thought I&apos;d post
          some meal prep instead.
        </p>
      </div>
    </main>
  );
}
