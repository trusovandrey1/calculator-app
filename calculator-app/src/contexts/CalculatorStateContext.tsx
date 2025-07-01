'use client'

import { createContext, useContext, type ReactNode } from 'react'
import type { CalculatorState } from '@/types/calculator'

// Separate state context for optimized re-renders
export const CalculatorStateContext = createContext<CalculatorState | undefined>(undefined)

export function useCalculatorState() {
  const context = useContext(CalculatorStateContext)
  if (context === undefined) {
    throw new Error('useCalculatorState must be used within a CalculatorProvider')
  }
  return context
}

interface CalculatorStateProviderProps {
  children: ReactNode
  value: CalculatorState
}

export function CalculatorStateProvider({ children, value }: CalculatorStateProviderProps) {
  return (
    <CalculatorStateContext.Provider value={value}>
      {children}
    </CalculatorStateContext.Provider>
  )
}