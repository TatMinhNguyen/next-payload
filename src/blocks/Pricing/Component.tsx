import React from 'react'
import { CMSLink } from '@/components/Link'

type Package = {
  name: string
  price: string
  description?: string
  ctaText: string
  ctaUrl: string
}

type PricingBlockProps = {
  title: string
  subtitle?: string
  monthlyPackages: {
    title: string
    packages: Package[]
  }
  perSubmissionPackages: {
    title: string
    packages: Package[]
  }
  viewDetailsButton: {
    text: string
    url: string
  }
}

export const PricingBlock: React.FC<PricingBlockProps> = ({
  title,
  subtitle,
  monthlyPackages,
  perSubmissionPackages,
  viewDetailsButton,
}) => {
  return (
    <div className="py-20 bg-white">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          {subtitle && (
            <p className="text-lg text-gray-600 mb-4">{subtitle}</p>
          )}
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            {title}
          </h2>
        </div>

        {/* Monthly Packages */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
            {monthlyPackages.title}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {monthlyPackages.packages.map((pkg, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-xl p-8 text-center hover:border-blue-500 transition-colors"
              >
                <h4 className="text-xl font-semibold mb-4 text-gray-800">
                  {pkg.name}
                </h4>
                <p className="text-2xl font-bold text-blue-600 mb-4">
                  {pkg.price}
                </p>
                {pkg.description && (
                  <p className="text-gray-600 mb-6">{pkg.description}</p>
                )}
                <CMSLink
                  url={pkg.ctaUrl}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  {pkg.ctaText}
                </CMSLink>
              </div>
            ))}
          </div>
        </div>

        {/* Per Submission Packages */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">
            {perSubmissionPackages.title}
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {perSubmissionPackages.packages.map((pkg, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-xl p-8 text-center hover:border-blue-500 transition-colors"
              >
                <h4 className="text-xl font-semibold mb-4 text-gray-800">
                  {pkg.name}
                </h4>
                <p className="text-2xl font-bold text-blue-600 mb-4">
                  {pkg.price}
                </p>
                {pkg.description && (
                  <p className="text-gray-600 mb-6">{pkg.description}</p>
                )}
                <CMSLink
                  url={pkg.ctaUrl}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  {pkg.ctaText}
                </CMSLink>
              </div>
            ))}
          </div>
        </div>

        {/* View Details Button */}
        <div className="text-center">
          <CMSLink
            url={viewDetailsButton.url}
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            {viewDetailsButton.text}
          </CMSLink>
        </div>
      </div>
    </div>
  )
}
