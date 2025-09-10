import type { Block } from 'payload'

export const FAQBlock: Block = {
  slug: 'faq',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'questions',
      type: 'array',
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
        },
      ],
    },
  ],
}
