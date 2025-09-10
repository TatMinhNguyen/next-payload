import type { Block } from 'payload'

export const ServiceBlock: Block = {
  slug: 'service',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'tabs',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'features',
          type: 'array',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              required: true,
            },
            {
              name: 'icon',
              type: 'upload',
              relationTo: 'media',
            },
          ],
        },
        {
          name: 'ctaButton',
          type: 'group',
          fields: [
            {
              name: 'text',
              type: 'text',
              defaultValue: 'Đánh giá trình độ',
            },
            {
              name: 'url',
              type: 'text',
              defaultValue: '#',
            },
          ],
        },
        {
          name: 'screenshot',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'activeTab',
      type: 'text',
      defaultValue: 'writing',
    },
  ],
}
