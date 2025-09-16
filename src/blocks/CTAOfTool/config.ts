import type { Block } from 'payload'

export const CTAOfToolBlock: Block = {
  slug: 'CTAOfTool',
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
      name: 'button',
      type: 'array',
      fields: [
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
              name: 'buttonColor',
              type: 'select',
              options: [
                {
                  label: 'primary',
                  value: 'primary',
                },
                {
                  label: 'green',
                  value: 'green',
                },
                {
                  label: 'secondary',
                  value: 'secondary',
                },
                {
                  label: 'danger',
                  value: 'danger',
                },
                {
                  label: 'ghost',
                  value: 'ghost',
                },
                {
                  label: 'navy',
                  value: 'navy',
                },
                {
                  label: 'sky',
                  value: 'sky',
                },
              ],
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
      required: true,
    },
  ],
  labels: {
    plural: 'CTA Of Tool',
    singular: 'CTA Of Tool',
  },
}
