import Script from 'next/script'; // 1. Import the Script component
import './globals.css';
import Nav from '@/components/Nav';

export const metadata = {
  title: 'Kithnuwan Silva | AV & Broadcast Solutions in Sri Lanka',
  description: 'Expert AV integrator in Colombo, Sri Lanka, specializing in broadcast systems, meeting rooms, video walls, and command centers. 20+ years of experience.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-neutral-950 text-gray-900 dark:text-white">
        <Nav />
        {children}

        {/* 2. Add the Google Analytics scripts here */}
        <Script 
          strategy="afterInteractive" 
          src={`https://www.googletagmanager.com/gtag/js?id=G-E8V36PYVG2`}
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