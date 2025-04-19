import Image from "next/image";
import React from "react";

const Platforms = () => {
  const platforms = [
    {
      id: 1,
      image: "/assets/insta.svg",
      alt: "platform1",
    },
    {
      id: 2,
      image: "/assets/linkedn.svg",
      alt: "platform2",
    },
    {
      id: 3,
      image: "/assets/tiktok.svg",
      alt: "platform3",
    },
    {
      id: 4,
      image: "/assets/vimeo.svg",
      alt: "platform4",
    },
    {
      id: 5,
      image: "/assets/youtube.svg",
      alt: "platform5",
    },
    {
      id: 6,
      image: "/assets/discord.svg",
      alt: "platform6",
    },
    {
      id: 7,
      image: "/assets/soundcloud.svg",
      alt: "platform7",
    },
    {
      id: 8,
      image: "/assets/facebook.svg",
      alt: "platform8",
    },
  ];
  return (
    <div className=" ">
      <h2 className="text-[40px] text-[#D9D9D9] font-bold mb-10 text-center ">
        Platforms that work with us
      </h2>
      <div className="grid grid-cols-4 gap-20 justify-center items-center">
        {platforms.map((item) => (
          <div key={item.id} className="   flex items-center justify-center">
            <Image
              src={item.image}
              alt={item.alt}
              width={100}
              height={100}
              className="w-[80%] h-[80%] object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Platforms;
