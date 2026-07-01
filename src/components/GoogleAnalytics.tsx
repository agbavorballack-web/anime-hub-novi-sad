'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

/**
 * Google Analytics component.
 * The Measurement ID is read from localStorage (set via Admin → Settings)
 * so you never need to touch code to update it.
 *
 * To get your Measurement ID:
 *  1. Go to https://analytics.google.com
 *  2. Create a free account → create a Property → choose "Web"
 *  3. Enter your website URL → copy the ID that looks like G-XXXXXXXXXX
 *  4. Paste it into Admin → Settings → Google Analytics ID
 */
export default function GoogleAnalytics() {
  const [measurementId, setMeasurementId] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('setting_ga_id')
    if (saved && saved.startsWith('G-')) {
      setMeasurementId(saved)
    }
  }, [])

  if (!measurementId) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}
