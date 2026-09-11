import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { AnimatedNetwork } from '@/components/animated-network'
import { ToastProvider } from '@/components/toast'
import { ScrollToTop } from '@/components/scroll-to-top'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: {
    template: '%s | HackFest 2026',
    default: 'HackFest 2026 — Build. Break. Innovate.',
  },
  description:
    'A 2-day hybrid hackathon for students, developers, designers, and innovators at Information Technology department, Gauhati University. 13–14 September 2026.',
  keywords: [
    'hackathon',
    'HackFest 2026',
    'Guwahati hackathon',
    'hybrid hackathon',
    'AI hackathon',
    'coding competition',
  ],
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#070b17',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="antialiased bg-background text-foreground font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
        <ToastProvider>
          <AnimatedNetwork />
          <div className="site-layout">
            <Navbar />
            <div className="main-content-area">{children}</div>
            <Footer />
          </div>
          <ScrollToTop />
        </ToastProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
