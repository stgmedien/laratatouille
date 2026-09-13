import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Das Karten-PDF entsteht mit react-pdf im Node-Prozess; der Bundler soll das
  // Paket in Ruhe lassen und die Schriften und das Logo mit auf den Server nehmen.
  serverExternalPackages: ['@react-pdf/renderer'],
  outputFileTracingIncludes: {
    '/admin/druck/**': [
      './src/lib/print/fonts/*.ttf',
      './public/images/logo.png',
      // pdfkit lädt seine Standardschriften per dynamischem require — das
      // sieht der Tracer nicht, ohne sie stirbt die Funktion auf Vercel.
      './node_modules/pdfkit/js/standard-fonts/**',
    ],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 82],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
