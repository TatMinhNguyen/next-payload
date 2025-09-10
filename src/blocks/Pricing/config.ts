import type { Block } from 'payload'

export const PricingBlock: Block = {
  slug: 'pricing',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'monthlyPackages',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'GÓI MUA THEO THÁNG',
        },
        {
          name: 'packages',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'price',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'ctaText',
              type: 'text',
              defaultValue: 'ĐĂNG KÝ NGAY',
            },
            {
              name: 'ctaUrl',
              type: 'text',
              defaultValue: '#',
            },
          ],
        },
      ],
    },
    {
      name: 'perSubmissionPackages',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
          defaultValue: 'GÓI MUA THEO LƯỢT CHẤM',
        },
        {
          name: 'packages',
          type: 'array',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            {
              name: 'price',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'ctaText',
              type: 'text',
              defaultValue: 'ĐĂNG KÝ NGAY',
            },
            {
              name: 'ctaUrl',
              type: 'text',
              defaultValue: '#',
            },
          ],
        },
      ],
    },
    {
      name: 'viewDetailsButton',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          defaultValue: 'XEM CHI TIẾT',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '#',
        },
      ],
    },
  ],
}
