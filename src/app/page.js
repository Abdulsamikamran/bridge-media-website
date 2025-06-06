import Hero from "@/components/Hero";
import Navbar from "../components/Navbar";
import Image from "next/image";
import ScrollCarosel from "@/components/ScrollCarosel";
import Counter from "@/components/Counter";
import Platforms from "@/components/Platforms";
import CreateCharacter from "@/components/CreateCharacter";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section id="home" className="h-screen flex items-center justify-center ">
        <Hero />
      </section>
      <div className="flex flex-col items-center justify-center text-center py-20 border-b border-[#979797]">
        <p className="heading-gradient">You are the Auteur</p>
        <p className="sub-text  w-2xl">
          Empower yourself to create interactive marketing, sales, and ad
          content through AI.​
        </p>
      </div>

      <section id="inspiration" className="my-20  px-4">
        <div className=" flex flex-col justify-center items-center text-center gap-10">
          <h4 className="font-semibold text-[20px] tracking-[6px] text-white">
            INTRODUCTION
          </h4>
          <Image
            // className="w-[369px] h-[116px]"
            src={"/assets/logo-2.svg"}
            width={600}
            height={600}
            alt="logo"
          />
          <p className="sub-text w-2xl">
            {" "}
            Transform your vision into reality. Create ads that convert ideas
            into leads. A unified creative platform… simple, robust, fast.
          </p>
        </div>
        <ScrollCarosel />
      </section>

      <section
        id="pricing"
        className="h-full border-t border-b border-[#979797]"
      >
        <div className="flex w-full">
          <div className="relative px-32 border-r border-[#979797] flex-[0.5] w-full py-32">
            <Image
              src={"/assets/images/graps-1.png"}
              width={500}
              height={500}
              alt="graph"
            />
            <Image
              className="absolute z-20 right-40 top-[400px]"
              src={"/assets/images/graph-2.png"}
              width={500}
              height={500}
              alt="graph2"
            />
          </div>
          <div className="flex-[0.5] text-center mx-32 py-10">
            <h3 className="heading-gradient">
              Smarter ads, better results! Automated targeting that delivers
              ROI.
            </h3>
            <p className="text-[18px] text-[#D0D4D9] mb-6">
              BridgeStudio helps you create ad campaigns more cost effectively,
              on-target, and efficiently.
            </p>
            <div className="py-8">
              <p className="text-[#6CCAFF] font-bold text-[48px]">
                <Counter target={85} suffix="%" duration={1500} />
              </p>
              <p className="text-[18px] text-[#D0D4D9]">Cost reduction</p>
            </div>
            <div className="w-full border-t border-1 border-[#979797]" />
            <div className="py-8">
              <p className="text-[#6CCAFF] font-bold text-[48px]">
                <Counter target={10} suffix="x" duration={1500} />
              </p>
              <p className="text-[18px] text-[#D0D4D9]">
                Faster time to market
              </p>
            </div>
            <div className="w-full border-t border-1 border-[#979797]" />
            <div className="py-8">
              <p className="text-[#6CCAFF] font-bold text-[48px]">
                <Counter target={5} suffix="x" duration={1500} />
              </p>
              <p className="text-[18px] text-[#D0D4D9]">generation</p>
            </div>
          </div>
        </div>
      </section>
      <section
        id="platform"
        className="py-20 border-b border-[#979797] flex items-center justify-center "
      >
        <Platforms />
      </section>
      <section
        id="create-character"
        className="py-20 flex items-center justify-center "
      >
        <CreateCharacter />
      </section>
    </main>
  );
}
