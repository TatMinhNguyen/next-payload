'use client'

import React, { useEffect, useMemo, useState, useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Ellipse from '@/components/Svg/Ellipse'

type Banner = {
  id: string | number
  background?: { url: string; alt?: string }
  mainImage?: { url: string; alt?: string }
  secondaryImage?: { url: string; alt?: string }
  mainImageClass?: string
  ellipse?: boolean
  title: string
  description: { text: string }[]
  buttonText: string
  buttonClass: string
}

export const HeroBlock: React.FC<{ banners: Banner[] }> = ({ banners }) => {
  const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000'

  const router = useRouter()

  const [currentSlide, setCurrentSlide] = useState(1)
  const [transitionEnabled, setTransitionEnabled] = useState(true)
  const [isHovering, setIsHovering] = useState(false)

  const TOTAL_BANNERS = banners.length

  const extendedBanners = useMemo(() => {
    if (TOTAL_BANNERS === 0) return []
    const firstBanner = banners[0]
    const lastBanner = banners[TOTAL_BANNERS - 1]
    return [lastBanner, ...banners, firstBanner]
  }, [banners, TOTAL_BANNERS])

  const handleLeftArrowClick = useCallback(() => {
    if (!transitionEnabled) return
    setCurrentSlide((prev) => prev - 1)
  }, [transitionEnabled])

  const handleRightArrowClick = useCallback(() => {
    if (!transitionEnabled) return
    setCurrentSlide((prev) => prev + 1)
  }, [transitionEnabled])

  const handleTransitionEnd = () => {
    if (currentSlide <= 0) {
      setTransitionEnabled(false)
      setCurrentSlide(TOTAL_BANNERS)
    }

    if (currentSlide >= TOTAL_BANNERS + 1) {
      setTransitionEnabled(false)
      setCurrentSlide(1)
    }
  }

  const handleClickButton = (buttonText: string) => {
    if (buttonText === 'Liên hệ ngay') {
      router.push('/contact')
    } else {
      window.location.href = 'https://app.clickee.ai'
    }
  }

  useEffect(() => {
    if (!transitionEnabled) {
      const timer = setTimeout(() => setTransitionEnabled(true), 50)
      return () => clearTimeout(timer)
    }
  }, [transitionEnabled])

  useEffect(() => {
    if (isHovering || !transitionEnabled) return

    const timerId = setInterval(() => {
      handleRightArrowClick()
    }, 5000)

    return () => clearInterval(timerId)
  }, [isHovering, transitionEnabled, handleRightArrowClick])

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Container chứa các banner */}
      <div
        className={`flex ${transitionEnabled ? 'transition-transform duration-500 ease-in-out' : ''}`}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedBanners?.map((banner, index) => {
          console.log(banner.mainImageClass)
          return (
            <div key={`${banner.id}-${index}`} className="relative w-full min-h-[504px] flex-shrink-0">
              {/* Background */}
              {banner.background?.url && (
                <Image
                  src={`${CMS_URL}${banner.background.url}`}
                  alt={banner.background.alt || 'banner background'}
                  className="w-full h-full object-cover"
                  fill
                  priority={index === 1}
                  sizes="100vw"
                />
              )}

              {/* Main Image */}
              {banner.mainImage?.url && (
                <Image
                  src={banner.mainImage.url}
                  alt={banner.mainImage.alt || 'banner content'}
                  className={banner.mainImageClass || ''}
                  width={500}
                  height={500}
                  priority={index === 1}
                  sizes="(max-width: 1024px) 80vw, 50vw"
                />
              )}

              {/* Secondary Image */}
              {banner.secondaryImage?.url && (
                <Image
                  src={banner.secondaryImage.url}
                  alt={banner.secondaryImage.alt || 'banner secondary'}
                  className="absolute top-20 right-15 z-10"
                  width={400}
                  height={400}
                  priority={index === 1}
                  sizes="(max-width: 1024px) 70vw, 40vw"
                />
              )}

              {/* Ellipse */}
              {banner.ellipse && (
                <div className="absolute top-13 right-[26%]">
                  <Ellipse />
                </div>
              )}

              {/* Nội dung text */}
              <div className="absolute top-35 left-[10%] w-[489px]">
                <h2 className="text-[45px] leading-[60px] font-[800] text-white mb-4">{banner.title}</h2>
                {banner.description?.map((line, i) => (
                  <p
                    key={i}
                    className={`text-[16px] leading-[24px] font-[600] text-white ${i === banner.description.length - 1 ? 'mb-4' : ''
                      }`}
                  >
                    {line.text}
                  </p>
                ))}

                <button
                  className={`${banner.buttonClass} text-white px-6 py-2 rounded-[12px] cursor-pointer text-[22px] leading-[30px] font-[600]`}
                  onClick={() => handleClickButton(banner.buttonText)}
                >
                  {banner.buttonText}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
