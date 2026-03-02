import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { AuthProvider } from '@/contexts/AuthContext'

export const metadata: Metadata = {
  title: 'emigrant.ge',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ka">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" />
      </head>
      <body>
        {/* AuthProvider wraps Providers so auth state is available to all client components */}
        <Providers>
          <AuthProvider>
            {children}
          </AuthProvider>
        </Providers>
      </body>
    </html>
  )
}
