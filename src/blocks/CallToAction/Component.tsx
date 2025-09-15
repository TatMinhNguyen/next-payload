"use client";

import React from 'react'

import Image from 'next/image'
import Button from '@/common/Button'

interface CTABlockProps {
  background?: { url: string; alt: string; width?: number; height?: number }
  title: string;
  description: string;
  viewButton: {
    buttonText: string;
    url: string;
  };
}

export const CallToActionBlock: React.FC<CTABlockProps> = ({ background, title, description, viewButton }) => {
  return (
    <div className="relative w-full mt-14">
      {/* Chỉ render Image khi background và background.url tồn tại */}
      {background?.url && (
        <Image
          src={background.url}
          alt={background.alt || 'Call to action background'}
          width={background.width}
          height={background.height}
          className={`w-full h-auto object-cover`}
        />
      )}
      <Button size="md" variant='sky'
        className="absolute top-[65%] right-[20%] text-[20px] leading-[27px] text-white"
        onClick={() => window.location.href = `${viewButton.url}`}
      >
        {viewButton.buttonText}
      </Button>
      <h2 className="absolute top-[15%] left-[18%] text-[#d8e5ff] text-[40px] leading-[60px] font-semibold w-[660px]">
        {title}
      </h2>
      <span className="absolute bottom-[20%] left-[18%] text-[#d8e5ff]">
        {description}
      </span>
    </div>
  );
}
