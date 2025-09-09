import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Global = keyof Config['globals']

async function getGlobal<TSlug extends Global>(
  slug: TSlug,
  depth = 0,
): Promise<Config['globals'][TSlug]> {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
  })

  return global as Config['globals'][TSlug]
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = <TSlug extends Global>(slug: TSlug, depth = 0) =>
  unstable_cache(async (): Promise<Config['globals'][TSlug]> => getGlobal(slug, depth), [slug], {
    tags: [`global_${slug}`],
  })
