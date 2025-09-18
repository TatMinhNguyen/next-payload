"use client";

import Button from "@/common/Button";
import Image from "next/image";
import React from "react";

interface CtaOfTool {
  background: Images,
  title: string,
  description: string,
  button: any,
}

type Images = {
  url: string;
  alt: string;
  height: number;
  width: number;
}

export const CTAComponentPricingBlock: React.FC<CtaOfTool> = (props) => {
  const { background, title, description, button } = props;
  return (
    <div className="relative w-full">
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
      <div className="absolute top-[15%] left-[20%]">
        <div className="flex flex-col gap-2">
          <h2 className="text-[#fff] text-[45px] leading-[60px] font-semibold w-[660px]">
            {title}
          </h2>
          <span className="text-[#fff] text-[80px] leading-[90px] font-semibold">
            {description}
          </span>
        </div>
        <div className="flex mt-8 gap-4">
          {button?.map((button: any, index: number) => (
            <Button size="md" variant={button.viewButton.buttonColor} key={index}
              className="text-[22px] leading-[27px] text-white"
              onClick={() => window.location.href = `${button.viewButton.url}`}
            >
              {button.viewButton.buttonText}
            </Button>
          ))}
        </div>
      </div>

    </div>
  );
};
