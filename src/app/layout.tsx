import type { Metadata } from 'next'
import './globals.css'
import { CalculatorProvider } from '@/contexts/CalculatorProvider'

export const metadata: Metadata = {
  title: 'Engineering Calculator',
  description: 'Advanced scientific calculator with glassmorphism design built with React 19',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>
        <CalculatorProvider>
          {children}
        </CalculatorProvider>
      </body>
    </html>
  )
}