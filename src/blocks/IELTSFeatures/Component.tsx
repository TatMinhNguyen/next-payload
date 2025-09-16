'use client'

import Button from "@/common/Button";
import BottomArrow from "@/components/Svg/Arrow/BottomArrow";
import TopArrow from "@/components/Svg/Arrow/TopArrow";
import Image from 'next/image'
import { useRouter } from "next/navigation";
import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from "framer-motion";

interface IELTSFeaturesBlockProps {
  title: string;
  subtitle: string;
  features: {
    image: Images;
    title: string;
    titleColor: string;
    description: { description: string }[];
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
  const router = useRouter();
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0)
  const [direction, setDirection] = useState<"up" | "down">("down");

  const handlePrevFeature = useCallback(() => {
    if (!features || features.length === 0) return;
    setDirection("up");
    setCurrentFeatureIndex(prevIndex => (prevIndex === 0 ? features.length - 1 : prevIndex - 1))
  }, [features])

  const handleNextFeature = useCallback(() => {
    if (!features || features.length === 0) return;
    setDirection("down");
    setCurrentFeatureIndex(prevIndex => (prevIndex === features.length - 1 ? 0 : prevIndex + 1))
  }, [features])

  const feature = features?.[currentFeatureIndex]

  // Variants cho animation
  const variants = {
    enter: (dir: "up" | "down") => ({
      y: dir === "down" ? -50 : 50,
      opacity: 0
    }),
    center: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: (dir: "up" | "down") => ({
      y: dir === "down" ? 50 : -50,
      opacity: 0,
      transition: { duration: 0.1 }
    })
  };

  return (
    <div className="flex flex-col items-center gap-10 w-full mt-14 ">
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

      {/* Features */}
      <div className="w-full flex justify-center overflow-hidden">
        <div className="py-[10px] px-12 flex flex-col gap-[60px] items-center max-w-[448px] w-full">
          {/* Mũi tên lên luôn cố định */}
          <button onClick={handlePrevFeature} className="hover:opacity-70 transition-opacity">
            <TopArrow />
          </button>

          {/* Animate chỉ phần nội dung text/button */}
          <div className="relative h-[310px] w-full flex items-center justify-center overflow-hidden">
            <AnimatePresence custom={direction} mode="wait">
              {feature && (
                <motion.div
                  key={currentFeatureIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute top-0 left-0 w-full flex flex-col gap-6 items-center"
                >
                  <h3
                    className="text-[22px] leading-[30px] font-[600]"
                    style={{ color: feature.titleColor }}
                  >
                    {feature.title}
                  </h3>
                  <ul className="flex flex-col gap-1 w-full list-disc list-outside pl-5">
                    {feature.description?.map((line, i) => (
                      <li key={i} className="text-[16px] leading-[24px] font-[400] text-[#000000]">
                        {line.description}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="navy"
                    className="w-fit text-[22px] leading-[30px] font-[500] pb-[10px]"
                    onClick={() => router.push(feature.viewButton.url)}
                  >
                    {feature.viewButton.buttonText}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mũi tên xuống luôn cố định */}
          <button onClick={handleNextFeature} className="hover:opacity-70 transition-opacity">
            <BottomArrow />
          </button>
        </div>

        {/* Animate ảnh riêng */}
        <div className="px-4 py-14 bg-[#E0EDFD] border border-[#A9D0FF] rounded-[40px] overflow-hidden">
          <AnimatePresence custom={direction} mode="wait">
            {feature && (
              <motion.div
                key={currentFeatureIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <Image
                  src={feature.image.url}
                  alt={feature.image.alt || "feature image"}
                  width={feature.image.width}
                  height={feature.image.height}
                  className="h-auto max-w-[900px] max-h-[506px]"
                  priority={true}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
