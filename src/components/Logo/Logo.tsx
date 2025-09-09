import clsx from 'clsx'
import React from 'react'

import logo from "@/assets/logo/logo-clickee.svg"
import Image from 'next/image'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <Image
      alt="Clickee Logo"
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      // className={clsx('max-w-[9.375rem] w-full h-[34px]', className)}
      src={logo}
    />
  )
}
