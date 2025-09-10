import type { Block } from 'payload'

export const FeaturesBlock: Block = {
  slug: 'features',
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
      name: 'description',
      type: 'textarea',
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
        {
          name: 'color',
          type: 'select',
          options: [
            { label: 'Blue', value: 'blue' },
            { label: 'Green', value: 'green' },
            { label: 'Orange', value: 'orange' },
            { label: 'Pink', value: 'pink' },
            { label: 'Purple', value: 'purple' },
          ],
          defaultValue: 'blue',
        },
      ],
    },
    {
      name: 'screenshot',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
