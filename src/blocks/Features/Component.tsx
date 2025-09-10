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
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  orange: 'bg-orange-500',
  pink: 'bg-pink-500',
  purple: 'bg-purple-500',
}

export const FeaturesBlock: React.FC<FeaturesBlockProps> = ({
  title,
  subtitle,
  description,
  features,
  screenshot,
}) => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          {subtitle && (
            <p className="text-lg text-gray-600 mb-4">{subtitle}</p>
          )}
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            {title}
          </h2>
          {description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Features List */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`${colorClasses[feature.color]} rounded-xl p-6 text-white`}
              >
                <div className="flex items-start gap-4">
                  {feature.icon && (
                    <div className="flex-shrink-0">
                      <Image
                        src={feature.icon.url}
                        alt={feature.icon.alt || 'Feature icon'}
                        width={40}
                        height={40}
                        className="w-10 h-10"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-100">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Screenshot */}
          {screenshot && (
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <Image
                  src={screenshot.url}
                  alt={screenshot.alt || 'Platform screenshot'}
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
