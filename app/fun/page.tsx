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
    <main className="flex h-100 flex-col items-center justify-between p-16">
      <div className="flex flex-row pb-16">
        <p className="w-1/2 pl-10 text-xl flex items-center">
          There&apos;s something unparalleled about being immersed in nature,
          disconnected from technology, surrounded by fresh powder and snow
          covered pines. The experience of carving down the mountain with
          friends, all while enjoying a simple pocket sandwich, is truly
          amazing.
        </p>
        <div className="relative ml-auto w-[400px] h-[300px] mr-64">
          <ImageStack images={snowboardImages} />
        </div>
      </div>
      <div className="flex flex-row">
        <div className="relative ml-auto w-[400px] h-[300px] mr-64">
          <ImageStack images={foodImages} />
        </div>
        <p className="w-1/2 pl-10 text-xl flex items-center">
          Weightlifting is one of my favorite hobbies. It&apos;s a great way for
          me to unwind, and I&apos;ve made some of my closest friends at the
          gym. Rather than sharing lifting photos here, I thought I&apos;d post
          some meal prep instead. For more, check out my lifting page on ig
          @jerryberry.lifts
        </p>
      </div>
    </main>
  );
}
