import type { MetadataRoute } from 'next';
import { locales, pageKeys, pathFor } from '@/lib/i18n/config';
import { absolute } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pageKeys) {
    if (page === 'legal' || page === 'privacy') continue;
    for (const locale of locales) {
      entries.push({
        url: absolute(pathFor(page, locale)),
        lastModified: new Date(),
        changeFrequency: page === 'menu' ? 'weekly' : 'monthly',
        priority: page === 'home' ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(locales.map((l) => [l, absolute(pathFor(page, l))])),
        },
      });
    }
  }

  return entries;
}
