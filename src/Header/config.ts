import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      label: 'Navigation',
      type: 'blocks',
      blocks: [
        {
          slug: 'linkItem',
          labels: { singular: 'Link', plural: 'Links' },
          fields: [link({ appearances: false })],
        },
        {
          slug: 'dropdown',
          labels: { singular: 'Dropdown', plural: 'Dropdowns' },
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'dropdownItems',
              type: 'array',
              admin: { initCollapsed: true },
              fields: [link({ appearances: false })],
            },
          ],
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
