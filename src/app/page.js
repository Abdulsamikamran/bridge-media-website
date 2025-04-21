'use client'

import Hero from '@/components/Hero'
import Navbar from '../components/Navbar'
import Image from 'next/image'
import ScrollCarosel from '@/components/ScrollCarosel'
import Counter from '@/components/Counter'
import Platforms from '@/components/Platforms'
import CreateCharacter from '@/components/CreateCharacter'
import CustomerStories from '@/components/CustomerStories'
import Pricing from '@/components/Pricing'
import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'

export default function Home() {
  const fullImageRef = useRef(null)
  const fullImageWrapperRef = useRef(null)
  const bookContainerRef = useRef(null)
  const bookSectionRef = useRef(null)
  const imageContainerRef = useRef(null)
  const gsapLoaded = useRef(false)

  useEffect(() => {
    // This will run after GSAP and ScrollTrigger are loaded
    const initAnimation = () => {
      if (
        !gsapLoaded.current ||
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

      // Clean up previous instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      gsap.killTweensOf(fullImageRef.current)
      gsap.killTweensOf(fullImageWrapperRef.current)
      gsap.killTweensOf(bookContainerRef.current)

      // Get the positions and dimensions needed for the animation
      const fullImageRect = fullImageRef.current.getBoundingClientRect()
      const targetRect = imageContainerRef.current.getBoundingClientRect()
      const bookRect = bookSectionRef.current.getBoundingClientRect()

      // Calculate the scale factor between full image and target container
      const scaleX = targetRect.width / fullImageRect.width
      const scaleY = targetRect.height / fullImageRect.height

      // Calculate the position to move to (from center of viewport to target position)
      const moveX = targetRect.left + targetRect.width / 2 - (fullImageRect.left + fullImageRect.width / 2)
      const moveY = targetRect.top + targetRect.height / 2 - (fullImageRect.top + fullImageRect.height / 2) + window.scrollY

      console.log('Animation values', { scaleX, scaleY, moveX, moveY })

      // Timeline for the image zoom effect
      const zoomTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: fullImageWrapperRef.current,
          start: 'top top',
          end: '+=100%', // One viewport height of scrolling - much shorter
          pin: true,
          pinSpacing: true,
          scrub: 0.3, // More responsive scrolling
          anticipatePin: 1,
          markers: false,
          onUpdate: (self) => {
            // Debug progress
            console.log(`Zoom progress: ${self.progress.toFixed(2)}`)

            // When we're past the halfway point, ensure the Creative Upscaler section is visible
            if (self.progress > 0.5) {
              gsap.to(bookSectionRef.current, {
                autoAlpha: 1,
                duration: 0.2,
              })
            }
          },
        },
      })

      // Create the zoom-out effect
      zoomTimeline
        // First scale down the full image wrapper
        .to(fullImageWrapperRef.current, {
          scale: Math.min(scaleX, scaleY), // Use the smaller scale to ensure it fits
          x: moveX,
          y: moveY,
          ease: 'power1.out', // Slightly smoother than linear
          transformOrigin: 'center center',
        })
        // Add a border radius as it shrinks to match the target
        .to(
          fullImageRef.current,
          {
            borderRadius: '8px',
            boxShadow: '0 0 30px rgba(0, 0, 0, 0.5)',
            ease: 'power1.out', // Slightly smoother than linear
          },
          '<'
        ) // Start at the same time as the previous animation
        // Show the Creative Upscaler container as we approach
        .fromTo(
          bookContainerRef.current,
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, ease: 'power1.out' }, // Slightly smoother than linear
          '<+=0.5' // Start a bit later in the timeline
        )

      // Hide the actual image in the Creative Upscaler until animation is near completion
      gsap.set(imageContainerRef.current.querySelector('img'), {
        autoAlpha: 0,
      })

      // Make the image appear in the container when animation nears completion
      zoomTimeline.add(() => {
        // Only show target image when we're close to the end of the animation
        ScrollTrigger.create({
          trigger: bookSectionRef.current,
          start: 'top center',
          onEnter: () => {
            gsap.to(imageContainerRef.current.querySelector('img'), {
              autoAlpha: 1,
              duration: 0.3,
            })
          },
          onLeaveBack: () => {
            gsap.to(imageContainerRef.current.querySelector('img'), {
              autoAlpha: 0,
              duration: 0.3,
            })
          },
        })
      })

      // Position the Creative Upscaler section closer to the animation
      gsap.set(bookSectionRef.current, {
        autoAlpha: 0, // Hide initially
        marginTop: '-50vh', // Pull it up to reduce gap
      })

      console.log('Zoom animation initialized')
    }

    // Check if GSAP is already loaded
    if (window.gsap && window.ScrollTrigger) {
      gsapLoaded.current = true
      setTimeout(initAnimation, 500) // Give a small delay to ensure DOM is ready
    }

    // Attempt to initialize animation on window load
    window.addEventListener('load', () => {
      if (window.gsap && window.ScrollTrigger) {
        gsapLoaded.current = true
        initAnimation()
      }
    })

    return () => {
      // Clean up on component unmount
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
      window.removeEventListener('load', initAnimation)
    }
  }, [])

  // Handle GSAP script load
  const onGSAPLoaded = () => {
    console.log('GSAP scripts loaded')
    gsapLoaded.current = true
    // Try to initialize animation after scripts load
    setTimeout(() => {
      if (window.gsap && window.ScrollTrigger) {
        const initAnimationFn = window.initAnimation || initAnimation
        initAnimationFn()
      }
    }, 500)
  }

  return (
    <main className="min-h-screen">
      {/* Load GSAP and ScrollTrigger */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.3/gsap.min.js"
        strategy="beforeInteractive"
        onLoad={() => console.log('GSAP core loaded')}
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.3/ScrollTrigger.min.js"
        strategy="beforeInteractive"
        onLoad={() => console.log('ScrollTrigger loaded')}
      />
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.3/ScrollToPlugin.min.js" strategy="beforeInteractive" onLoad={onGSAPLoaded} />

      <Navbar />

      <section id="home" className="h-screen flex items-center justify-center">
        <Hero />
      </section>
      <div className="flex flex-col items-center justify-center text-center py-20">
        <p className="heading-gradient">You are the Auteur</p>
        <p className="sub-text w-2xl">Empower yourself to create interactive marketing, sales, and ad content through AI.​</p>
      </div>

      <section id="inspiration" className="my-20 px-4">
        <div className="flex flex-col justify-center items-center text-center gap-10">
          <h4 className="font-semibold text-[20px] tracking-[6px] text-white">INTRODUCTION</h4>
          <Image src={'/assets/logo-2.svg'} width={600} height={600} alt="logo" />
          <p className="sub-text w-2xl">
            Transform your vision into reality. Create ads that convert ideas into leads. A unified creative platform… simple, robust, fast.
          </p>
        </div>
        <ScrollCarosel />
      </section>

      {/* Full-screen image section with scaling effect on scroll */}
      <section
        ref={fullImageWrapperRef}
        className="h-screen w-full flex items-center justify-center overflow-hidden fixed-position"
        style={{
          zIndex: 40,
          transformOrigin: 'center center',
          willChange: 'transform',
          position: 'relative', // Changed from fixed to allow proper scrolling
        }}
      >
        <div ref={fullImageRef} className="w-full h-full relative overflow-hidden" style={{ willChange: 'border-radius, box-shadow' }}>
          <Image src={'/assets/images/2k.jpg'} layout="fill" objectFit="cover" alt="full-width banner" className="w-full h-full" priority />
          <div className="absolute bottom-10 left-0 right-0 text-center text-white">
            <p className="text-lg">Scroll to zoom out</p>
            <div className="mt-2 animate-bounce">↓</div>
          </div>
        </div>
      </section>

      {/* Spacer to trigger scrolling */}
      <div className="h-[100vh] w-full">{/* Just enough height for the animation */}</div>

      {/* Creative Upscaler section */}
      <section
        ref={bookSectionRef}
        className="py-20 flex flex-col items-center justify-center overflow-visible"
        style={{
          minHeight: '100vh',
          visibility: 'visible',
          opacity: 1,
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <div
            ref={bookContainerRef}
            className="relative mb-16 transform-gpu will-change-transform opacity-0"
            style={{
              transformStyle: 'preserve-3d',
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

      <section id="pricing" className="h-full border-t border-b border-[#979797]">
        <div className="flex w-full">
          <div className="relative px-32 border-r border-[#979797] flex-[0.5] w-full py-32">
            <Image src={'/assets/images/graps-1.png'} width={500} height={500} alt="graph" />
            <Image className="absolute z-20 right-40 top-[400px]" src={'/assets/images/graph-2.png'} width={500} height={500} alt="graph2" />
          </div>
          <div className="flex-[0.5] text-center mx-32 py-10">
            <h3 className="heading-gradient">Smarter ads, better results! Automated targeting that delivers ROI.</h3>
            <p className="text-[18px] text-[#D0D4D9] mb-6">
              BridgeStudio helps you create ad campaigns more cost effectively, on-target, and efficiently.
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
              <p className="text-[18px] text-[#D0D4D9]">Faster time to market</p>
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

      <section id="platform" className="py-20 border-b border-[#979797] flex items-center justify-center ">
        <Platforms />
      </section>
      <section id="create-character" className="py-20 flex items-center justify-center ">
        <CreateCharacter />
      </section>
      <section id="customer stories" className="py-10 flex items-center justify-center ">
        <CustomerStories />
      </section>
      <section id="pricing" className="py-10 flex items-center justify-center ">
        <Pricing />
      </section>
    </main>
  )
}
