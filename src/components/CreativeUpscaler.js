'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Script from 'next/script'

export default function CreativeUpscaler() {
  const fullImageRef = useRef(null)
  const fullImageWrapperRef = useRef(null)
  const bookContainerRef = useRef(null)
  const bookSectionRef = useRef(null)
  const imageContainerRef = useRef(null)
  const gsapLoaded = useRef(false)
  const scriptsLoaded = useRef(0)
  const animationInitialized = useRef(false)
  const [isClient, setIsClient] = useState(false)

  // Wait until component is mounted
  useEffect(() => {
    setIsClient(true)
  }, [])

  const initAnimation = () => {
    // Don't initialize animation twice
    if (animationInitialized.current) return

    if (
      !fullImageRef.current ||
      !fullImageWrapperRef.current ||
      !bookContainerRef.current ||
      !bookSectionRef.current ||
      !imageContainerRef.current ||
      typeof window === 'undefined' ||
      !window.gsap ||
      !window.ScrollTrigger
    ) {
      return
    }

    const { gsap, ScrollTrigger } = window

    // Mark animation as initialized
    animationInitialized.current = true

    // Safely clean up previous instances
    try {
      // Get all ScrollTrigger instances and kill them safely
      const triggers = ScrollTrigger.getAll()
      triggers.forEach((trigger) => {
        try {
          trigger.kill(false) // false means don't remove elements or classes
        } catch (e) {
          console.error('Error killing ScrollTrigger:', e)
        }
      })

      // Kill any tweens safely
      if (fullImageRef.current) gsap.killTweensOf(fullImageRef.current, false)
      if (fullImageWrapperRef.current) gsap.killTweensOf(fullImageWrapperRef.current, false)
      if (bookContainerRef.current) gsap.killTweensOf(bookContainerRef.current, false)
    } catch (e) {
      console.error('Error in cleanup:', e)
    }

    try {
      // Get the positions and dimensions needed for the animation
      const fullImageRect = fullImageRef.current.getBoundingClientRect()
      const targetRect = imageContainerRef.current.getBoundingClientRect()

      // Calculate the scale factor between full image and target container
      const scaleX = targetRect.width / fullImageRect.width
      const scaleY = targetRect.height / fullImageRect.height
      const scale = Math.min(scaleX, scaleY)

      // Calculate the position to move to
      const moveX = targetRect.left + targetRect.width / 2 - (fullImageRect.left + fullImageRect.width / 2)
      const moveY = targetRect.top + targetRect.height / 2 - (fullImageRect.top + fullImageRect.height / 2) + window.scrollY

      // Hide the actual image in the Creative Upscaler initially
      const targetImage = imageContainerRef.current.querySelector('img')
      if (targetImage) {
        gsap.set(targetImage, {
          autoAlpha: 0,
        })
      }

      // Initially hide the Creative Upscaler UI elements except the image container
      gsap.set(bookContainerRef.current, {
        autoAlpha: 0,
      })

      // Timeline for the image zoom effect
      const zoomTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: fullImageWrapperRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          pinSpacing: true,
          scrub: 1.5,
          anticipatePin: 1,
          markers: false,
          onLeave: () => {
            // Ensure proper cleanup
            gsap.set(fullImageWrapperRef.current, { clearProps: 'all' })
            gsap.set(bookSectionRef.current, { clearProps: 'all' })
          },
        },
      })

      // Position the Creative Upscaler section to overlap with animation area
      // This is crucial for the effect
      gsap.set(bookSectionRef.current, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100vh',
        autoAlpha: 0,
        zIndex: 45,
      })

      // Create the animation sequence that mimics Apple's effect
      zoomTimeline
        // First scale down the full image
        .to(
          fullImageWrapperRef.current,
          {
            scale: scale,
            x: moveX,
            y: moveY,
            borderRadius: '8px',
            ease: 'power1.inOut',
            duration: 2,
          },
          0.2
        )
        // Fade in the Creative Upscaler UI frame around the image
        .to(
          bookSectionRef.current,
          {
            autoAlpha: 1,
            ease: 'power1.inOut',
            duration: 1.5,
          },
          '>-1.2'
        )
        // Show the UI elements
        .to(
          bookContainerRef.current,
          {
            autoAlpha: 1,
            ease: 'power1.inOut',
            duration: 1,
          },
          '>-0.8'
        )
        // Switch to the target image
        .to(
          targetImage,
          {
            autoAlpha: 1,
            duration: 0.8,
          },
          '>-0.5'
        )
        // Fade out the original image after it's replaced
        .to(
          fullImageRef.current,
          {
            autoAlpha: 0,
            duration: 0.8,
          },
          '>'
        )
    } catch (e) {
      console.error('Error setting up animation:', e)
      // Reset animation flag on error so we can try again
      animationInitialized.current = false
    }
  }

  const handleScriptLoad = () => {
    scriptsLoaded.current += 1

    // When all 3 scripts are loaded
    if (scriptsLoaded.current >= 3) {
      gsapLoaded.current = true
      // Allow time for DOM to be ready
      setTimeout(initAnimation, 800)
    }
  }

  useEffect(() => {
    if (!isClient) return

    // Check if GSAP is already available from the main page
    if (window.gsap && window.ScrollTrigger && window.ScrollToPlugin) {
      gsapLoaded.current = true
      setTimeout(initAnimation, 800)
    }

    // Try again on window load (in case scripts load later)
    const handleWindowLoad = () => {
      if (window.gsap && window.ScrollTrigger) {
        gsapLoaded.current = true
        initAnimation()
      }
    }

    window.addEventListener('load', handleWindowLoad)

    return () => {
      // Clean up on component unmount
      if (typeof window !== 'undefined' && window.ScrollTrigger) {
        try {
          // Kill all ScrollTrigger instances
          ScrollTrigger.getAll().forEach((trigger) => {
            trigger.kill(false)
          })

          // Kill specific tweens
          if (window.gsap) {
            const { gsap } = window
            if (fullImageRef.current) gsap.killTweensOf(fullImageRef.current, false)
            if (fullImageWrapperRef.current) gsap.killTweensOf(fullImageWrapperRef.current, false)
            if (bookContainerRef.current) gsap.killTweensOf(bookContainerRef.current, false)

            // Clear any properties that might be causing issues
            if (fullImageWrapperRef.current) gsap.set(fullImageWrapperRef.current, { clearProps: 'all' })
            if (bookSectionRef.current) gsap.set(bookSectionRef.current, { clearProps: 'all' })
          }
        } catch (e) {
          console.error('Error during cleanup:', e)
        }
      }

      window.removeEventListener('load', handleWindowLoad)
    }
  }, [isClient])

  if (!isClient) {
    return null // Return nothing during SSR
  }

  return (
    <>
      {/* Load GSAP and ScrollTrigger if not already loaded */}
      {!gsapLoaded.current && (
        <>
          <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.3/gsap.min.js" strategy="afterInteractive" onLoad={handleScriptLoad} />
          <Script
            src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.3/ScrollTrigger.min.js"
            strategy="afterInteractive"
            onLoad={handleScriptLoad}
          />
          <Script
            src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.3/ScrollToPlugin.min.js"
            strategy="afterInteractive"
            onLoad={handleScriptLoad}
          />
        </>
      )}

      {/* Full-screen image section with scaling effect on scroll */}
      <section
        ref={fullImageWrapperRef}
        className="h-screen w-full flex items-center justify-center overflow-hidden"
        style={{
          zIndex: 50,
          transformOrigin: 'center center',
          willChange: 'transform',
          position: 'relative',
        }}
      >
        <div ref={fullImageRef} className="w-full h-full relative overflow-hidden" style={{ willChange: 'transform' }}>
          <Image src={'/assets/images/2k.jpg'} fill alt="full-width banner" className="w-full h-full object-cover" priority />
          <div className="absolute bottom-10 left-0 right-0 text-center text-white">
            <p className="text-lg">Scroll to zoom out</p>
            <div className="mt-2 animate-bounce">↓</div>
          </div>
        </div>
      </section>

      {/* Spacer to allow scrolling for animation */}
      <div className="h-[200vh] w-full"></div>

      {/* Creative Upscaler section - positioned absolutely during animation */}
      <section
        ref={bookSectionRef}
        className="py-20 flex flex-col items-center justify-center"
        style={{
          minHeight: '100vh',
          opacity: 0,
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <div
            ref={bookContainerRef}
            className="relative mb-16 transform-gpu will-change-transform"
            style={{
              transformStyle: 'preserve-3d',
              opacity: 0,
            }}
          >
            <div className="w-[861px] h-[589px] relative">
              <div className="w-[861px] h-[589px] left-0 top-0 absolute bg-[radial-gradient(ellipse_115.94%_116.96%_at_9.81%_9.24%,_rgba(53.59,_53.59,_53.59,_0.40)_0%,_rgba(25.96,_25.96,_25.96,_0.11)_100%)] rounded-3xl shadow-[0px_0px_24px_0px_rgba(0,0,0,1.00)] border-[1.50px] border-white backdrop-blur-[1.50px]"></div>
              <div className="w-[513px] h-36 left-[175px] top-[313px] absolute bg-neutral-700 rounded-lg"></div>
              <div className="w-[513px] h-24 left-[175px] top-[465px] absolute bg-neutral-700 rounded-lg"></div>
              <div className="w-36 h-[548px] left-[17px] top-[18px] absolute bg-neutral-700 rounded-lg"></div>
              <div className="w-36 h-[548px] left-[702px] top-[18px] absolute bg-neutral-700 rounded-lg"></div>
              <div
                ref={imageContainerRef}
                data-property-1="Landscape 16:9"
                data-property-2="4"
                className="w-[513.16px] h-72 left-[175px] top-[18px] absolute overflow-hidden rounded-lg"
              >
                <Image
                  className="w-[513.16px] h-72 left-0 top-0 absolute rounded-lg object-cover"
                  src={'/assets/images/2k.jpg'}
                  width={513}
                  height={288}
                  alt="fantasy book"
                  priority
                />
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
                <div key={index} className={`w-2 h-2 rounded-full ${index === 3 ? 'bg-[#6CCAFF]' : 'bg-gray-500'}`}></div>
              ))}
            </div>
          </div>

          <h2 className="text-white text-3xl font-bold mb-4">Creative Upscaler</h2>
          <p className="text-[#D0D4D9] text-center max-w-3xl">
            BridgeStudio elevates your images or videos from blurry to breathtaking, creating stunning, crisp, high-def works of art in seconds. Fast,
            effortless, and sharp.
          </p>
        </div>
      </section>
    </>
  )
}
