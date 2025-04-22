'use client'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

const cardData = [
  {
    icon: '/assets/audience.svg',
    title: 'Target audience',
    description:
      'We have provide target audience research that identifies the personas most likely to engage with a product or service by analyzing their demographics, behaviors, and interests—helping tailor messages and boost campaign effectiveness.',
  },
  {
    icon: '/assets/brand.svg',
    title: 'Brand elements',
    description:
      'Brand elements focus on features like logos, colors, names, and slogans shape audience perception. They ensure these elements connect with the target market and support a strong, memorable brand identity.',
  },
  {
    icon: '/assets/insperational.svg',
    title: 'Insperational assets',
    description:
      'Inspiration assets are visual, verbal, or conceptual references that guide the creative direction. They can include mood boards, past campaigns, competitor ads, or imagery styles that spark ideas..',
  },
  {
    icon: '/assets/editor.svg',
    title: 'Advanced editor',
    description:
      "Edit like a pro with our advanced video editor—precision cutting, layered timelines, and real-time previews at your fingertips. From fine-tuning scenes to adding effects, it's everything you need to craft standout videos with ease.",
  },
]

const fezImages = ['/assets/images/fez1.jpg', '/assets/images/fez2.jpg', '/assets/images/fez3.jpg', '/assets/images/fez4.jpg']

export default function ScrollRevealImage() {
  const containerRef = useRef(null)
  const sliderRef = useRef(null)
  const [currentPair, setCurrentPair] = useState(0)
  const [scrollRatio, setScrollRatio] = useState(5)
  const isScrolling = useRef(false)
  const [isHovering, setIsHovering] = useState(false)
  const animationRef = useRef(null)
  const animationSpeed = 0.15 // Reduced speed for smoother animation
  const animationDirection = useRef(1) // 1 for right, -1 for left
  const isTransitioning = useRef(false)

  // Define non-overlapping image pairs for better sequence
  const imagePairs = [
    { first: fezImages[1], second: fezImages[0] }, // Pair 1: fez2-fez1
    { first: fezImages[2], second: fezImages[1] }, // Pair 2: fez3-fez2
    { first: fezImages[3], second: fezImages[2] }, // Pair 3: fez4-fez3
    { first: fezImages[0], second: fezImages[3] }, // Pair 4: fez1-fez4
  ]

  // Show all 4 images when cycling through pairs
  const pairOrder = [0, 1, 2, 3] // Follow this order for clean animation

  // Track current position in the sequence
  const [sequenceIndex, setSequenceIndex] = useState(0)

  // Handle automatic animation
  useEffect(() => {
    const animate = () => {
      if (!isHovering && !isTransitioning.current) {
        setScrollRatio((prev) => {
          const newRatio = prev + animationSpeed * animationDirection.current

          // Handle edge cases more reliably
          if (newRatio >= 95) {
            // Transition to next pair
            isTransitioning.current = true

            // Start transition after a small delay
            setTimeout(() => {
              // Use the pairOrder for sequence
              const nextIndex = (sequenceIndex + 1) % pairOrder.length
              setSequenceIndex(nextIndex)
              setCurrentPair(pairOrder[nextIndex])

              // Reset position for next animation
              setScrollRatio(5)

              // Allow animation to continue after transition completes
              setTimeout(() => {
                isTransitioning.current = false
                animationDirection.current = 1
              }, 300)
            }, 200)

            return 95 // Stay at edge during transition
          } else if (newRatio <= 5) {
            // At left edge, start moving right
            animationDirection.current = 1
            return 5
          }

          return newRatio
        })
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Start the animation
    animationRef.current = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isHovering, sequenceIndex, pairOrder.length])

  // Handle pair switching manually with proper sequence
  const switchPair = (direction) => {
    // Prevent rapid switching
    if (isTransitioning.current) return

    isTransitioning.current = true

    // Calculate next index in sequence
    const nextIndex = direction === 'next' ? (sequenceIndex + 1) % pairOrder.length : (sequenceIndex - 1 + pairOrder.length) % pairOrder.length

    // Animate slide out
    setScrollRatio(direction === 'next' ? 95 : 5)

    // Switch pair after brief delay
    setTimeout(() => {
      setSequenceIndex(nextIndex)
      setCurrentPair(pairOrder[nextIndex])
      setScrollRatio(direction === 'next' ? 5 : 95)

      // Re-enable transitions after animation completes
      setTimeout(() => {
        isTransitioning.current = false
      }, 300)
    }, 200)
  }

  // Wheel/scroll handling
  useEffect(() => {
    const container = containerRef.current
    const slider = sliderRef.current
    if (!container || !slider) return

    const handleWheel = (e) => {
      // Only process wheel events when hovering over the slider
      if (!isHovering) return

      e.preventDefault()

      if (isScrolling.current || isTransitioning.current) return
      isScrolling.current = true

      const isScrollingDown = e.deltaY > 0
      const scrollAmount = isScrollingDown ? 5 : -5

      setScrollRatio((prevRatio) => {
        const newRatio = Math.min(Math.max(prevRatio + scrollAmount, 0), 100)

        // No automatic pair switching when user is manually interacting
        // Just clamp the values at the edges
        if (newRatio >= 100) return 100
        if (newRatio <= 0) return 0

        return newRatio
      })

      setTimeout(() => {
        isScrolling.current = false
      }, 20)
    }

    const handleTouchStart = (e) => {
      if (!slider.contains(e.target)) return

      setIsHovering(true) // Pause animation on touch
      container.dataset.touchStartY = e.touches[0].clientY
      container.dataset.touchStartX = e.touches[0].clientX
    }

    const handleTouchMove = (e) => {
      if (!isHovering) return

      e.preventDefault()

      if (isTransitioning.current) return

      const touchY = e.touches[0].clientY
      const touchX = e.touches[0].clientX
      const startY = parseFloat(container.dataset.touchStartY || '0')
      const startX = parseFloat(container.dataset.touchStartX || '0')
      const deltaY = startY - touchY
      const deltaX = startX - touchX

      // Handle horizontal swipes for changing pairs (only when not manually adjusting slider)
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 30) {
        if (deltaX > 0) {
          switchPair('next')
        } else {
          switchPair('prev')
        }
        container.dataset.touchStartX = touchX
        container.dataset.touchStartY = touchY
        return
      }

      // Handle vertical swipes for slider adjustment
      if (Math.abs(deltaY) > 5) {
        const newRatio = Math.min(Math.max(scrollRatio + deltaY * 0.2, 0), 100)
        setScrollRatio(newRatio)
        container.dataset.touchStartY = touchY
      }
    }

    const handleTouchEnd = () => {
      // Resume animation after touch ends
      setTimeout(() => setIsHovering(false), 1000)
    }

    // Add wheel event listener to the document to catch all wheel events
    document.addEventListener('wheel', handleWheel, { passive: false })
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: false })
    container.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('wheel', handleWheel)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
    }
  }, [scrollRatio, currentPair, imagePairs.length, isHovering, switchPair])

  // Handle pair indicators - fix onClick to properly use sequence
  const handlePairSelect = (index) => {
    if (isTransitioning.current) return

    isTransitioning.current = true

    // Find the sequence index for this pair
    const targetIndex = pairOrder.indexOf(index)
    if (targetIndex !== -1) {
      setSequenceIndex(targetIndex)
      setCurrentPair(index)
    } else {
      setCurrentPair(index)
    }

    setScrollRatio(50)

    setTimeout(() => {
      isTransitioning.current = false
    }, 300)
  }

  return (
    <div className="relative h-full w-full px-10">
      <div className="flex flex-col items-center justify-center mb-10">
        <h2 className="text-[#D9D9D9] text-[48px] font-bold">Create your characters.</h2>
        <h2 className="heading-gradient">Keep them consistent.</h2>
      </div>

      <div ref={containerRef} className="h-[750px] w-full flex items-center justify-center bg-transparent">
        <div
          ref={sliderRef}
          className="relative w-[90%] max-w-[1200px] mx-auto rounded-[40px] overflow-hidden h-[750px]"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPair}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full w-full"
            >
              <ReactCompareSlider
                style={{
                  borderRadius: '40px',
                  overflow: 'hidden',
                  height: '100%',
                }}
                className="h-full w-full"
                itemOne={
                  <ReactCompareSliderImage
                    src={imagePairs[currentPair].first}
                    alt={`Character comparison ${currentPair + 1}`}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                }
                itemTwo={
                  <ReactCompareSliderImage
                    src={imagePairs[currentPair].second}
                    alt={`Character comparison ${currentPair + 1}`}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                }
                position={scrollRatio}
                onlyHandleDraggable={false}
                handle={<div className="w-[10px] h-full bg-[#191b1d]" />}
                onPositionChange={(position) => {
                  // When user manually changes position, update state
                  // but don't trigger transitions at the edges during manual interaction
                  if (isHovering && !isTransitioning.current) {
                    setScrollRatio(position)
                  }
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <motion.button
            className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-3 transition-all z-10"
            onClick={() => !isTransitioning.current && switchPair('prev')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-3 transition-all z-10"
            onClick={() => !isTransitioning.current && switchPair('next')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>

          {/* Pair indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
            {pairOrder.map((pairIndex, index) => (
              <motion.button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${sequenceIndex === index ? 'bg-white' : 'bg-gray-500/50'}`}
                onClick={() => handlePairSelect(pairIndex)}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.9 }}
                animate={sequenceIndex === index ? { scale: 1.2 } : { scale: 1 }}
              />
            ))}
          </div>

          {/* Hover instruction */}
          <motion.div
            className={`absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full z-10`}
            animate={{ opacity: isHovering ? 0 : 0.7 }}
            transition={{ duration: 0.3 }}
          >
            Hover to interact
          </motion.div>
        </div>
      </div>

      <p className="text-[#D0D4D9] text-[24px] text-center mt-10 max-w-[700px] mx-auto">
        Your characters, scene after scene, exactly how you imagined them. With Character Consistency, every frame stays on-script—no surprise
        wardrobe changes or mystery makeovers. Just a seamless visual story, worthy of the big screen.
      </p>

      <div className="grid grid-cols-4 px-10 gap-8 mt-10">
        {cardData.map((item, index) => (
          <div key={index} className="bg-[#23282E] space-y-7 rounded-xl p-[24px]">
            <Image src={item.icon} alt={item.title} width={28} className="mb-20" height={28} />
            <h2 className="text-[24px] font-bold text-white mb-4">{item.title}</h2>
            <p className="text-[16px] text-white font-semibold">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
