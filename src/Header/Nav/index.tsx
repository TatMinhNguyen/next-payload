'use client'

import React, { useState } from 'react'

import type { Header as HeaderType, Page, Post } from '@/payload-types'

import { usePathname, useRouter } from 'next/navigation'

type NavLinkItem = {
  name: string
  href: string
}

type NavLink = {
  name: string
  href: string
  hasDropdown?: boolean
  dropdownItems?: NavLinkItem[]
}

function getHrefFromLink(link: any): string | null {
  if (link?.type === 'reference' && typeof link?.reference?.value === 'object') {
    const ref = link.reference.value as Page | Post
    const slug = (ref as any)?.slug
    if (!slug) return null
    return link.reference.relationTo !== 'pages' ? `/${link.reference.relationTo}/${slug}` : `/${slug}`
  }
  return link?.url ?? null
}

function buildNavLinks(data: HeaderType | undefined): NavLink[] {
  const items = data?.navItems || []
  const result: NavLink[] = []
  for (const item of items) {
    if (item.blockType === 'linkItem') {
      const href = getHrefFromLink(item.link)
      if (!href) continue
      result.push({ name: item.link.label, href })
    } else if (item.blockType === 'dropdown') {
      const dropdownItems: NavLinkItem[] = []
      for (const child of item.dropdownItems || []) {
        const href = getHrefFromLink(child.link)
        if (!href) continue
        dropdownItems.push({ name: child.link.label, href })
      }
      result.push({ name: item.label, href: '#', hasDropdown: true, dropdownItems })
    }
  }
  return result
}

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const router = useRouter()
  const pathname = usePathname()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const navLinks = buildNavLinks(data)

  return (
    <div className="flex items-center gap-10">
      {navLinks.map((link) => (
        <div
          key={link.name}
          className="relative py-3"
          onMouseEnter={() => link.hasDropdown && setOpenDropdown(link.name)}
          onMouseLeave={() => link.hasDropdown && setOpenDropdown(null)}
        >
          <div
            className={`flex items-center text-[22px] leading-[30px] font-[500] hover:text-[#2196f3] cursor-pointer ${pathname === link.href || (link.hasDropdown && link.dropdownItems?.some((item) => item.href === pathname))
              ? 'text-[#3A18CE]'
              : ''
              }`}
            onClick={() => !link.hasDropdown && router.push(link.href)}
          >
            {link.name}
            {link.hasDropdown && (
              <svg className="text-[14px] ml-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor" width="14" height="14"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" /></svg>
            )}
          </div>
          {link.hasDropdown && openDropdown === link.name && (
            <ul className="absolute top-full left-2/3 -translate-x-1/2 mt-0 w-[190px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] rounded-xl z-50 overflow-hidden">
              {link.dropdownItems?.map((item) => (
                <li
                  key={item.name}
                  className={`px-4 py-3 text-base leading-[24px] font-medium cursor-pointer ${item.href === pathname
                    ? 'bg-[#3A18CE] text-white'
                    : 'text-[#09196b] hover:bg-[#e7e5ff] hover:text-[#3A18CE]'
                    }`}
                  onClick={() => {
                    router.push(item.href)
                    setOpenDropdown(null)
                  }}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}
