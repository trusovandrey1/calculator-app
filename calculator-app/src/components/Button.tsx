'use client'

import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick: () => void
  className?: string
  colSpan?: number
  rowSpan?: number
}

export default function Button({ children, onClick, className = '', colSpan, rowSpan }: ButtonProps) {
  const gridStyle = {
    ...(colSpan && { gridColumn: `span ${colSpan}` }),
    ...(rowSpan && { gridRow: `span ${rowSpan}` })
  }

  const baseClasses = "glass-button p-4 text-lg font-semibold text-white select-none focus:outline-none focus:ring-2 focus:ring-white/30"
  
  return (
    <button
      className={`${baseClasses} ${className}`}
      onClick={onClick}
      style={gridStyle}
    >
      {children}
    </button>
  )
}