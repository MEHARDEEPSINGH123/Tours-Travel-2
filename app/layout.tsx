import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TripNest Singapore | Premier Travel & Tours Marketplace',
  description:
    'Curated luxury and experiential travel across Asia, Europe, and beyond. Handcrafted packages, 5-star hotels, bespoke itineraries, fast-track visa services, and 24/7 Singapore concierge.',
  keywords: [
    'Singapore Travel Marketplace',
    'Luxury Tour Packages',
    'Asia Travel',
    'Custom Itineraries',
    'Singapore Airlines Tours',
    'TripNest Singapore',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <body className="antialiased bg-[#F8FAFC] text-[#0F172A] selection:bg-[#2563EB] selection:text-white">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
