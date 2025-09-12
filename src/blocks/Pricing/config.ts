import type { Block } from 'payload'

export const PricingBlock: Block = {
  slug: 'pricing',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'BẢNG GIÁ',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      defaultValue: 'CLICKEE',
    },
    {
      name: 'audiences',
      type: 'array',
      labels: {
        singular: 'Đối tượng',
        plural: 'Đối tượng',
      },
      fields: [
        {
          name: 'audienceName',
          type: 'text',
          required: true,
          defaultValue: 'DÀNH CHO HỌC SINH', // hoặc "DÀNH CHO GIÁO VIÊN"
        },
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
              required: true,
              defaultValue: '1',
              admin: {
                description:
                  'Ví dụ: 1, 3, 6, 12 tương đương với 1 tháng, 3 tháng, 6 tháng, 12 tháng',
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
              defaultValue: '#',
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
    {
      name: 'viewDetailsButton',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          defaultValue: 'XEM CHI TIẾT',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '#',
        },
      ],
    },
  ],
}
