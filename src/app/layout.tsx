// ComradeFit AI - Production v1.0.1
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
      <body className="antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <main className="min-h-screen bg-transparent">
          {children}
        </main>
      </body>
    </html>
  )
}
