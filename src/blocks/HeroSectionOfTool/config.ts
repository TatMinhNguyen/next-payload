import type { Block } from 'payload'

export const HeroSectionOfToolBlock: Block = {
  slug: 'heroSectionOfTool',
  fields: [
    {
      name: 'background',
      type: 'group',
      label: 'Background',
      fields: [
        {
          name: 'backgroundColor',
          type: 'text',
          admin: {
            description: 'Ví dụ: #36A6FF',
          },
          required: true,
        },
        {
          name: 'mainColor',
          type: 'text',
          admin: {
            description: 'Ví dụ: #36A6FF',
          },
          required: true,
        },
      ],
      required: true,
    },
    {
      name: 'toolName',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'color',
          type: 'text',
          admin: {
            description: 'Ví dụ: #36A6FF',
          },
          required: true,
        },
      ],
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'contents',
      type: 'array',
      labels: {
        singular: 'Content',
        plural: 'Contents',
      },
      fields: [
        {
          name: 'content',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'viewButton',
      type: 'group',
      fields: [
        {
          name: 'buttonText',
          type: 'text',
          defaultValue: 'Dùng thử miễn phí',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '#',
        },
      ],
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
