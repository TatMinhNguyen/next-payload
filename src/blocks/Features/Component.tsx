import React from 'react'
import Image from 'next/image'

type Feature = {
  title: string
  description: string
  icon?: any
  color: 'blue' | 'green' | 'orange' | 'pink' | 'purple'
}

type FeaturesBlockProps = {
  title: string
  subtitle?: string
  description?: string
  features: Feature[]
  screenshot?: any
}

const colorClasses = {
  blue: 'bg-[#006AFF]',
  green: 'bg-[#00BBA5]',
  orange: 'bg-[#FFA200]',
  pink: 'bg-[#F800DB]',
  purple: 'bg-[#6C4AFF]',
}

export const FeaturesBlock: React.FC<FeaturesBlockProps> = ({
  title,
  subtitle,
  description,
  features,
  screenshot,
}) => {
  return (
    <div className="flex flex-col items-center gap-14 w-full mt-14">
      {/* Header */}
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="relative w-full flex items-center justify-center">
          <div className="text-[150px] leading-[150px] text-[#f6f7fc] font-[900] select-none">
            {subtitle}
          </div>
          <h3 className="absolute top-[33%] text-[40px] leading-[60px] text-center font-bold">
            {title}
          </h3>
        </div>
        {description &&
          <div className="text-center max-w-[1024px]">
            {description}
          </div>
        }
      </div>

      <div className="flex items-start justify-between h-[488px]">
        {/* Features List */}
        <div className={`flex flex-col gap-4 w-[376px] ml-[4%] ${!!features?.[0].title ? "" : "mt-[4%]"}`}>
          {features?.map((feature, index) => (
            <div
              key={index}
              className={`${colorClasses[feature.color]} flex gap-4 p-4 rounded-t-[32px] rounded-bl-[32px] items-center justify-start text-white`}
            >
              {feature.icon && (
                <Image
                  src={feature.icon.url}
                  alt={feature.icon.alt || 'Feature icon'}
                  width={feature.icon.width}
                  height={feature.icon.height}
                // className="w-10 h-10"
                />
              )}
              {!!feature.title ? (
                <span className="font-bold">
                  {feature.title} - <span className="font-medium">{feature.description}</span>
                </span>
              ) : (
                <span className="font-medium">{feature.description}</span>
              )}
            </div>
          ))}
        </div>

        {/* Screenshot */}
        {screenshot && (
          <Image
            src={screenshot.url}
            width={screenshot.width}
            height={screenshot.height}
            alt="overview"
            priority
            className="-mt-[3%] -mr-[4%]"
          />
        )}
      </div>
    </div>
  )
}
