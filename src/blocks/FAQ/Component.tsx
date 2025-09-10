'use client'
import React, { useState } from 'react'
import RichText from '@/components/RichText'

type FAQItem = {
  question: string
  answer: any // RichText content
}

type FAQBlockProps = {
  title: string
  questions: FAQItem[]
}

export const FAQBlock: React.FC<FAQBlockProps> = ({ title, questions }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0) // First item open by default

  return (
    <div className="py-20 bg-white">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            {title}
          </h2>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto">
          {questions.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-200 last:border-b-0"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-800 pr-4">
                  {item.question}
                </h3>
                <div className="flex-shrink-0">
                  <svg
                    className={`w-6 h-6 text-gray-500 transition-transform ${openIndex === index ? 'rotate-180' : ''
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {openIndex === index && (
                <div className="pb-6">
                  <div className="text-gray-600 leading-relaxed">
                    <RichText data={item.answer} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
