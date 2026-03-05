import type { Metadata } from 'next'
import './styles/globals.css'

export const metadata: Metadata = {
  title: 'ComradeFit AI - Smart Fitness Tracker',
  description: 'Production-level fitness tracking for students with AI coaching.',
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <main className="max-w-md mx-auto min-h-screen shadow-2xl bg-white dark:bg-slate-950">
          {children}
        </main>
      </body>
    </html>
  )
}
