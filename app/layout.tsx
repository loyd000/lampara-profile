import type { Metadata, Viewport } from 'next';
import { Lexend } from 'next/font/google';
import './globals.css';

const sans = Lexend({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-lexend', display: 'swap' });

export const metadata: Metadata = {
  title: 'LAMPARA | Electrical Installation Services',
  description: 'LAMPARA Electrical Installation Services: solar and electrical design, installation and after-sales for homes, businesses and utility-scale sites across the Philippines, since 2019.',
  icons: {
    icon: [
      { url: '/assets/brand/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/brand/favicon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/assets/brand/favicon-192.png',
  },
};

export const viewport: Viewport = { themeColor: '#070c18' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sans.variable}>
      <body>{children}</body>
    </html>
  );
}
