import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Image from 'next/image'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const policies = footerData?.policies || []
  const supports = footerData?.supports || []
  const socialLinks = footerData?.socialLinks || []

  return (
    <footer className="flex items-center justify-center w-auto max-h-[430px] h-[100%] bg-[#09196b] py-[56px] px-[32px] text-white mt-10">
      <div className="flex justify-between max-w-[1147px] w-[100%] h-[332px]">
        <div className="flex flex-col gap-[17px] max-w-[332px] w-[100%]">
          <div className="flex flex-col gap-3">
            <h2 className="text-base leading-[24px] font-bold">
              {footerData.companyName}
            </h2>
            <div className="flex flex-col gap-4">
              <span className="text-[14px]">
                <strong className="mr-1">
                  MSDN:
                </strong>
                {footerData.taxId}
              </span>
              <span className="text-[14px]">
                <strong className="mr-1">
                  Địa chỉ liên hệ:
                </strong>
                {footerData.address}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              {/* Icon phone nếu có */}
              <span className="text-[14px]">
                <strong className="mr-1">
                  Hotline:
                </strong>
                {footerData.hotline}
              </span>
            </div>
            <div className="flex gap-2 items-center">
              {/* Icon email nếu có */}
              <span className="text-[14px]">
                <strong className="mr-1">
                  Email:
                </strong>
                {footerData.email}
              </span>
            </div>
          </div>
          {/* Chứng nhận / ảnh tuỳ chọn: có thể thêm field upload nếu cần */}
        </div>
        <div className="flex flex-col gap-10 max-w-[230px] w-[100%]">
          <div className="flex flex-col gap-4">
            <h2 className="leading-6 font-bold">CHÍNH SÁCH & ĐIỀU KHOẢN</h2>
            <ul className="list-disc pl-4 flex flex-col">
              {policies.map(({ link }, i) => (
                <li key={i} className="leading-6 text-[14px] py-2 text-white">
                  <CMSLink {...link} appearance="link" className="text-white" />
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="leading-6 font-bold">HƯỚNG DẪN & HỖ TRỢ</h2>
            <ul className="list-disc pl-4 flex flex-col gap-1">
              {supports.map(({ link }, i) => (
                <li key={i} className="leading-6 text-[14px] py-2">
                  <CMSLink {...link} appearance="link" className="text-white" />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center rounded-lg max-w-[332px]">
          {/* Title */}
          <h2 className="text-base font-bold text-center mb-4">
            CẬP NHẬT THÔNG TIN TỪ CHÚNG TÔI
          </h2>

          {/* Form */}
          <div className="w-full space-y-4">
            <input
              type="text"
              placeholder="Họ và tên"
              className="w-full px-4 py-3 rounded-md bg-[#1C2E8A] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              placeholder="Nhập Email"
              className="w-full px-4 py-3 rounded-md bg-[#1C2E8A] placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="w-full bg-[#3BB2F6] text-white font-semibold py-3 rounded-md hover:bg-blue-400 transition">
              Gửi liên hệ
            </button>
          </div>

          {/* Social */}
          <div className="w-full text-center space-y-4">
            <h3 className="font-bold mt-9">KẾT NỐI VỚI CHÚNG TÔI</h3>
            <div className="flex justify-center gap-8">
              {socialLinks.map(({ platform, link }, i) => {
                const iconMap: Record<string, string> = {
                  facebook: '/icons/facebook.svg',
                  zalo: '/icons/zalo.svg',
                  youtube: '/icons/youtube.svg',
                  messenger: '/icons/messenger.svg',
                  tiktok: '/icons/tiktok.svg',
                  linkedin: '/icons/linkedin.svg',
                }
                const href = link?.type === 'custom' ? link?.url : '#'
                const icon = iconMap[platform] || '/icons/link.svg'
                return (
                  <a
                    key={i}
                    href={href || '#'}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1C2E8A] hover:bg-[#2a3ea1] transition"
                    target={link?.newTab ? '_blank' : undefined}
                    rel={link?.newTab ? 'noopener noreferrer' : undefined}
                    aria-label={platform}
                  >
                    <Image src={icon} alt={platform} width={20} height={20} />
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
