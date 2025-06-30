import { ReactNode } from 'react'
import styles from './Button.module.css'

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

  return (
    <button
      className={`${styles.button} glass-button ${className}`}
      onClick={onClick}
      style={gridStyle}
    >
      {children}
    </button>
  )
}