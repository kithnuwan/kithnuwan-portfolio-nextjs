import Script from 'next/script';
import './globals.css';
import Nav from '@/components/Nav';
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: 'Kithnuwan Silva | Senior AV & Broadcast Systems Consultant',
  description: 'Senior AV & Broadcast Systems Consultant with 18+ years of experience in Audio Visual Integration, Broadcast Technology, Unified Communications, AV over IP, and Smart Building Solutions in Sri Lanka.',
  keywords: 'AV consultant Sri Lanka, broadcast systems, unified communications, AV over IP, Microsoft Teams Rooms, Zoom Rooms, NDI, Anscom Limited',
  openGraph: {
    title: 'Kithnuwan Silva | Senior AV & Broadcast Systems Consultant',
    description: 'Senior AV & Broadcast Systems Consultant — 18+ Years | 500+ Projects | Sri Lanka',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="bg-[#0A192F] text-[#E6F1FF] antialiased overflow-x-hidden">
        <Nav />
        {children}
        <Analytics />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-E8V36PYVG2"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-E8V36PYVG2');
            `,
          }}
        />
      </body>
    </html>
  );
}
