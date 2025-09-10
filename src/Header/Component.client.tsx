'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import Button from '@/common/Button'

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
        <Button variant='navy' className="text-[20px] leading-[30px]"
          onClick={() => window.location.href = "https://app.clickee.ai/auth/login"}
        >
          Đăng nhập
        </Button>
        <Button variant='green' size='md' className="text-[20px] leading-[30px]"
          onClick={() => window.location.href = "https://app.clickee.ai/auth/sign-up"}
        >
          Đăng kí
        </Button>
      </div>
    </header>
  )
}
