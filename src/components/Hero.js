import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="text-white w-full h-full">
      {/* hero1 */}

      <div className="flex">
        <div className="flex-[0.9] w-full h-full relative">
          <Image
            src="/assets/images/hero1.png"
            alt="heroimg"
            width={800}
            height={600}
            className=" w-full h-screen object-cover"
          />
        </div>
        <div className="flex-[0.4] flex flex-col h-screen">
          <div className="bg-white flex-1  flex items-end p-4 justify-start">
            <p className="text-[#8EDA00] text-[32px] font-normal">
              Sales & <br />
              Marketing ad
            </p>
          </div>
          <div className="bg-[#8EDA00]  flex-1  flex items-end p-4 justify-start">
            <p className="text-black text-[14px] p-4 font-semibold">
              Creation details
              <br /> Prompt + Platform
              <br /> Size ratio
            </p>
          </div>
        </div>
      </div>
      {/* hero2 */}
      {/* <div className="flex h-screen w-full">
        <div className="flex-[0.6] h-full bg-white  flex items-end p-4 justify-start">
          <p className="text-[#9B49F0] text-[32px] font-normal">
            Influence <br /> UGCs
            <br /> Ads
          </p>
        </div>
        <div className="flex-[0.4] w-full h-full relative">
          <Image
            src="/assets/images/hero2.png"
            alt="heroimg"
            width={800}
            height={800}
            className=" w-full h-screen object-cover"
          />
        </div>
        <div className="flex-[0.6] h-full flex items-end p-4 justify-start bg-[#9B49F0]">
          <p className="text-black text-[14px] p-4 font-semibold">
            Ratio 9:16
            <br /> UGC mobile
            <br /> Product ad
          </p>
        </div>
      </div> */}
      {/* hero3 */}
      {/* <div className="flex">
        <div className="flex-[0.6] flex flex-col h-screen">
          <div className="bg-white flex-1  flex items-end p-4 justify-start">
            <p className="text-[#E400E8] text-[32px] font-normal">Images</p>
          </div>
          <div className="bg-[#E400E8]  flex-1  flex items-end p-4 justify-start">
            <p className="text-black text-[14px] p-4 font-semibold">
              Creation details
              <br /> Prompt + Platform
              <br /> Size ratio
            </p>
          </div>
        </div>
        <div className="flex-[0.5] w-full h-full relative">
          <Image
            src="/assets/images/hero3.png"
            alt="heroimg"
            width={800}
            height={600}
            className=" w-full h-screen object-cover"
          />
        </div>
      </div> */}
      {/* hero4 */}
      {/* <div className="flex h-screen w-full">
        <div className="flex-[0.4] h-full bg-white  flex items-center p-4 justify-start">
          <p className="text-[#00756FF2]/95 text-[32px] font-normal">Images</p>
        </div>
        <div className="flex-[0.6] w-full h-full relative">
          <Image
            src="/assets/images/hero4.png"
            alt="heroimg"
            width={800}
            height={800}
            className=" w-full h-screen object-cover"
          />
        </div>
        <div className="flex-[0.4] h-full flex items-end p-4 justify-start bg-[#00756FF2]/95">
          <p className="text-white text-[14px] p-4 font-semibold">
            Ratio 9:16
            <br /> UGC mobile
            <br /> Product ad
          </p>
        </div>
      </div> */}
      {/* hero5 */}
      {/* <div className="flex">
        <div className="flex-[0.3] flex flex-col h-screen">
          <div className="bg-white flex-1  flex items-end p-4 justify-start">
            <p className="text-[#F44042] text-[32px] font-normal">
              Sales & <br />
              Marketing ad
            </p>
          </div>
          <div className="bg-[#F44042]  flex-1  flex items-end p-4 justify-start">
            <p className="text-black text-[14px] p-4 font-semibold">
              Creation details
              <br /> Prompt + Platform
              <br /> Size ratio
            </p>
          </div>
        </div>
        <div className="flex-[0.8] w-full h-full relative">
          <Image
            src="/assets/images/hero5.png"
            alt="heroimg"
            width={800}
            height={600}
            className=" w-full h-screen object-cover"
          />
        </div>
      </div> */}
    </div>
  );
};

export default Hero;
