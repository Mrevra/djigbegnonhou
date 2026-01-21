import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { Toaster } from '@/components/ui/toaster'
import { LayoutContent } from '@/components/layout-content'

export const metadata: Metadata = {
  title: 'Evra DJIGBEGNONHOU | Software Engineer',
  description: 'Software Engineer specializing in AI, Security & Fintech Systems. Building intelligent systems that turn data into real-world value.',
  keywords: ['Software Engineer', 'AI', 'Machine Learning', 'Cybersecurity', 'Fintech', 'Full Stack Developer'],
  authors: [{ name: 'Evra DJIGBEGNONHOU' }],
  openGraph: {
    title: 'Evra DJIGBEGNONHOU | Software Engineer',
    description: 'Software Engineer specializing in AI, Security & Fintech Systems',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Evra DJIGBEGNONHOU | Software Engineer',
    description: 'Building intelligent systems that turn data into real-world value',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <LayoutContent>
              {children}
            </LayoutContent>
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
