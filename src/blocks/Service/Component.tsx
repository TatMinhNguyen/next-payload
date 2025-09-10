'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { CMSLink } from '@/components/Link'

type Tab = {
  label: string
  value: string
  features: Array<{
    title: string
    description: string
    icon?: any
  }>
  ctaButton: {
    text: string
    url: string
  }
  screenshot?: any
}

type ServiceBlockProps = {
  title: string
  tabs: Tab[]
  activeTab?: string
}

export const ServiceBlock: React.FC<ServiceBlockProps> = ({
  title,
  tabs,
  activeTab = 'writing',
}) => {
  const [currentTab, setCurrentTab] = useState(activeTab)

  const activeTabData = tabs.find(tab => tab.value === currentTab) || tabs[0]

  return (
    <div className="py-20 bg-gradient-to-br from-[#3A18CE] to-[#09196b] text-white">
      <div className="container">
        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/10 rounded-lg p-1 flex">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setCurrentTab(tab.value)}
                className={`px-6 py-3 rounded-md transition-colors ${currentTab === tab.value
                    ? 'bg-white text-[#3A18CE] font-semibold'
                    : 'text-white hover:bg-white/10'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8">
              {title}
            </h2>

            <div className="space-y-6 mb-8">
              {activeTabData.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  {feature.icon && (
                    <div className="flex-shrink-0">
                      <Image
                        src={feature.icon.url}
                        alt={feature.icon.alt || 'Feature icon'}
                        width={24}
                        height={24}
                        className="w-6 h-6 mt-1"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-200">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {activeTabData.ctaButton && (
              <CMSLink
                url={activeTabData.ctaButton.url}
                className="inline-block bg-white text-[#3A18CE] font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {activeTabData.ctaButton.text}
              </CMSLink>
            )}
          </div>

          {/* Screenshot */}
          {activeTabData.screenshot && (
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-2xl">
                <Image
                  src={activeTabData.screenshot.url}
                  alt={activeTabData.screenshot.alt || 'Service screenshot'}
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
