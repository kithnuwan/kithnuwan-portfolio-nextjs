import Script from 'next/script';
import './globals.css';
import Nav from '@/components/Nav';
import FloatingCTA from '@/components/FloatingCTA';
import { Analytics } from "@vercel/analytics/next";

import { SITE_URL, PERSON_ID, DEFAULT_OG_IMAGE } from '@/lib/seo';
import { SOLUTIONS } from '@/lib/solutions';

// Site-wide defaults only. Each route sets its own canonical, title,
// description and Open Graph in its own metadata / generateMetadata.
export const metadata = {
  title: {
    default: 'AV, Meeting Room & Broadcast Solutions in Sri Lanka | Kithnuwan Silva',
    template: '%s | Kithnuwan Silva',
  },
  description: 'Senior AV & Broadcast Systems Consultant in Sri Lanka with 20+ years and 300+ projects: Microsoft Teams & Zoom meeting rooms, boardrooms, video walls, auditoriums, smart classrooms and broadcast studios.',
  keywords: 'AV solutions Sri Lanka, meeting room solutions Sri Lanka, boardroom AV Sri Lanka, Microsoft Teams Rooms Sri Lanka, video conferencing Sri Lanka, broadcast solutions Sri Lanka, video wall Sri Lanka, AV consultant Sri Lanka, AV over IP, Q-SYS, Anscom Limited, Kithnuwan Silva',
  metadataBase: new URL(SITE_URL),
  authors: [{ name: 'Kithnuwan Silva', url: SITE_URL }],
  openGraph: {
    siteName: 'Kithnuwan Silva',
    locale: 'en_US',
    title: 'AV, Meeting Room & Broadcast Solutions in Sri Lanka | Kithnuwan Silva',
    description: 'Senior AV & Broadcast Systems Consultant — 20+ Years | 300+ Projects | Sri Lanka',
    type: 'website',
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Kithnuwan Silva — Senior AV & Broadcast Systems Consultant',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AV, Meeting Room & Broadcast Solutions in Sri Lanka | Kithnuwan Silva',
    description: 'Senior AV & Broadcast Systems Consultant — 20+ Years | 300+ Projects | Sri Lanka',
    images: [DEFAULT_OG_IMAGE],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Kithnuwan Silva',
      description: 'Portfolio, case studies and articles on AV, broadcast and unified communications systems in Sri Lanka.',
      publisher: { '@id': PERSON_ID },
      inLanguage: 'en',
    },
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: 'Kithnuwan Silva',
      url: SITE_URL,
      image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
      jobTitle: 'Head of System Integrations',
      description: 'Senior AV & Broadcast Systems Consultant with 20+ years of experience delivering mission-critical AV, Broadcast, and Unified Communications solutions across Sri Lanka.',
      email: 'mailto:Kithnuwan@gmail.com',
      telephone: '+94777046928',
      worksFor: {
        '@type': 'Organization',
        name: 'Anscom Limited',
        address: { '@type': 'PostalAddress', addressLocality: 'Colombo', addressCountry: 'LK' },
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Colombo',
        addressCountry: 'LK',
      },
      sameAs: ['https://www.linkedin.com/in/kithnuwan-silva-70310310/'],
      hasCredential: [
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: 'BSc (Hons) Computer Networks & Security' },
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'certification', name: 'Cisco Certified Network Associate (CCNA)', recognizedBy: { '@type': 'Organization', name: 'Cisco' } },
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'certification', name: 'Dante Certification Level 2', recognizedBy: { '@type': 'Organization', name: 'Audinate' } },
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'certification', name: 'Biamp Certified', recognizedBy: { '@type': 'Organization', name: 'Biamp Systems' } },
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'certification', name: 'Poly Certified', recognizedBy: { '@type': 'Organization', name: 'Poly (HP)' } },
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'certification', name: 'Kramer Certified Programmer', recognizedBy: { '@type': 'Organization', name: 'Kramer Electronics' } },
        { '@type': 'EducationalOccupationalCredential', credentialCategory: 'certification', name: 'Yealink Certified Expert', recognizedBy: { '@type': 'Organization', name: 'Yealink' } },
      ],
      knowsAbout: [
        'AV over IP',
        'Broadcast Systems',
        'Unified Communications',
        'NDI',
        'Dante Audio Networking',
        'Microsoft Teams Rooms',
        'Zoom Rooms',
        'Q-SYS',
        'Biamp Tesira',
        'Kramer Control',
        'Digital Signage',
        'Video Walls',
        'Video Conferencing',
        'Newsroom Systems',
        'Outside Broadcast',
      ],
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#service`,
      name: 'Kithnuwan Silva — AV & Broadcast Consulting',
      url: SITE_URL,
      image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
      telephone: '+94777046928',
      email: 'Kithnuwan@gmail.com',
      address: { '@type': 'PostalAddress', addressLocality: 'Colombo', addressCountry: 'LK' },
      founder: { '@id': PERSON_ID },
      provider: { '@id': PERSON_ID },
      areaServed: { '@type': 'Country', name: 'Sri Lanka' },
      serviceType: [
        'AV System Design',
        'Broadcast Infrastructure',
        'Unified Communications',
        'AV over IP',
        'Meeting Room Solutions',
        'Video Conferencing',
        'Video Walls',
        'Smart Classrooms',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'AV Solutions',
        itemListElement: SOLUTIONS.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.name, url: `${SITE_URL}/solutions/${s.slug}` },
        })),
      },
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
            __html: `(function(){try{var t=localStorage.getItem('theme')||'signal-blue';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
        <meta name="theme-color" content="#0A1A2F" />
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
