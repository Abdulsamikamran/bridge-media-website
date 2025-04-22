import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Hero = () => {
  const [activeHero, setActiveHero] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHero((prev) => (prev % 5) + 1)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleDotClick = (index) => {
    setActiveHero(index)
  }

  // Animation variants for hero sections
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: 'beforeChildren',
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
      },
    },
  }

  // Variants for different directions with circular motion
  const fromTopLeft = {
    hidden: { x: '-100%', y: '-100%', rotate: -15, opacity: 0 },
    visible: {
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 80, damping: 15 },
    },
  }

  const fromTopRight = {
    hidden: { x: '100%', y: '-100%', rotate: 15, opacity: 0 },
    visible: {
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 80, damping: 15 },
    },
  }

  const fromBottomLeft = {
    hidden: { x: '-100%', y: '100%', rotate: 15, opacity: 0 },
    visible: {
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 80, damping: 15 },
    },
  }

  const fromBottomRight = {
    hidden: { x: '100%', y: '100%', rotate: -15, opacity: 0 },
    visible: {
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 80, damping: 15 },
    },
  }

  return (
    <div className="text-white w-full h-full overflow-hidden relative">
      <AnimatePresence mode="wait">
        {/* hero1 */}
        {activeHero === 1 && (
          <motion.div className="flex absolute inset-0" initial="hidden" animate="visible" exit="exit" variants={containerVariants} key="hero1">
            <motion.div variants={fromTopLeft} className="flex-[0.9] w-full h-full relative">
              <Image src="/assets/images/hero1.png" alt="heroimg" width={800} height={600} className="w-full h-screen object-cover" />
            </motion.div>
            <div className="flex-[0.4] flex flex-col h-screen">
              <motion.div variants={fromTopRight} className="bg-white flex-1 flex items-end p-4 justify-start">
                <p className="text-[#8EDA00] text-[32px] font-normal">
                  Sales & <br />
                  Marketing ad
                </p>
              </motion.div>
              <motion.div variants={fromBottomRight} className="bg-[#8EDA00] flex-1 flex items-end p-4 justify-start">
                <p className="text-black text-[14px] p-4 font-semibold">
                  Creation details
                  <br /> Prompt + Platform
                  <br /> Size ratio
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* hero2 */}
        {activeHero === 2 && (
          <motion.div
            className="flex h-screen w-full absolute inset-0"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            key="hero2"
          >
            <motion.div variants={fromTopLeft} className="flex-[0.6] h-full bg-white flex items-end p-4 justify-start">
              <p className="text-[#9B49F0] text-[32px] font-normal">
                Influence <br /> UGCs
                <br /> Ads
              </p>
            </motion.div>
            <motion.div variants={fromTopRight} className="flex-[0.4] w-full h-full relative">
              <Image src="/assets/images/hero2.png" alt="heroimg" width={800} height={800} className="w-full h-screen object-cover" />
            </motion.div>
            <motion.div variants={fromBottomRight} className="flex-[0.6] h-full flex items-end p-4 justify-start bg-[#9B49F0]">
              <p className="text-black text-[14px] p-4 font-semibold">
                Ratio 9:16
                <br /> UGC mobile
                <br /> Product ad
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* hero3 */}
        {activeHero === 3 && (
          <motion.div className="flex absolute inset-0" initial="hidden" animate="visible" exit="exit" variants={containerVariants} key="hero3">
            <div className="flex-[0.6] flex flex-col h-screen">
              <motion.div variants={fromTopLeft} className="bg-white flex-1 flex items-end p-4 justify-start">
                <p className="text-[#E400E8] text-[32px] font-normal">Images</p>
              </motion.div>
              <motion.div variants={fromBottomLeft} className="bg-[#E400E8] flex-1 flex items-end p-4 justify-start">
                <p className="text-black text-[14px] p-4 font-semibold">
                  Creation details
                  <br /> Prompt + Platform
                  <br /> Size ratio
                </p>
              </motion.div>
            </div>
            <motion.div variants={fromTopRight} className="flex-[0.5] w-full h-full relative">
              <Image src="/assets/images/hero3.png" alt="heroimg" width={800} height={600} className="w-full h-screen object-cover" />
            </motion.div>
          </motion.div>
        )}

        {/* hero4 */}
        {activeHero === 4 && (
          <motion.div
            className="flex h-screen w-full absolute inset-0"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            key="hero4"
          >
            <motion.div variants={fromBottomLeft} className="flex-[0.4] h-full bg-white flex items-center p-4 justify-start">
              <p className="text-[#00756FF2]/95 text-[32px] font-normal">Images</p>
            </motion.div>
            <motion.div variants={fromTopRight} className="flex-[0.6] w-full h-full relative">
              <Image src="/assets/images/hero4.png" alt="heroimg" width={800} height={800} className="w-full h-screen object-cover" />
            </motion.div>
            <motion.div variants={fromBottomRight} className="flex-[0.4] h-full flex items-end p-4 justify-start bg-[#00756FF2]/95">
              <p className="text-white text-[14px] p-4 font-semibold">
                Ratio 9:16
                <br /> UGC mobile
                <br /> Product ad
              </p>
            </motion.div>
          </motion.div>
        )}

        {/* hero5 */}
        {activeHero === 5 && (
          <motion.div className="flex absolute inset-0" initial="hidden" animate="visible" exit="exit" variants={containerVariants} key="hero5">
            <div className="flex-[0.3] flex flex-col h-screen">
              <motion.div variants={fromTopLeft} className="bg-white flex-1 flex items-end p-4 justify-start">
                <p className="text-[#F44042] text-[32px] font-normal">
                  Sales & <br />
                  Marketing ad
                </p>
              </motion.div>
              <motion.div variants={fromBottomLeft} className="bg-[#F44042] flex-1 flex items-end p-4 justify-start">
                <p className="text-black text-[14px] p-4 font-semibold">
                  Creation details
                  <br /> Prompt + Platform
                  <br /> Size ratio
                </p>
              </motion.div>
            </div>
            <motion.div variants={fromBottomRight} className="flex-[0.8] w-full h-full relative">
              <Image src="/assets/images/hero5.png" alt="heroimg" width={800} height={600} className="w-full h-screen object-cover" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-50">
        {[1, 2, 3, 4, 5].map((index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeHero === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`View hero section ${index}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Hero
