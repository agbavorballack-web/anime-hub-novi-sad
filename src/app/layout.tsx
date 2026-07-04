import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Anime Hub Novi Sad - Building the Largest Anime Community in Serbia',
  description: 'Join the growing anime community in Serbia! Attend events, get tickets, and connect with fellow anime fans in Novi Sad.',
  metadataBase: new URL('https://animehubns.com'),
  openGraph: {
    title: 'Anime Hub Novi Sad',
    description: 'The largest anime community in Serbia. Events, tickets, and more in Novi Sad.',
    url: 'https://animehubns.com',
    siteName: 'Anime Hub Novi Sad',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anime Hub Novi Sad',
    description: 'The largest anime community in Serbia. Events, tickets, and more in Novi Sad.',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <GoogleAnalytics />
        <LanguageProvider>
          <div className="min-h-screen flex flex-col gradient-bg">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}
