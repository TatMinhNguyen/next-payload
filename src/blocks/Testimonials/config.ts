import type { Block } from 'payload'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'testimonials',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'avatar',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'content',
          type: 'textarea',
          required: true,
        },
        {
          name: 'rating',
          type: 'number',
          min: 1,
          max: 5,
          defaultValue: 5,
        },
      ],
    },
  ],
}
