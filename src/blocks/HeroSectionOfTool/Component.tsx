'use client'

import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Button from '@/common/Button'

type Content = {
  content: string;
  icon: Images;
}

type ViewButton = {
  buttonText: string;
  url: string;
}

type Images = {
  url: string;
  alt: string;
  height: number;
  width: number;
}

interface BannerProps {
  background: {
    backgroundColor: string;
    mainColor: string;
  };
  toolName?: {
    name: string;
    color: string;
  };
  title?: string;
  contents?: Content[];
  viewButton?: ViewButton;
  image?: Images;
}

export const HeroSectionOfToolBlock: React.FC<BannerProps> = ({
  background,
  toolName,
  title,
  contents,
  viewButton,
  image,
}) => {

  const router = useRouter()
  return (
    <div className={`py-10 px-4`}
      style={{ backgroundColor: background.backgroundColor }}
    >
      <div className="flex flex-col md:flex-row gap-16 justify-center max-w-7xl mx-auto">
        {/* Cột nội dung bên trái */}
        <div className="w-full max-w-[700px] text-[#09196B]">
          {/* Thêm class 'w-fit' để div chỉ rộng vừa đủ nội dung */}
          <div className='w-fit py-3 px-6 text-base leading-[24px] font-bold text-[#09196B] rounded-r-[16px] rounded-tl-[16px]'
            style={{ backgroundColor: toolName?.color }}
          >
            {toolName?.name}
          </div>
          <h2 className="text-[36px] leading-[60px] font-bold mb-6">{title}</h2>
          {contents?.map((item, index) => (
            <div key={index} className="flex items-center gap-4 mb-6">
              {item.icon?.url && <Image src={item.icon.url} alt={item.icon.alt || ''}
                width={item.icon.width} height={item.icon.height} />}
              <p className="text-base leading-[24px] font-medium">{item.content}</p>
            </div>
          ))}
          {viewButton?.url && (
            <Button variant='green'
              onClick={() => router.push(viewButton.url)}
              className="text-[22px] leading-[30px] font-medium"
            >
              {viewButton.buttonText}
            </Button>
          )}
        </div>
        {/* Cột hình tròn bên phải */}
        <div className="max-w-md w-full md:w-1/2 flex justify-center items-center ">
          <div className={`w-full aspect-square rounded-full relative`}
            style={{ backgroundColor: background.mainColor }}
          >
            {image?.url && (
              // 1. Tạo một div wrapper lớn hơn (120%) và căn giữa
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[115%]">
                {/* 2. Image sẽ fill vào div wrapper lớn hơn này */}
                <Image src={image.url} alt={image.alt || ''}
                  fill
                  className="object-contain"
                  priority={true}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}