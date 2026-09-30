import React from 'react'
import { assets, features } from '../assets/assets'

const BottomBanner = () => {
  return (
    <div className="relative mt-16 md:mt-24 w-full overflow-hidden">

      <img
        src={assets.bottom_banner_image}
        alt="banner"
        className="hidden md:block w-full"
      />

      <img
        src={assets.bottom_banner_image_sm}
        alt="banner"
        className="block md:hidden w-full"
      />

      <div className="absolute inset-0">

        <div className="hidden md:block absolute right-8 lg:right-20 xl:right-28 top-1/2 -translate-y-1/2 w-[40%]">

          <h1 className="text-2xl lg:text-3xl font-semibold text-primary mb-6">
            Why we are the Best?
          </h1>

          <div className="space-y-4">

            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-4"
              >

                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-10 lg:w-11 shrink-0"
                />

                <div>
                  <h3 className="text-lg lg:text-xl font-semibold">
                    {feature.title}
                  </h3>

                  <p className="text-xs lg:text-sm text-gray-500/70">
                    {feature.description}
                  </p>
                </div>

              </div>
            ))}

          </div>

        </div>


        <div className="md:hidden absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%]">

          <h1 className="text-[20px] leading-6 font-semibold text-primary mb-4 text-center">
            Why we are the Best?
          </h1>

          <div className="space-y-3">

            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-2"
              >

                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-7 h-7 shrink-0"
                />

                <div className="min-w-0">

                  <h3 className="text-[12px] leading-4 font-semibold text-gray-800">
                    {feature.title}
                  </h3>

                  <p className="text-[8px] leading-3 text-gray-500/70 mt-0.5">
                    {feature.description}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  )
}

export default BottomBanner