import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  fields: [
    {
      name: 'banners',
      type: 'array',
      label: 'Banners',
      labels: {
        singular: 'Banner',
        plural: 'Banners',
      },
      fields: [
        {
          name: 'background',
          type: 'upload',
          relationTo: 'media',
          label: 'Background Image',
        },
        {
          name: 'mainImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Main Image',
        },
        {
          name: 'secondaryImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Secondary Image',
          required: false,
        },
        {
          name: 'mainImageClass',
          type: 'text',
          label: 'Main Image CSS Class',
        },
        {
          name: 'ellipse',
          type: 'checkbox',
          label: 'Ellipse',
          defaultValue: false,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'array',
          label: 'Description',
          labels: {
            singular: 'Line',
            plural: 'Lines',
          },
          fields: [
            {
              name: 'text',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'buttonText',
          type: 'text',
          defaultValue: 'Trải nghiệm ngay',
        },
        {
          name: 'buttonClass',
          type: 'text',
          defaultValue: 'bg-[#36a6ff]',
        },
      ],
    },
  ],
}
