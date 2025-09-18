"use client"

import React, { useEffect, useState } from "react"

interface PricingBlockProps {
  role: Role[],
  packageType: PackageType[],
  business: Business,
  isDiscount?: boolean
  discountNote?: string
  discountPeriod?: {
    startDate: string
    endDate: string
  }
}

type Role = {
  title: string,
  selectedRole: string,
}

type PackageType = {
  type: string,
  title: string,
  description: string,
  students: Students[],
  teachers: Teachers[],
}

type Students = {
  packages: {
    id?: string
    duration: string
    submissions: string
    originalPrice: string
    discountPrice: string
    currency?: string
    ctaText?: string
    ctaColor?: string
    ctaUrl?: string
  }[],
  feature: {
    feature: string
    id?: string
  }[],
  warning: {
    warningText?: string
    id?: string
  }[]

}

type Teachers = {
  packages: {
    id?: string
    duration: string
    submissions: string
    originalPrice: string
    discountPrice: string
    currency?: string
    ctaText?: string
    ctaColor?: string
    ctaUrl?: string
  }[],
  feature: {
    feature: string
    id?: string
  }[],
  warning: {
    warningText?: string
    id?: string
  }[]
}

type Business = {
  title: string,
  selectedBusiness: string,
}

export const PricingDetailBlock: React.FC<PricingBlockProps> = (props) => {
  const { role, packageType, business, isDiscount, discountNote, discountPeriod } = props
  console.log(props)

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
  return (
    <div className="flex flex-col items-center gap-10 mt-14">
      {packageType?.map((pkgType, index) => (
        <div key={index}>

        </div>
      ))}
    </div>
  )
}