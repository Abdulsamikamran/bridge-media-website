"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const carouselData = [
  {
    id: 1,
    title: "Images",
    description:
      "If you can imagine it, BridgeStudio can render it. Unleash your creativity with our super-agent model, describe your vision, and see it realized. Spark new ideas and break through creative barriers with ease.If you can imagine it, BridgeStudio can render it...",
    buttonText: "Create images",
    image: "/assets/images/img-1.png",
  },
  {
    id: 2,
    title: "ADs",
    description:
      "Create winning ads in minutes… watch your ideas come to life, from ideation to publication with BridgeStudio—sketch, tweak, and see your vision unfold right before your eyes. Create, refine, repeat—it’s creativity in motion! ",
    buttonText: "Create ads",
    image: "/assets/images/img-2.png",
  },
  {
    id: 3,
    title: "Reels/shorts",
    description:
      "BridgeStudio turns your vision into stunning videos in seconds. No cameras, no actors, no editing headaches—just instant, high-def magic with a few clicks. Create the right video for the right channel in minutes.",
    buttonText: "Create reels/shorts",
    image: "/assets/images/img-3.png",
  },
  {
    id: 4,
    title: "Sales",
    description:
      "Video converts! Capture your target audience and boost conversions faster with powerful, attention-grabbing content that drives results.",
    buttonText: "Create videos",
    image: "/assets/images/img-4.png",
  },
  {
    id: 5,
    title: "Marketing",
    description:
      "Create captivating, impactful videos. The keystone of your campaign—on brand, on time, and within budget.",
    buttonText: "Create videos",
    image: "/assets/images/img-5.png",
  },
  {
    id: 6,
    title: "Audio",
    description:
      "Be your own sound studio. Effortlessly create engaging music, professional voiceover, clone unique voices, and dub content in multiple languages. From crisp narration to custom soundtracks, build high-quality audio in any voice, style, or language for pro-level advertisements.",
    buttonText: "Create audio tracks",
    image: null,
  },
  {
    id: 7,
    title: "Social media franchise",
    description: "Create your own social media franchise",
    buttonText: "Create videos",
    image: "/assets/images/img-6.png",
  },
  {
    id: 8,
    title: "Corporate training",
    description:
      "How do you get your employees ramped on the latest from your HR team, share it in minutes.",
    buttonText: "Create videos",
    image: "/assets/images/img-7.png",
  },
];

export default function ScrollCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const isScrolling = useRef(false);
  const touchStartY = useRef(0);

  const goToSlide = (index) => {
    if (index === currentIndex || isScrolling.current) return;

    setCurrentIndex(index);
    isScrolling.current = true;
    setTimeout(() => {
      isScrolling.current = false;
    }, 1000);
  };

  const handleWheel = (e) => {
    if (isScrolling.current) {
      e.preventDefault();
      return;
    }

    const direction = e.deltaY > 0 ? 1 : -1;

    // Check if we're at the boundary and trying to scroll beyond
    if (
      (currentIndex === 0 && direction === -1) ||
      (currentIndex === carouselData.length - 1 && direction === 1)
    ) {
      // Allow default scroll behavior
      return;
    }

    e.preventDefault();
    const newIndex = Math.max(
      0,
      Math.min(carouselData.length - 1, currentIndex + direction)
    );

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      isScrolling.current = true;
      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    }
  };

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    if (isScrolling.current) {
      e.preventDefault();
      return;
    }

    const touchY = e.touches[0].clientY;
    const diff = touchStartY.current - touchY;

    if (Math.abs(diff) > 50) {
      // Threshold for swipe
      const direction = diff > 0 ? 1 : -1;

      // Check if we're at the boundary and trying to scroll beyond
      if (
        (currentIndex === 0 && direction === -1) ||
        (currentIndex === carouselData.length - 1 && direction === 1)
      ) {
        // Allow default scroll behavior
        return;
      }

      e.preventDefault();
      const newIndex = Math.max(
        0,
        Math.min(carouselData.length - 1, currentIndex + direction)
      );

      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
        isScrolling.current = true;
        setTimeout(() => {
          isScrolling.current = false;
        }, 1000);
      }
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [currentIndex]);

  return (
    <div
      className="relative my-20 text-white h-[300px] overflow-hidden"
      ref={containerRef}
    >
      {/* Navigation Dots */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-50">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-white " : "bg-gray-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slides */}
      <div className="w-full h-full">
        {carouselData.map((item, index) => (
          <div
            key={item.id}
            className={`absolute inset-0 flex items-center justify-center px-4 md:px-16 transition-all duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-20" : "opacity-0 z-10"
            }`}
          >
            <div className="flex flex-wrap md:flex-nowrap gap-8 items-center justify-center max-w-7xl w-full px-4 md:px-20">
              {item.image ? (
                <div className="relative w-[560px]  h-[480px] rounded-2xl overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>
              ) : (
                <div className="w-full h-full  flex items-center justify-center text-white rounded-2xl">
                  No Image Available
                </div>
              )}

              <div>
                <h2 className="text-[36px] font-normal mb-4">{item.title}</h2>
                <p className="text-[#D0D4D9] text-[18px] mb-6">
                  {item.description}
                </p>
                <button className=" btn-outline">
                  {item.buttonText}
                  <Image
                    src={"/assets/arrow-square-out.svg"}
                    alt="arrow"
                    width={20}
                    height={20}
                    className="ml-2"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
