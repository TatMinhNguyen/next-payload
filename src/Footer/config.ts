import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'companyName', type: 'text', required: true },
    { name: 'taxId', label: 'MSDN / Tax ID', type: 'text' },
    { name: 'address', type: 'textarea' },
    { name: 'hotline', type: 'text' },
    { name: 'email', type: 'email' },
    {
      name: 'policies',
      type: 'array',
      admin: { initCollapsed: true },
      fields: [link({ appearances: false })],
    },
    {
      name: 'supports',
      type: 'array',
      admin: { initCollapsed: true },
      fields: [link({ appearances: false })],
    },
    {
      name: 'socialLinks',
      type: 'array',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          options: [
            { label: 'Facebook', value: 'facebook' },
            { label: 'Zalo', value: 'zalo' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Messenger', value: 'messenger' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'LinkedIn', value: 'linkedin' },
          ],
        },
        link({ appearances: false }),
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
