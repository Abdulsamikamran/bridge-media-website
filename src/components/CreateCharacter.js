"use client";
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const cardData = [
  {
    icon: "/assets/audience.svg",
    title: "Target audience",
    description:
      "We have provide target audience research that identifies the personas most likely to engage with a product or service by analyzing their demographics, behaviors, and interests—helping tailor messages and boost campaign effectiveness.",
  },
  {
    icon: "/assets/brand.svg",
    title: "Brand elements",
    description:
      "Brand elements focus on features like logos, colors, names, and slogans shape audience perception. They ensure these elements connect with the target market and support a strong, memorable brand identity.",
  },
  {
    icon: "/assets/insperational.svg",
    title: "Insperational assets",
    description:
      "Inspiration assets are visual, verbal, or conceptual references that guide the creative direction. They can include mood boards, past campaigns, competitor ads, or imagery styles that spark ideas..",
  },
  {
    icon: "/assets/editor.svg",
    title: "Advanced editor",
    description:
      "Edit like a pro with our advanced video editor—precision cutting, layered timelines, and real-time previews at your fingertips. From fine-tuning scenes to adding effects, it's everything you need to craft standout videos with ease.",
  },
];

export default function ScrollRevealImage() {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const [scrollRatio, setScrollRatio] = useState(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleWheel = (e) => {
      const isScrollingDown = e.deltaY > 0;
      const canScrollInSlider =
        (isScrollingDown && scrollRatio < 100) ||
        (!isScrollingDown && scrollRatio > 0);

      if (canScrollInSlider) {
        e.preventDefault();
        if (isScrolling.current) return;
        isScrolling.current = true;

        const newRatio = scrollRatio + (isScrollingDown ? 8 : -8);
        setScrollRatio(Math.min(Math.max(newRatio, 0), 100));

        setTimeout(() => {
          isScrolling.current = false;
        }, 50);
      }
    };

    const handleTouchStart = (e) => {
      e.preventDefault();
      slider.dataset.touchStart = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const touchY = e.touches[0].clientY;
      const startY = parseFloat(slider.dataset.touchStart || "0");
      const deltaY = startY - touchY;

      const newRatio = Math.min(Math.max(scrollRatio - deltaY * 0.9, 0), 100);
      setScrollRatio(newRatio);
      slider.dataset.touchStart = touchY;
    };

    slider.addEventListener("wheel", handleWheel, { passive: false });
    slider.addEventListener("touchstart", handleTouchStart, { passive: false });
    slider.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      slider.removeEventListener("wheel", handleWheel);
      slider.removeEventListener("touchstart", handleTouchStart);
      slider.removeEventListener("touchmove", handleTouchMove);
    };
  }, [scrollRatio]);

  return (
    <div className="relative h-full w-full px-4">
      <div className="flex flex-col items-center justify-center mb-10">
        <h2 className="text-[#D9D9D9] text-[48px] font-bold">
          Create your characters.
        </h2>
        <h2 className="heading-gradient">Keep them consistent.</h2>
      </div>
      <div
        ref={containerRef}
        className="h-[880px] w-full flex items-center justify-center bg-transparent"
      >
        <div
          ref={sliderRef}
          className="w-full rounded-[40px] overflow-hidden h-[880px]"
        >
          <ReactCompareSlider
            style={{
              borderRadius: "1rem",
              overflow: "hidden",
              height: "100%",
            }}
            className="h-full w-full"
            itemOne={
              <ReactCompareSliderImage
                src="/assets/images/character2.jpg"
                alt="Color"
                style={{
                  objectFit: "fill",
                  width: "100%",
                  height: "100%",
                }}
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src="/assets/images/character1.jpg"
                alt="Black & White"
                style={{
                  objectFit: "fill",
                  width: "100%",
                  height: "100%",
                }}
              />
            }
            position={scrollRatio}
            onlyHandleDraggable={false}
            handle={<div className="w-[10px] h-full bg-black" />}
          />
        </div>
      </div>
      <p className="text-[#D0D4D9] text-[24px] text-center mt-10 max-w-[700px] mx-auto">
        Your characters, scene after scene, exactly how you imagined them. With
        Character Consistency, every frame stays on-script—no surprise wardrobe
        changes or mystery makeovers. Just a seamless visual story, worthy of
        the big screen.
      </p>

      <div className="grid grid-cols-4 px-10 gap-8 mt-10">
        {cardData.map((item, index) => (
          <div
            key={index}
            className="bg-[#23282E] space-y-7 rounded-xl p-[24px]"
          >
            <Image
              src={item.icon}
              alt={item.title}
              width={28}
              className="mb-20"
              height={28}
            />
            <h2 className="text-[24px] font-bold text-white mb-4">
              {item.title}
            </h2>
            <p className="text-[16px] text-white font-semibold">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
