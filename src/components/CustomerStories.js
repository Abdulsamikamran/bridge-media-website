import Image from 'next/image'
import React from 'react'

const CustomerStories = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h2 className="heading-gradient mb-10">Customer Stories</h2>
      <div className="flex items-start gap-5 h-[800px]">
        <div className="mt-20 ">
          <div className="w-full max-w-[400px] relative">
            <Image className="rounded-2xl" src="/assets/images/card-img1.png" width={400} height={400} alt="card2" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t  from-[#FF4144F2]/95 to-[#FF4144F2]/50" />
            <div className="absolute inset-0 flex  flex-col items-start justify-between p-5">
              <Image src={'/assets/customer-logo-1.svg'} alt="logo" width={200} height={100} />
              <div>
                <p className="text-[24px] font-semibold text-start text-white">
                  “Since we started using BridgeStudio, our campaign performance has skyrocketed. Tasks that used to take days or hours now happen in
                  minutes.”
                </p>
                <p className="text-white  text-sm text-start mt-4">
                  {' '}
                  <strong>– Jordan Mitchell,</strong>
                   Marketing Manager. AISERA
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="w-full max-w-[400px] relative">
            <Image className="rounded-2xl" src="/assets/images/card-img2.png" width={400} height={400} alt="card2" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t  from-[#00756FF2]/95 to-[#009E9680]/50" />
            <div className="absolute inset-0 flex  flex-col items-start justify-between p-5">
              <Image src={'/assets/customer-logo-2.svg'} alt="logo" width={200} height={100} />
              <div>
                <p className="text-[24px] font-semibold text-start text-white">
                  “AI imagery tools let us create stunning visuals in seconds. It’s boosted our creativity and cut production time dramatically.”
                </p>
                <p className="text-white  text-sm text-start mt-4">
                  {' '}
                  <strong>– Nelse Clark, </strong>
                  Partner, Meno Systems
                </p>
              </div>
            </div>
          </div>
        </div>{' '}
        <div className="mt-40 ">
          <div className="w-full max-w-[400px] relative">
            <Image className="rounded-2xl" src="/assets/images/card-img3.png" width={400} height={400} alt="card2" />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-t  from-[#CC0000F2]/95 to-[#CC000059]/35" />
            <div className="absolute inset-0 flex  flex-col items-start justify-between p-5">
              <Image src={'/assets/customer-logo3.svg'} alt="logo" width={150} height={100} />
              <div>
                <p className="text-[24px] font-semibold text-start text-white">
                  “Since we started using BridgeStudio, our campaign performance has skyrocketed. Tasks that used to take days or hours now happen in
                  minutes.”
                </p>
                <p className="text-white  text-sm text-start mt-4">
                  {' '}
                  <strong>– Jordan Mitchell,</strong>
                   Marketing Manager. AISERA
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomerStories
