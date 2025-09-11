'use client'

import Image from 'next/image'

type Media = {
  url: string
  alt?: string
}

type Content = {
  title: string
  description: string
  icon?: Media
}

type ServiceItem = {
  title: string
  image: Media
  contents: Content[]
  videoUrl: string
  buttonContent: string
}

type ServiceBlockProps = {
  title: string
  subtitle?: string
  role?: { title: string }[]
  students: ServiceItem[]
  teachers: ServiceItem[]
}

export default function ServiceBlock({
  title,
  subtitle,
  role,
  students,
  teachers,
}: ServiceBlockProps) {
  return (
    <section className="w-full py-12 px-4">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">{title}</h2>
        {subtitle && <p className="text-gray-600 mt-2">{subtitle}</p>}
        {role && (
          <div className="flex gap-3 justify-center mt-4">
            {role.map((r, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full"
              >
                {r.title}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Students */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-6">Student Services</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {students?.map((s, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl shadow-md bg-white flex flex-col gap-4"
            >
              {/* Thumbnail */}
              {s.image?.url && (
                <div className="w-full h-48 relative rounded-lg overflow-hidden">
                  <Image
                    src={s.image.url}
                    alt={s.image.alt || s.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <h4 className="text-xl font-bold">{s.title}</h4>

              {/* Contents */}
              <ul className="flex flex-col gap-3">
                {s.contents?.map((c, j) => (
                  <li key={j} className="flex items-start gap-3">
                    {c.icon?.url && (
                      <Image
                        src={c.icon.url}
                        alt={c.icon.alt || c.title}
                        width={32}
                        height={32}
                      />
                    )}
                    <div>
                      <h5 className="font-semibold">{c.title}</h5>
                      <p className="text-gray-600 text-sm">{c.description}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Video */}
              {s.videoUrl && (
                <div className="aspect-video mt-4">
                  <iframe
                    src={s.videoUrl}
                    title={s.title}
                    className="w-full h-full rounded-lg"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Teachers */}
      <div>
        <h3 className="text-2xl font-semibold mb-6">Teacher Services</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {teachers?.map((t, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl shadow-md bg-white flex flex-col gap-4"
            >
              {/* Thumbnail */}
              {t.image?.url && (
                <div className="w-full h-48 relative rounded-lg overflow-hidden">
                  <Image
                    src={t.image.url}
                    alt={t.image.alt || t.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <h4 className="text-xl font-bold">{t.title}</h4>

              {/* Contents */}
              <ul className="flex flex-col gap-3">
                {t.contents?.map((c, j) => (
                  <li key={j} className="flex items-start gap-3">
                    {c.icon?.url && (
                      <Image
                        src={c.icon.url}
                        alt={c.icon.alt || c.title}
                        width={32}
                        height={32}
                      />
                    )}
                    <div>
                      <h5 className="font-semibold">{c.title}</h5>
                      <p className="text-gray-600 text-sm">{c.description}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Video */}
              {t.videoUrl && (
                <div className="aspect-video mt-4">
                  <iframe
                    src={t.videoUrl}
                    title={t.title}
                    className="w-full h-full rounded-lg"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
