'use client'
import Button from '@/common/Button'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import ICON_GIFT from "@/assets/icons/gift.svg";
import CheckBox from '@/components/Svg/CheckBox'
import WarningBox from '@/components/Svg/WarningBox'

// --- Các kiểu dữ liệu mới khớp với config.ts ---
// Feature trong block
type Feature = {
  feature: string
  id?: string
}

// Warning trong block
type Warning = {
  warningText?: string
  id?: string
}

// Package trong block
type Package = {
  id?: string
  duration: string
  originalPrice: string
  discountPrice: string
  currency?: string
  ctaText?: string
  ctaColor?: string
  ctaUrl?: string
}

// Audience trong block
type Audience = {
  id?: string
  audienceName: string
  packages: Package[]
  features?: Feature[]
  warning?: Warning[]
}

// Props của toàn bộ PricingBlock
interface PricingBlockProps {
  title?: string
  subtitle?: string
  audiences?: Audience[]
  viewDetailsButton?: {
    text?: string
    url?: string
  }
  isDiscount?: boolean
  discountNote?: string
  discountPeriod?: {
    startDate: string
    endDate: string
  }
}

export const PricingBlock: React.FC<PricingBlockProps> = ({
  title,
  audiences,
  subtitle,
  viewDetailsButton,
  isDiscount,
  discountNote,
  discountPeriod,
}) => {
  // State để lưu thông điệp (sắp bắt đầu, sắp kết thúc, đã kết thúc)
  const [countdownMessage, setCountdownMessage] = useState('')
  // State để lưu các thành phần thời gian
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  const totalPrices = (discountPrice: string, duration: string) => {
    const price = parseFloat(discountPrice) || 0
    const months = parseInt(duration, 10) || 0
    return Math.round(price * months)
  }

  useEffect(() => {
    // Chỉ chạy logic countdown nếu isDiscount là true và có ngày tháng hợp lệ
    if (isDiscount && discountPeriod?.startDate && discountPeriod?.endDate) {
      const timer = setInterval(() => {
        const now = new Date().getTime()
        const startDate = new Date(discountPeriod.startDate).getTime()
        const endDate = new Date(discountPeriod.endDate).getTime()

        let diff: number;

        if (now < startDate) {
          setCountdownMessage('Ưu đãi sẽ bắt đầu sau')
          diff = startDate - now
        } else if (now < endDate) {
          setCountdownMessage('Ưu đãi sẽ kết thúc sau')
          diff = endDate - now
        } else {
          setCountdownMessage('Khuyến mãi đã kết thúc')
          diff = 0
        }

        if (diff > 0) {
          setTimeLeft({
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
            seconds: Math.floor((diff / 1000) % 60),
          })
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
          clearInterval(timer) // Dừng timer khi hết giờ
        }
      }, 1000) // cập nhật mỗi giây

      return () => clearInterval(timer)
    }
  }, [isDiscount, discountPeriod])

  if (!audiences || audiences.length === 0) {
    return null // Không render gì nếu không có dữ liệu
  }

  return (
    <div className="flex flex-col items-center gap-10 mt-14">
      {/* Header */}
      <div className="relative w-full flex items-center justify-center">
        <div className="text-[150px] leading-[150px] text-[#f6f7fc] font-[900] select-none">
          {subtitle}
        </div>
        <h3 className="absolute top-[33%] text-[40px] leading-[60px] font-bold">
          {title}
        </h3>
      </div>

      <div className='flex flex-col items-center gap-10'>
        {audiences?.map((audience, index) => {
          return (
            <div key={index} className='flex flex-col items-center gap-5'>
              <h3 className="text-[22px] leading-[30px] font-semibold text-[#4D5E80]">{audience.audienceName}</h3>
              <div className='grid grid-cols-4 gap-6'>
                {audience.packages?.map((pkg, index) => {
                  return (
                    <div key={index}
                      className='p-6 flex flex-col gap-6 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.15)] bg-white'
                    >
                      <div className="flex flex-col gap-4 h-full">
                        <div className="flex flex-col gap-4 h-full">
                          <div className="flex flex-col gap-2 items-center">
                            <h4 className="font-medium text-[#3A18CE] leading-[24px]">{pkg.duration} THÁNG</h4>
                            <div className="flex gap-2 items-end">
                              <span className="font-semibold text-red-500 line-through">{pkg.originalPrice}</span>
                              <span className="font-semibold text-black text-[24px] leading-[30px]">{pkg.discountPrice}</span>
                              <span className="font-semibold">{pkg.currency}</span>
                            </div>
                            {pkg.duration !== "1" && (
                              <span className="text-[14px] leading-[20px]">
                                x {pkg.duration} tháng = {totalPrices(pkg.discountPrice, pkg.duration)}.000 {pkg.currency}
                              </span>
                            )}
                          </div>
                          {isDiscount && (
                            <div className='mt-auto py-2 px-4 flex flex-col gap-2 items-center rounded-[16px] bg-[#FFF5EA] border border-[#FF9928]'>
                              <div className='flex flex-col gap-1 items-center'>
                                <Image
                                  src={ICON_GIFT}
                                  alt=''
                                />
                                <div className='flex flex-col gap-1 items-center'>
                                  <span className='text-[12px] leading-[16px]'>
                                    {countdownMessage}
                                  </span>
                                  <h4 className='text-[22px] leading-[30px] font-semibold'>
                                    {`${timeLeft.days}d : ${timeLeft.hours}h : ${timeLeft.minutes}m : ${timeLeft.seconds}s`}
                                  </h4>
                                </div>
                              </div>
                              <div className='flex max-w-[186px] px-4 py-[10px] rounded-[12px] bg-[#FFFBF6] border border-[#FFE4B9]'>
                                <p className='text-[12px] text-center leading-[16px] font-semibold text-[#0A0A0A]'>
                                  {discountNote}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-4">
                          {audience.features?.map((feature, index) => {
                            return (
                              <div key={index} className="flex gap-2">
                                <CheckBox />
                                <p className="max-w-[194px] font-normal text-[14px] leading-[20px] -mt-1">{feature.feature}</p>
                              </div>
                            )
                          })}
                          {audience.warning?.map((warning, index) => {
                            return (
                              <div key={index} className="flex gap-2">
                                <WarningBox />
                                <p className="max-w-[194px] font-normal text-[14px] leading-[20px] -mt-1">{warning.warningText}</p>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                      <Button variant='navy' size='md'
                        className={`${pkg.ctaColor ? `bg-[${pkg.ctaColor}]` : ''}`}
                        onClick={() => window.location.href = pkg.ctaUrl || '#'}
                      >
                        {pkg.ctaText || 'MUA NGAY'}
                      </Button>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <Link href={viewDetailsButton?.url || '#'}>
        <Button variant='green' size='md' className="">
          {viewDetailsButton?.text || 'XEM CHI TIẾT'}
        </Button>
      </Link>
    </div>
  );
}
