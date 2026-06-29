import type { Metadata } from 'next'
import Script from 'next/script'
import { CookieBanner } from '../components/CookieBanner'
import '../styles/globals.css'



export const metadata: Metadata = {
  metadataBase: new URL('https://venezuela723975.com'),
  title: {
    default: 'Venezuela 7.2 · 39s · 7.5 — Memorial y Centro de Apoyo',
    template: '%s | venezuela723975.com',
  },
  description:
    'Memorial digital y centro de apoyo para las víctimas del doble terremoto de Venezuela. Primer sismo 7.2 — 39 segundos — segundo sismo 7.5. No olvidamos. Honramos. Seguimos unidos.',
  keywords: [
    'terremoto Venezuela', 'sismo Venezuela', '7.2 7.5 Venezuela',
    'doble terremoto Venezuela', 'memorial Venezuela', 'apoyo Venezuela',
    'venezuela723975', 'víctimas terremoto Venezuela',
  ],
  authors: [{ name: 'venezuela723975.com', url: 'https://venezuela723975.com' }],
  creator: 'venezuela723975.com',
  publisher: 'venezuela723975.com',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'es_VE',
    alternateLocale: ['es_ES', 'en_US', 'pt_BR'],
    url: 'https://venezuela723975.com',
    siteName: 'Venezuela 723975 — Memorial',
    title: 'Venezuela 7.2 · 39s · 7.5 — Memorial y Centro de Apoyo',
    description: 'Memorial digital y centro de apoyo para las víctimas del doble terremoto de Venezuela. No olvidamos. Honramos. Seguimos unidos.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Venezuela 723975 — Memorial del doble terremoto',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@venezuela723975',
    creator: '@venezuela723975',
    title: 'Venezuela 7.2 · 39s · 7.5 — Memorial',
    description: 'No olvidamos. Honramos. Seguimos unidos.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://venezuela723975.com',
    languages: {
      'es-VE': 'https://venezuela723975.com',
      'es': 'https://venezuela723975.com',
      'en': 'https://venezuela723975.com/en',
    },
  },
  verification: {
    google: 'PENDIENTE_VERIFICACION_GOOGLE',
  },
  other: {
    'geo.region': 'VE',
    'geo.country': 'Venezuela',
    'geo.placename': 'Venezuela',
    'geo.position': '8.0;-66.0',
    'ICBM': '8.0, -66.0',
  },
}

const GTM_ID = 'GTM-NFJQHTP7'

const jsonLdWebsite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://venezuela723975.com/#website',
  name: 'Venezuela 723975 — Memorial y Centro de Apoyo',
  alternateName: ['Venezuela 7.2 7.5', 'Venezuela723975', 'Doble Terremoto Venezuela'],
  url: 'https://venezuela723975.com/',
  description: 'Memorial digital y centro de apoyo para las personas afectadas por el doble terremoto de Venezuela.',
  inLanguage: ['es-VE', 'es', 'en'],
  publisher: { '@id': 'https://venezuela723975.com/#organization' },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: 'https://venezuela723975.com/buscar?q={search_term_string}' },
    'query-input': 'required name=search_term_string',
  },
}

const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://venezuela723975.com/#organization',
  name: 'Venezuela 723975',
  alternateName: 'Memorial Doble Terremoto Venezuela',
  url: 'https://venezuela723975.com/',
  logo: {
    '@type': 'ImageObject',
    url: 'https://venezuela723975.com/assets/venezuela723975-logo.png',
    width: 1080,
    height: 1080,
  },
  description: 'Plataforma memorial y centro de encuentro y apoyo para las víctimas del doble terremoto de Venezuela.',
  areaServed: { '@type': 'Country', name: 'Venezuela' },
  sameAs: [
    'https://twitter.com/venezuela723975',
    'https://www.instagram.com/venezuela723975',
    'https://www.facebook.com/venezuela723975',
  ],
}

const jsonLdEvent = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  '@id': 'https://venezuela723975.com/#event',
  name: 'Doble Terremoto de Venezuela — 7.2 y 7.5',
  description: 'Secuencia de dos terremotos que afectaron Venezuela. El primer sismo alcanzó una magnitud de 7.2. Treinta y nueve segundos después se produjo el segundo sismo de magnitud 7.5.',
  eventStatus: 'https://schema.org/EventScheduled',
  location: {
    '@type': 'Country',
    name: 'Venezuela',
    address: { '@type': 'PostalAddress', addressCountry: 'VE' },
    geo: { '@type': 'GeoCoordinates', latitude: 8.0, longitude: -66.0 },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" dir="ltr">
      <head>
        {/* Google Tag Manager — cargado solo con consentimiento via CookieBanner */}
        <Script
          id="gtm-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              // GTM se activa desde CookieBanner cuando el usuario acepta
              window.__GTM_ID = '${GTM_ID}';
            `,
          }}
        />
        {/* JSON-LD globales */}
        <Script
          id="jsonld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <Script
          id="jsonld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
        <Script
          id="jsonld-event"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdEvent) }}
        />
      </head>
      <body>
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
