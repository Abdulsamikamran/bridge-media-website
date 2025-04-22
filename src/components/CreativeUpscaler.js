'use client'

import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

export default function CreativeUpscaler() {
  const [mounted, setMounted] = useState(false)

  // Always call hooks unconditionally at the top level
  const { scrollYProgress } = useScroll()

  // Always call all useTransform hooks, regardless of mounted state
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.5])
  const x = useTransform(scrollYProgress, [0, 0.4], [0, 50])
  const y = useTransform(scrollYProgress, [0, 0.4], [0, 150])
  const borderRadius = useTransform(scrollYProgress, [0, 0.4], [0, 8])
  const opacity = useTransform(scrollYProgress, [0.25, 0.4], [1, 0])

  // For the Creative Upscaler UI
  const uiOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1])
  const targetImageOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1])

  // Wait until component is mounted
  useEffect(() => {
    setMounted(true)
  }, [])

  // Server-side rendering placeholder
  if (!mounted) {
    return (
      <div className="h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="w-full h-full relative">
          <Image src={'/assets/images/2k.jpg'} fill alt="full-width banner" className="w-full h-full object-cover" priority />
          <div className="absolute bottom-10 left-0 right-0 text-center text-white">
            <p className="text-lg">Scroll to zoom out</p>
            <div className="mt-2 animate-bounce">↓</div>
          </div>
        </div>
      </div>
    )
  }

  // Always wrap actual content in an AnimatePresence with a single child
  return (
    <>
      {/* Full-screen image section with scaling effect on scroll */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden" style={{ zIndex: 50 }}>
        <motion.div
          key="main-image-container"
          className="w-full h-full relative overflow-hidden"
          style={{
            scale,
            x,
            y,
            borderRadius,
            transformOrigin: 'center center',
            zIndex: 50,
          }}
        >
          <motion.div key="main-image-wrapper" className="w-full h-full relative" style={{ opacity }}>
            <Image src={'/assets/images/2k.jpg'} fill alt="full-width banner" className="w-full h-full object-cover" priority />
            <div className="absolute bottom-10 left-0 right-0 text-center text-white">
              <p className="text-lg">Scroll to zoom out</p>
              <div className="mt-2 animate-bounce">↓</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Creative Upscaler section - overlaid on animation */}
        <motion.section
          key="creative-upscaler-ui"
          className="absolute top-0 left-0 py-20 flex flex-col items-center justify-center w-full h-screen"
          style={{
            opacity: uiOpacity,
            zIndex: 45,
          }}
        >
          <div className="flex flex-col items-center justify-center">
            <motion.div
              key="upscaler-ui-container"
              className="relative mb-16 transform-gpu"
              style={{
                opacity: uiOpacity,
              }}
            >
              <div className="w-[861px] h-[589px] relative">
                <div className="w-[861px] h-[589px] left-0 top-0 absolute bg-[radial-gradient(ellipse_115.94%_116.96%_at_9.81%_9.24%,_rgba(53.59,_53.59,_53.59,_0.40)_0%,_rgba(25.96,_25.96,_25.96,_0.11)_100%)] rounded-3xl shadow-[0px_0px_24px_0px_rgba(0,0,0,1.00)] border-[1.50px] border-white backdrop-blur-[1.50px]"></div>
                <div className="w-[513px] h-36 left-[175px] top-[313px] absolute bg-neutral-700 rounded-lg"></div>
                <div className="w-[513px] h-24 left-[175px] top-[465px] absolute bg-neutral-700 rounded-lg"></div>
                <div className="w-36 h-[548px] left-[17px] top-[18px] absolute bg-neutral-700 rounded-lg"></div>
                <div className="w-36 h-[548px] left-[702px] top-[18px] absolute bg-neutral-700 rounded-lg"></div>
                <div
                  data-property-1="Landscape 16:9"
                  data-property-2="4"
                  className="w-[513.16px] h-72 left-[175px] top-[18px] absolute overflow-hidden rounded-lg"
                >
                  <motion.div key="target-image-container" style={{ opacity: targetImageOpacity }}>
                    <Image
                      className="w-[513.16px] h-72 left-0 top-0 absolute rounded-lg object-cover"
                      src={'/assets/images/2k.jpg'}
                      width={513}
                      height={288}
                      alt="fantasy book"
                      priority
                    />
                  </motion.div>
                </div>
                <div className="w-28 h-4 left-[373px] top-[429px] absolute">
                  <div className="w-4 h-4 left-[51px] top-0 absolute bg-sky-300 rounded"></div>
                  <div className="w-3 h-3 left-[34px] top-[2px] absolute bg-stone-500 rounded"></div>
                  <div className="w-3 h-3 left-[17px] top-[2px] absolute bg-stone-500 rounded"></div>
                  <div className="w-3 h-3 left-0 top-[2px] absolute bg-stone-500 rounded"></div>
                  <div className="w-3 h-3 left-[72px] top-[2px] absolute bg-stone-500 rounded"></div>
                  <div className="w-3 h-3 left-[89px] top-[2px] absolute bg-stone-500 rounded"></div>
                  <div className="w-3 h-3 left-[106px] top-[2px] absolute bg-stone-500 rounded"></div>
                </div>
              </div>

              <div className="mt-10 flex justify-center items-center gap-2">
                {[1, 2, 3, 4, 5, 6, 7].map((dot, index) => (
                  <div key={`dot-${index}`} className={`w-2 h-2 rounded-full ${index === 3 ? 'bg-[#6CCAFF]' : 'bg-gray-500'}`}></div>
                ))}
              </div>
            </motion.div>

            <h2 className="text-white text-3xl font-bold mb-4">Creative Upscaler</h2>
            <p className="text-[#D0D4D9] text-center max-w-3xl">
              BridgeStudio elevates your images or videos from blurry to breathtaking, creating stunning, crisp, high-def works of art in seconds.
              Fast, effortless, and sharp.
            </p>
          </div>
        </motion.section>
      </div>

      {/* Spacer to allow scrolling for animation */}
      <div className="h-[200vh] w-full"></div>
    </>
  )
}
