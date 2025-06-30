import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Engineering Calculator',
  description: 'Advanced scientific calculator with glassmorphism design',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}