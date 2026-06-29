import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://venezuela723975.com'),
  title: {
    default: 'Venezuela 7.2 · 39s · 7.5 — Memorial y Centro de Apoyo',
    template: '%s | venezuela723975.com',
  },
  description: 'Memorial digital y centro de apoyo para las víctimas del doble terremoto de Venezuela. No olvidamos. Honramos. Seguimos unidos.',
  openGraph: {
    type: 'website',
    locale: 'es_VE',
    url: 'https://venezuela723975.com',
    siteName: 'Venezuela 723975 — Memorial',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" dir="ltr">
      <body>{children}</body>
    </html>
  )
}
