'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { CalculatorActions } from '@/types/calculator'

// Separate actions context for better performance
export const CalculatorActionsContext = createContext<CalculatorActions | undefined>(undefined)

export function useCalculatorActions() {
  const context = useContext(CalculatorActionsContext)
  if (context === undefined) {
    throw new Error('useCalculatorActions must be used within a CalculatorProvider')
  }
  return context
}

interface CalculatorActionsProviderProps {
  children: ReactNode
  value: CalculatorActions
}

export function CalculatorActionsProvider({ children, value }: CalculatorActionsProviderProps) {
  return (
    <CalculatorActionsContext.Provider value={value}>
      {children}
    </CalculatorActionsContext.Provider>
  )
}