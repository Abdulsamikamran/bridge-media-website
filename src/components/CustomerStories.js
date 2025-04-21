import Image from 'next/image'
import React from 'react'

const CustomerStories = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h2 className="heading-gradient mb-10">Customer Stories</h2>
      <div className="flex items-start gap-5 h-[800px]">
        <Image className="mt-20" src="/assets/images/Alleima - small.png" width={400} height={400} alt="card1" />
        <Image className="mt-0" src="/assets/images/Alaska - small.png" width={400} height={400} alt="card2" />
        <Image className="mt-40" src="/assets/images/Alaska - small (1).png" width={400} height={400} alt="card3" />
      </div>
    </div>
  )
}

export default CustomerStories
