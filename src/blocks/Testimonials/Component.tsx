import React from 'react'
import Image from 'next/image'

type Testimonial = {
  name: string
  avatar?: any
  content: string
  rating: number
}

type TestimonialsBlockProps = {
  title: string
  testimonials: Testimonial[]
}

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = ({
  title,
  testimonials,
}) => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            {title}
          </h2>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {testimonial.content}
              </p>

              {/* Author */}
              <div className="flex items-center">
                {testimonial.avatar && (
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.avatar.url}
                      alt={testimonial.avatar.alt || testimonial.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-gray-800">
                    {testimonial.name}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
