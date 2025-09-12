import type { Block } from 'payload'

export const ServiceBlock: Block = {
  slug: 'service',
  labels: {
    singular: 'Service Item',
    plural: 'Service Items',
  },
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
      name: 'role',
      type: 'array',
      label: 'Roles',
      labels: {
        singular: 'Role',
        plural: 'Roles',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'selectedRole',
          type: 'select',
          options: [
            { label: 'Student', value: 'student' },
            { label: 'Teacher', value: 'teacher' },
          ],
          defaultValue: 'student',
        },
      ],
    },
    {
      name: 'students',
      type: 'array',
      label: 'Student Services',
      labels: {
        singular: 'Student Service',
        plural: 'Student Services',
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
          name: 'contents',
          type: 'array',
          label: 'Contents',
          labels: {
            singular: 'Content',
            plural: 'Contents',
          },
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
          name: 'videoUrl',
          type: 'text',
          required: true,
        },
        {
          name: 'buttonContent',
          type: 'text',
          required: true,
          label: 'Button Content',
        },
      ],
    },
    {
      name: 'teachers',
      type: 'array',
      label: 'Teacher Services',
      labels: {
        singular: 'Teacher Service',
        plural: 'Teacher Services',
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
          name: 'contents',
          type: 'array',
          label: 'Contents',
          labels: {
            singular: 'Content',
            plural: 'Contents',
          },
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
          name: 'videoUrl',
          type: 'text',
          required: true,
        },
        {
          name: 'buttonContent',
          type: 'text',
          required: true,
          label: 'Button Content',
        },
      ],
    },
  ],
}
