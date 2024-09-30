import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import "./globals.css"
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Accorciatore URL | Trasforma i tuoi link lunghi',
  description: 'Accorcia facilmente i tuoi URL lunghi con il nostro strumento gratuito. Crea link corti e gestibili in pochi secondi.',
  keywords: 'accorciatore url, link corti, url shortener, shorten links',
  openGraph: {
    title: 'Accorciatore URL | Trasforma i tuoi link lunghi',
    description: 'Accorcia facilmente i tuoi URL lunghi con il nostro strumento gratuito. Crea link corti e gestibili in pochi secondi.',
    siteName: 'Accorciatore URL',
    locale: 'it_IT',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accorciatore URL | Trasforma i tuoi link lunghi',
    description: 'Accorcia facilmente i tuoi URL lunghi con il nostro strumento gratuito. Crea link corti e gestibili in pochi secondi.',
    images: ['https://tuo-dominio.com/twitter-image.jpg'],
  },
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
