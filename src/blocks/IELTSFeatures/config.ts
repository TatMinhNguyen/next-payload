import type { Block } from 'payload'

export const IELTSFeaturesBlock: Block = {
  slug: 'IELTSFeatures',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
    },
    {
      name: 'features',
      type: 'array',
      labels: {
        singular: 'Feature',
        plural: 'Features',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'titleColor',
          type: 'text',
          admin: {
            description: 'Ví dụ: #36A6FF',
          },
          required: true,
        },
        {
          name: 'description',
          type: 'array',
          labels: {
            singular: 'Description',
            plural: 'Descriptions',
          },
          fields: [
            {
              name: 'description',
              type: 'text',
              required: true,
            },
          ],
          required: true,
        },
        {
          name: 'viewButton',
          type: 'group',
          fields: [
            {
              name: 'buttonText',
              type: 'text',
              defaultValue: 'Đánh giá trình độ',
            },
            {
              name: 'url',
              type: 'text',
              defaultValue: 'https://app.clickee.ai/',
            },
          ],
          required: true,
        },
      ],
    },
  ],
  labels: {
    plural: 'IELTS Features Block',
    singular: 'IELTS Features Block',
  },
}
