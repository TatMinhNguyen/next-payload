import type { Block } from 'payload'

export const DetailPricingBlock: Block = {
  slug: 'DetailPricing',
  labels: {
    singular: 'Detail Pricing',
    plural: 'Detail Pricings',
  },
  fields: [
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
            { label: 'Business', value: 'business' },
          ],
          defaultValue: 'student',
        },
      ],
    },
    {
      name: 'packageType',
      type: 'array',
      label: 'Package Types',
      labels: {
        singular: 'Package Type',
        plural: 'Package Types',
      },
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Base', value: 'base' },
            { label: 'Addon', value: 'addon' },
          ],
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
          name: 'students',
          type: 'group',
          label: 'Student Packages',
          fields: [
            {
              name: 'packages',
              type: 'array',
              labels: {
                singular: 'Gói',
                plural: 'Gói',
              },
              fields: [
                {
                  name: 'duration',
                  type: 'text',
                  admin: {
                    description:
                      'Ví dụ: 1, 3, 6, 12 tương đương với 1 tháng, 3 tháng, 6 tháng, 12 tháng',
                  },
                },
                {
                  name: 'submissions',
                  type: 'text',
                  admin: {
                    description: 'Ví dụ: 100, 300 tương đương với 100 lượt chấm, 300 lượt chấm',
                  },
                },
                {
                  name: 'originalPrice',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'discountPrice',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'currency',
                  type: 'text',
                  defaultValue: 'VNĐ',
                },
                {
                  name: 'ctaText',
                  type: 'text',
                  defaultValue: 'MUA NGAY',
                },
                {
                  name: 'ctaColor',
                  type: 'text',
                  defaultValue: '#3A18CE',
                  admin: {
                    description: 'Ví dụ: #3A18CE',
                  },
                },
                {
                  name: 'ctaUrl',
                  type: 'text',
                  defaultValue: 'https://app.clickee.ai/pricing',
                },
              ],
            },
            {
              name: 'features',
              type: 'array',
              fields: [
                {
                  name: 'feature',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'warning',
              type: 'array',
              fields: [
                {
                  name: 'warningText',
                  type: 'text',
                  // required: true,
                },
              ],
            },
          ],
        },
        {
          name: 'teachers',
          type: 'group',
          label: 'Teacher Packages',
          fields: [
            {
              name: 'packages',
              type: 'array',
              labels: {
                singular: 'Gói',
                plural: 'Gói',
              },
              fields: [
                {
                  name: 'duration',
                  type: 'text',
                  admin: {
                    description:
                      'Ví dụ: 1, 3, 6, 12 tương đương với 1 tháng, 3 tháng, 6 tháng, 12 tháng',
                  },
                },
                {
                  name: 'submissions',
                  type: 'text',
                  admin: {
                    description: 'Ví dụ: 100, 300 tương đương với 100 lượt chấm, 300 lượt chấm',
                  },
                },

                {
                  name: 'originalPrice',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'discountPrice',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'currency',
                  type: 'text',
                  defaultValue: 'VNĐ',
                },
                {
                  name: 'ctaText',
                  type: 'text',
                  defaultValue: 'MUA NGAY',
                },
                {
                  name: 'ctaColor',
                  type: 'text',
                  defaultValue: '#3A18CE',
                  admin: {
                    description: 'Ví dụ: #3A18CE',
                  },
                },
                {
                  name: 'ctaUrl',
                  type: 'text',
                  defaultValue: 'https://app.clickee.ai/pricing',
                },
              ],
            },
            {
              name: 'features',
              type: 'array',
              fields: [
                {
                  name: 'feature',
                  type: 'text',
                  required: true,
                },
              ],
            },
            {
              name: 'warning',
              type: 'array',
              fields: [
                {
                  name: 'warningText',
                  type: 'text',
                  // required: true,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'business',
      type: 'group',
      label: 'Business Packages',
      fields: [
        {
          name: 'descriptions',
          type: 'text',
          required: true,
        },
        {
          name: 'input',
          type: 'array',
          fields: [
            {
              name: 'inputName',
              type: 'text',
              required: true,
            },
            {
              name: 'inputType',
              type: 'text',
              required: true,
              admin: {
                description: 'Ví dụ: email, .....',
              },
            },
          ],
        },
        {
          name: 'viewButton',
          type: 'group',
          fields: [
            {
              name: 'ctaText',
              type: 'text',
              defaultValue: 'GỬI',
            },
            {
              name: 'ctaUrl',
              type: 'text',
              defaultValue: 'https://app.clickee.ai/pricing',
            },
          ],
        },
      ],
    },
    {
      name: 'isDiscount',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'discountNote',
      type: 'text',
      admin: {
        description: 'Ví dụ: Nhập mã CLICKEE29 giảm 30%',
        condition: (_, siblingData) => siblingData?.isDiscount === true,
      },
      validate: (value: any, { siblingData }: { siblingData: { isDiscount?: boolean } }) => {
        if (siblingData?.isDiscount && !value) {
          return 'Bạn phải nhập discountNote khi bật khuyến mãi'
        }
        return true
      },
    },
    {
      name: 'discountPeriod',
      type: 'group',
      label: 'Thời gian khuyến mãi',
      admin: {
        condition: (_, siblingData) => siblingData?.isDiscount === true,
      },
      fields: [
        {
          name: 'startDate',
          type: 'date',
          admin: {
            description: 'Ngày bắt đầu khuyến mãi',
          },
          validate: (value: any, { siblingData }: { siblingData: { isDiscount?: boolean } }) => {
            if (siblingData?.isDiscount && !value) {
              return 'Bạn phải nhập ngày bắt đầu khi bật khuyến mãi'
            }
            return true
          },
        },
        {
          name: 'endDate',
          type: 'date',
          admin: {
            description: 'Ngày kết thúc khuyến mãi',
          },
          validate: (value: any, { siblingData }: { siblingData: { isDiscount?: boolean } }) => {
            if (siblingData?.isDiscount && !value) {
              return 'Bạn phải nhập ngày kết thúc khi bật khuyến mãi'
            }
            return true
          },
        },
      ],
    },
  ],
}
