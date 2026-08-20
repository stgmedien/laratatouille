import type { MetadataRoute } from 'next';
import { absolute, siteUrl } from '@/lib/seo';

/**
 * Search engines are only invited in once the site runs on its own domain.
 * As long as it is served from a *.vercel.app address, that is a staging URL —
 * indexing it would put a second copy of the restaurant into Google, competing
 * with the real one. Set NEXT_PUBLIC_SITE_URL to the live domain to open up.
 */
export default function robots(): MetadataRoute.Robots {
  const isStaging = new URL(siteUrl()).hostname.endsWith('.vercel.app');

  if (isStaging) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api'] }],
    sitemap: absolute('/sitemap.xml'),
  };
}
