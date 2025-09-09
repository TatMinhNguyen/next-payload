'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="px-8 relative z-20 flex items-center justify-between" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="py-3 flex items-center gap-[60px]">
        <Link href="/">
          <Logo loading="eager" priority="high" className="dark:invert-0" />
        </Link>
        <HeaderNav data={data} />
      </div>
      {/* right header */}
      <div className="flex gap-4">
        <button className="py-2 px-6 rounded-xl bg-[#3a18ce] text-white text-[22px] leading-[30px] cursor-pointer"
          onClick={() => window.location.href = "https://app.clickee.ai/auth/login"}
        >
          Đăng nhập
        </button>
        <button className="py-2 px-6 rounded-xl bg-[#26d06d] text-white text-[22px] leading-[30px] cursor-pointer"
          onClick={() => window.location.href = "https://app.clickee.ai/auth/sign-up"}
        >
          Đăng kí
        </button>
      </div>
    </header>
  )
}
