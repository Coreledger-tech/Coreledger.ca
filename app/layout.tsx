import type { Metadata } from 'next'
import { Inter, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

const siteUrl = 'https://coreledger.ca'          // when you switch domains, change here
const ogImage = `${siteUrl}/og-coreledger.png`   // 1200×630; add this asset

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Coreledger Technologies — Build smarter AI, not bigger bills',
    template: '%s · Coreledger Technologies'
  },
  description:
    'Coreledger Technologies is a developer-first studio building intelligent software infrastructure. Our flagship, Contextus, trims and prioritizes LLM context so teams cut costs and boost accuracy—on cloud or self-hosted.',
  keywords: [
    'Coreledger', 'Contextus', 'context engineering', 'LLM context',
    'AI tooling', 'RAG', 'vector search', 'developer infrastructure',
    'self-hosted LLM', 'AI cost optimization'
  ],
  authors: [
    { name: 'Coreledger Technologies', url: 'https://www.linkedin.com/company/core-ledger-technology' },
    { name: 'Kelvin Musodza', url: 'https://www.linkedin.com/in/kelvin-musodza/' }
  ],
  openGraph: {
    title: 'Coreledger Technologies — Build smarter AI, not bigger bills',
    description:
      'We build developer tools that make AI faster, cheaper, and more reliable. Contextus trims LLM context to save up to 40%—and even more alongside RAG in enterprise.',
    url: siteUrl,
    siteName: 'Coreledger Technologies',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Coreledger hero' }],
    locale: 'en_CA',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    site: '@Coreledger_tech',
    creator: '@Coreledger_tech',
    title: 'Coreledger Technologies — Build smarter AI, not bigger bills',
    description:
      'Contextus by Coreledger trims LLM context so teams cut costs up to 40% while improving accuracy. Enterprise-ready for self-hosted AI.',
    images: [ogImage]
  },
  alternates: {
    canonical: siteUrl
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png'
  },
  verification: {
    // Replace if you verify the root domain
    google: 'gfiUv1zVQuGJ_6aMJGIqzXjkt9tWxVMtaIYnAMLbgsQ'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className={`${inter.className} min-h-screen bg-white`}>
        {/* Organization / Product / Podcast structured data */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'Coreledger Technologies',
                url: siteUrl,
                logo: `${siteUrl}/logo-mark.png`,
                sameAs: [
                  'https://www.linkedin.com/company/core-ledger-technology/',
                  'https://x.com/Coreledger_tech',
                  'https://github.com/Coreledger-tech',
                  'https://medium.com/@coreledger_tech',
                  'https://open.spotify.com/show/1OeoH2DuTz6ovJAKqvUqGy',
                  'https://podcasts.apple.com/ca/podcast/coreledger-tech/id1832790756',
                  'https://www.facebook.com/people/Coreledger-Technologies/61563241262398/'
                ]
              },
              {
                '@context': 'https://schema.org',
                '@type': 'SoftwareApplication',
                name: 'Contextus',
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'Web',
                url: 'https://contextus.coreledger.ca/',
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'USD',
                  description: 'Private alpha / waitlist'
                },
                publisher: { '@type': 'Organization', name: 'Coreledger Technologies', url: siteUrl },
                description:
                  'Contextus trims, ranks, and structures LLM context to cut costs up to 40% while improving accuracy. Enterprise-ready for self-hosted AI.'
              },
              {
                '@context': 'https://schema.org',
                '@type': 'PodcastSeries',
                name: 'Coreledger Tech',
                url: `${siteUrl}/podcast`,
                inLanguage: 'en-CA',
                publisher: { '@type': 'Organization', name: 'Coreledger Technologies', url: siteUrl }
              }
            ])
          }}
        />
        <Navigation />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
