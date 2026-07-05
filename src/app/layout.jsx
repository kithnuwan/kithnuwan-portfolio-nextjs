import Script from 'next/script';
import './globals.css';
import Nav from '@/components/Nav';
import FloatingCTA from '@/components/FloatingCTA';
import { Analytics } from "@vercel/analytics/next";

const SITE_URL = 'https://kithnuwan.com';

export const metadata = {
  title: 'Kithnuwan Silva | Senior AV & Broadcast Systems Consultant',
  description: 'Senior AV & Broadcast Systems Consultant with 20+ years of experience in Audio Visual Integration, Broadcast Technology, Unified Communications, AV over IP, and Smart Building Solutions in Sri Lanka.',
  keywords: 'AV consultant Sri Lanka, broadcast systems, unified communications, AV over IP, Microsoft Teams Rooms, Zoom Rooms, NDI, Dante, Q-SYS, Anscom Limited, Kithnuwan Silva',
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Kithnuwan Silva | Senior AV & Broadcast Systems Consultant',
    description: 'Senior AV & Broadcast Systems Consultant — 20+ Years | 300+ Projects | Sri Lanka',
    type: 'website',
    url: SITE_URL,
    images: [
      {
        url: '/assets/images/hero-portrait.png',
        width: 1200,
        height: 630,
        alt: 'Kithnuwan Silva — Senior AV & Broadcast Systems Consultant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kithnuwan Silva | Senior AV & Broadcast Systems Consultant',
    description: 'Senior AV & Broadcast Systems Consultant — 20+ Years | 300+ Projects | Sri Lanka',
    images: ['/assets/images/hero-portrait.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Kithnuwan Silva',
      jobTitle: 'Head of System Integrations',
      worksFor: {
        '@type': 'Organization',
        name: 'Anscom Limited',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Colombo',
        addressCountry: 'LK',
      },
      url: SITE_URL,
      sameAs: ['https://www.linkedin.com/in/kithnuwan/'],
      knowsAbout: [
        'AV over IP',
        'Broadcast Systems',
        'Unified Communications',
        'NDI',
        'Dante Audio Networking',
        'Microsoft Teams Rooms',
        'Q-SYS',
        'Biamp',
        'Kramer Control',
        'Digital Signage',
        'Video Conferencing',
      ],
      description: 'Senior AV & Broadcast Systems Consultant with 20+ years of experience delivering mission-critical AV, Broadcast, and Unified Communications solutions across Sri Lanka.',
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#service`,
      name: 'Kithnuwan Silva — AV & Broadcast Consulting',
      url: SITE_URL,
      provider: { '@id': `${SITE_URL}/#person` },
      areaServed: { '@type': 'Country', name: 'Sri Lanka' },
      serviceType: [
        'AV System Design',
        'Broadcast Infrastructure',
        'Unified Communications',
        'AV over IP',
        'Meeting Room Solutions',
        'Video Conferencing',
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* No-flash theme script — runs before CSS paints */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme')||'broadcast-dark';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
        <meta name="theme-color" content="#0B1220" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <Nav />
        {children}
        <FloatingCTA />
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
