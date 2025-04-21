'use client'
import React, { useState } from 'react'

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('')
  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      description: "For individuals looking to explore BrightBrush's features.",
      features: [
        'Credits reset to 200 monthly, unused credits do not roll over',
        'Buy more credits as needed',
        "Can't remove watermarks or upscale to 4k",
        'Video up to 5 sec',
        '10 videos/ads or 20 images',
        '5GB assets',
      ],
      buttonText: 'Select plan',
      maxUsers: 1,
    },
    {
      id: 'basic',
      name: 'Basic',
      price: '$10',
      description: 'For individuals and small teams. Max. 5 users per subscription.',
      features: [
        'Includes all Free Plan features, plus:',
        'Credits reset to 625 monthly, unused credits do not roll over',
        'Generate without watermarks',
        'Video up to 10 sec',
        '20 videos/ads or 1000 images',
        'Upscale outputs to 4k',
        'Editing capability',
        '100GB assets',
      ],
      buttonText: 'Select plan',
      popular: true,
      maxUsers: 5,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$49',
      description: 'For individuals and larger teams looking. Max. 15 users per workspace.',
      features: [
        'Includes all Basic Plan features, plus:',
        'Credits reset to 2250 monthly, unused credits do not roll over',
        'Video up to 2 minutes',
        '50 videos/ads or 5000 images',
        'Create custom voices for 10 Sync and Text-to-Speech',
        '500GB assets',
      ],
      buttonText: 'Select plan',
      maxUsers: 15,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Contact us',
      description: 'For large teams and organizations that need a custom, secure, and robust flexibility at scale.',
      features: [
        'Includes all Pro Plan features, plus:',
        'Access to Frames',
        'Single sign-on',
        'Custom credit amounts',
        'Custom storage',
        'Configurable team spaces to segment and organize assets',
        'Advanced security and compliance',
        'Enterprise-wide onboarding',
        'Ongoing success program',
        'Priority support',
        'Integration with internal tools',
        'Workspace Analytics',
      ],
      buttonText: 'Schedule a demo',
      isEnterprise: true,
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="heading-gradient text-center ">Simple, transparent pricing</h3>
      <p className="sub-text">Choose the one that works best for you</p>
      <div className="flex flex-col items-center mt-5 gap-2 text-white">
        <div className="flex items-center  gap-2">
          <span className={`text-[18px] text-white`}>Monthly</span>

          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`w-14 h-7 flex items-center rounded-full px-1 transition-colors duration-300 ${isAnnual ? 'bg-gray-600' : 'bg-gray-400'}`}
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                isAnnual ? 'translate-x-7' : 'translate-x-0'
              }`}
            />
          </button>

          <span className={`text-[18px] text-white`}>Annually</span>
        </div>

        <p className="text-[18px] mt-2 text-[#979797]">
          Switch to Annually to save <span className="font-bold text-white">20%</span>.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 p-6 max-w-[1440px] mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`flex flex-col relative rounded-lg p-6 shadow-lg flex-1 transition-all duration-200 ${
              selectedPlan === plan.id ? 'bg-sky-100 border-2 border-[#6CCAFF]  text-[#363636]' : 'bg-[#23282E] text-white'
            }`}
          >
            {plan.popular && (
              <div className="bg-[#6CCAFF] absolute top-4 right-4 text-white text-xs font-medium px-3 py-i rounded-full  ">Popular</div>
            )}
            <h3 className="text-[36px] ">{plan.name}</h3>
            <p className="text-sm mt-1 mb-4  ">{plan.description}</p>
            <div className="flex items-baseline mb-6">
              <span className={`${!plan.isEnterprise ? 'text-[48px] mt-2' : 'text-[40px]'} font-semibold`}>{plan.price}</span>
              {!plan.isEnterprise && <span className="ml-1 text-sm opacity-70">/ monthly</span>}
            </div>
            <p className="text-[18px] opacity-70 mb-2">Billed monthly</p>

            <button
              onClick={() => setSelectedPlan(plan.id)}
              className={`py-2 px-4 rounded-md font-medium mb-6 transition-colors cursor-pointer ${
                selectedPlan === plan.id ? 'bg-[#649EF5] text-white hover:bg-sky-700' : 'bg-white text-gray-900 hover:bg-gray-100'
              }`}
            >
              {plan.buttonText}
            </button>

            <ul className="space-y-3 ">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <div className={`min-w-2 min-h-2 mt-2 rounded-full ${selectedPlan !== plan.id ? 'bg-white' : 'bg-[#363636]'}`} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Pricing
