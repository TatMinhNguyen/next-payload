import type { Block } from 'payload'

export const CallToAction: Block = {
  slug: 'cta',
  interfaceName: 'CallToActionBlock',
  fields: [
    {
      name: 'background',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      required: true,
    },
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
  ],
  labels: {
    plural: 'Calls to Action',
    singular: 'Call to Action',
  },
}
