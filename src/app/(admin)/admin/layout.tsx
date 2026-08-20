import type { Metadata, Viewport } from 'next';
import { Marcellus, Public_Sans } from 'next/font/google';
import '@/app/globals.css';

const marcellus = Marcellus({ subsets: ['latin'], weight: '400', display: 'swap', variable: '--font-marcellus' });
const publicSans = Public_Sans({
  subsets: ['latin'], weight: ['300', '400', '500', '600'], display: 'swap', variable: '--font-public-sans',
});

export const metadata: Metadata = {
  title: 'Verwaltung — La Ratatouille',
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: '#17251C', width: 'device-width', initialScale: 1 };

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${marcellus.variable} ${publicSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
