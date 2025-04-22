'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const carouselData = [
  {
    id: 1,
    title: 'Images',
    description:
      'If you can imagine it, BridgeStudio can render it. Unleash your creativity with our super-agent model, describe your vision, and see it realized. Spark new ideas and break through creative barriers with ease.If you can imagine it, BridgeStudio can render it...',
    buttons: [{ text: 'Create images', icon: '/assets/arrow-square-out.svg' }],
    image: '/assets/images/img-1.png',
  },
  {
    id: 2,
    title: 'ADs',
    description:
      "Create winning ads in minutes… watch your ideas come to life, from ideation to publication with BridgeStudio—sketch, tweak, and see your vision unfold right before your eyes. Create, refine, repeat—it's creativity in motion! ",
    buttons: [{ text: 'Create ads', icon: '/assets/arrow-square-out.svg' }],
    image: '/assets/images/img-2.png',
  },
  {
    id: 3,
    title: 'Reels/shorts',
    description:
      'BridgeStudio turns your vision into stunning videos in seconds. No cameras, no actors, no editing headaches—just instant, high-def magic with a few clicks. Create the right video for the right channel in minutes.',
    buttons: [
      { text: 'Create reels/shorts', icon: '/assets/arrow-square-out.svg' },
      { text: 'Learn more', icon: '/assets/arrow-square-out.svg' },
    ],
    image: '/assets/images/img-3.png',
  },
  {
    id: 4,
    title: 'Sales',
    description:
      'Video converts! Capture your target audience and boost conversions faster with powerful, attention-grabbing content that drives results.',
    buttons: [{ text: 'Create videos', icon: '/assets/arrow-square-out.svg' }],
    image: '/assets/images/img-4.png',
  },
  {
    id: 5,
    title: 'Marketing',
    description: 'Create captivating, impactful videos. The keystone of your campaign—on brand, on time, and within budget.',
    buttons: [
      { text: 'Create videos', icon: '/assets/arrow-square-out.svg' },
      { text: 'Get a demo', icon: '/assets/arrow-square-out.svg' },
    ],
    image: '/assets/images/img-5.png',
  },
  {
    id: 6,
    title: 'Audio',
    description:
      'Be your own sound studio. Effortlessly create engaging music, professional voiceover, clone unique voices, and dub content in multiple languages. From crisp narration to custom soundtracks, build high-quality audio in any voice, style, or language for pro-level advertisements.',
    buttons: [{ text: 'Create audio tracks', icon: '/assets/arrow-square-out.svg' }],
    image: null,
  },
  {
    id: 7,
    title: 'Social media franchise',
    description: 'Create your own social media franchise',
    buttons: [{ text: 'Create videos', icon: '/assets/arrow-square-out.svg' }],
    image: '/assets/images/img-6.png',
  },
  {
    id: 8,
    title: 'Corporate training',
    description: 'How do you get your employees ramped on the latest from your HR team, share it in minutes.',
    buttons: [{ text: 'Create videos', icon: '/assets/arrow-square-out.svg' }],
    image: '/assets/images/img-7.png',
  },
]

export default function ScrollCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(null)
  const containerRef = useRef(null)
  const isScrolling = useRef(false)
  const touchStartY = useRef(0)

  const goToSlide = (index) => {
    if (index === currentIndex || isScrolling.current) return

    setPrevIndex(currentIndex)
    setCurrentIndex(index)
    isScrolling.current = true
    setTimeout(() => {
      isScrolling.current = false
    }, 1000)
  }

  const handleWheel = (e) => {
    if (isScrolling.current) {
      e.preventDefault()
      return
    }

    const direction = e.deltaY > 0 ? 1 : -1

    // Check if we're at the boundary and trying to scroll beyond
    if ((currentIndex === 0 && direction === -1) || (currentIndex === carouselData.length - 1 && direction === 1)) {
      // Allow default scroll behavior
      return
    }

    e.preventDefault()
    const newIndex = Math.max(0, Math.min(carouselData.length - 1, currentIndex + direction))

    if (newIndex !== currentIndex) {
      setPrevIndex(currentIndex)
      setCurrentIndex(newIndex)
      isScrolling.current = true
      setTimeout(() => {
        isScrolling.current = false
      }, 1000)
    }
  }

  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchMove = (e) => {
    if (isScrolling.current) {
      e.preventDefault()
      return
    }

    const touchY = e.touches[0].clientY
    const diff = touchStartY.current - touchY

    if (Math.abs(diff) > 50) {
      // Threshold for swipe
      const direction = diff > 0 ? 1 : -1

      // Check if we're at the boundary and trying to scroll beyond
      if ((currentIndex === 0 && direction === -1) || (currentIndex === carouselData.length - 1 && direction === 1)) {
        // Allow default scroll behavior
        return
      }

      e.preventDefault()
      const newIndex = Math.max(0, Math.min(carouselData.length - 1, currentIndex + direction))

      if (newIndex !== currentIndex) {
        setPrevIndex(currentIndex)
        setCurrentIndex(newIndex)
        isScrolling.current = true
        setTimeout(() => {
          isScrolling.current = false
        }, 1000)
      }
    }
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('wheel', handleWheel, { passive: false })
    container.addEventListener('touchstart', handleTouchStart, {
      passive: false,
    })
    container.addEventListener('touchmove', handleTouchMove, {
      passive: false,
    })

    return () => {
      container.removeEventListener('wheel', handleWheel)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
    }
  }, [currentIndex])

  return (
    <div className="relative my-20 text-white h-[500px] overflow-hidden max-w-screen-2xl mx-auto" ref={containerRef}>
      {/* Navigation Dots */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-50">
        {carouselData.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-500'}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slides */}
      <div className="w-full h-full relative">
        {carouselData.map((item, index) => {
          const isActive = index === currentIndex
          const isPrevious = index === prevIndex
          const isVisible = isActive || isPrevious

          return isVisible ? (
            <motion.div
              key={item.id}
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ zIndex: isActive ? 20 : 10 }}
            >
              <div className="flex flex-wrap md:flex-nowrap gap-8 items-center justify-center max-w-6xl w-full px-4 md:px-8 lg:px-12 mx-auto">
                {/* Image stack container */}
                <div className="shrink-0 relative w-[560px] h-[420px] perspective-[1000px] overflow-visible">
                  {/* Stack effect - we render all visible images */}
                  {carouselData.map((imageItem, imageIndex) => {
                    // Only render images if they have an image and are either current or previous
                    if (!imageItem.image || !(imageIndex === currentIndex || imageIndex === prevIndex)) {
                      return null
                    }

                    const isCurrent = imageIndex === currentIndex
                    const isPrev = imageIndex === prevIndex

                    // Different variants for different states
                    const variants = {
                      current: {
                        y: 0,
                        scale: 1,
                        rotateX: 0,
                        opacity: 1,
                        zIndex: 20,
                        filter: 'brightness(1)',
                      },
                      previous: {
                        y: -20,
                        scale: 0.95,
                        rotateX: 5,
                        opacity: 0.7,
                        zIndex: 10,
                        filter: 'brightness(0.7)',
                      },
                      hidden: {
                        y: 50,
                        scale: 0.9,
                        rotateX: 10,
                        opacity: 0,
                        zIndex: 0,
                        filter: 'brightness(0.5)',
                      },
                    }

                    return (
                      <motion.div
                        key={`image-${imageItem.id}`}
                        className="absolute w-full h-full rounded-3xl overflow-hidden"
                        initial="hidden"
                        animate={isCurrent ? 'current' : isPrev ? 'previous' : 'hidden'}
                        variants={variants}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 30,
                        }}
                        style={{
                          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                          transformStyle: 'preserve-3d',
                        }}
                      >
                        <Image
                          src={imageItem.image}
                          alt={imageItem.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 560px"
                          priority={imageIndex === 0}
                          className="object-cover"
                        />
                      </motion.div>
                    )
                  })}

                  {/* No image fallback */}
                  {item.image === null && isActive && (
                    <motion.div
                      key={`no-image-${item.id}`}
                      className="absolute w-full h-full rounded-3xl flex items-center justify-center text-white"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      }}
                      style={{
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      No Image Available
                    </motion.div>
                  )}
                </div>

                {/* Text with slide animation */}
                <div className="flex-1 flex flex-col justify-center">
                  {isActive && (
                    <motion.div
                      key={`text-${item.id}`}
                      className="self-stretch"
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                        delay: 0.1,
                      }}
                    >
                      <motion.h2
                        className="text-[36px] font-normal mb-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 30,
                          delay: 0.2,
                        }}
                      >
                        {item.title}
                      </motion.h2>
                      <div className="self-stretch inline-flex justify-start items-center gap-1">
                        <motion.p
                          className="flex-1 justify-start text-base-text-medium-default text-lg font-normal font-Inter leading-normal text-[#D0D4D9] mb-8"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 30,
                            delay: 0.3,
                          }}
                        >
                          {item.description}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}

                  {/* Buttons with animation */}
                  {isActive && (
                    <motion.div
                      className="z-30 flex flex-wrap gap-3"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                        delay: 0.4,
                      }}
                    >
                      {item.buttons.map((button, btnIndex) => (
                        <motion.button key={btnIndex} className="btn-outline" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          {button.text}
                          <Image src={button.icon} alt="arrow" width={20} height={20} />
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : null
        })}
      </div>
    </div>
  )
}
