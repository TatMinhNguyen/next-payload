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
      name: 'subtitle',
      type: 'text',
      defaultValue: 'CLICKEE',
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
          name: 'occupation',
          type: 'text',
          required: true,
          admin: {
            description: 'ví dụ: Giáo viên Thinkslab',
          },
        },
      ],
    },
  ],
}
