import React from 'react'
import Image from 'next/image'

type Testimonial = {
  id: string
  name: string
  avatar?: any
  content: string
  occupation: string
}

type TestimonialsBlockProps = {
  title: string
  subtitle?: string
  testimonials: Testimonial[]
}

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = ({
  title,
  subtitle,
  testimonials,
}) => {
  return (
    <div className="flex flex-col items-center gap-12 mt-14">
      <div className="relative w-full flex items-center justify-center">
        <div className="text-[150px] leading-[150px] text-[#f6f7fc] font-[900] select-none">
          {subtitle}
        </div>
        <h3 className="absolute top-[33%] text-[40px] leading-[60px] font-bold">
          {title}
        </h3>
      </div>
      <div className="grid grid-cols-3 gap-4 w-[1136px]">
        {testimonials?.map((item) => {
          return (
            <div key={item.id} className="flex flex-col items-start gap-4">
              <div className="py-[10px] px-6 rounded-2xl bg-[#F7F8FB] text-[22px] leading-[30px] font-medium ">
                {item.content}
              </div>
              <div className="flex gap-2 px-6">
                <Image src={item.avatar.url} alt=""
                  width={item.avatar.width}
                  height={item.avatar.height}
                />
                <div className="flex flex-col gap-1">
                  <h4 className="leading-[24px] font-medium">{item.name}</h4>
                  <span className="text-[14px] leading-[20px] font-normal">{item.occupation}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}
