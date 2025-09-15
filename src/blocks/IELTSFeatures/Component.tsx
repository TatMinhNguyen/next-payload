'use client'

import Image from "next/image";
import React from "react";

interface IELTSFeaturesBlockProps {
  title: string;
  subtitle: string;
  features: {
    image: Images;
    title: string;
    titleColor: string;
    description: string[];
    viewButton: {
      buttonText: string;
      url: string;
    };
  }[];
}

type Images = {
  url: string;
  alt: string;
  height: number;
  width: number;
}

export const IELTSFeaturesBlock: React.FC<IELTSFeaturesBlockProps> = ({
  title,
  subtitle,
  features,
}) => {
  return (
    <div className="flex flex-col items-center gap-10 w-full mt-14">
      {/* Header */}
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="relative w-full flex items-center justify-center">
          <div className="text-[150px] leading-[150px] text-[#f6f7fc] font-[900] select-none">
            {subtitle}
          </div>
          <h3 className="absolute top-[33%] text-[40px] leading-[60px] font-bold">
            {title}
          </h3>
        </div>
      </div>
      {/** Features */}
      <div>
        {features?.map((feature, index) => (
          <div key={index}
            className="flex gap-4"
          >
            <div></div>
            <div className="px-4 py-14 bg-[#E0EDFD] border border-[#A9D0FF] rounded-[40px]">
              <Image
                src={feature.image.url}
                alt={feature.image.alt}
                width={feature.image.width}
                height={feature.image.height}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}