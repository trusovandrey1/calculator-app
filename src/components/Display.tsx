'use client'

import { useDeferredValue } from 'react'
import { useCalculatorState } from '@/contexts/CalculatorStateContext'

export default function Display() {
  const { display, equation, error } = useCalculatorState()
  
  // Use React 19's useDeferredValue for better performance
  const deferredDisplay = useDeferredValue(display)
  const deferredEquation = useDeferredValue(equation)

  return (
    <div className="glass-display p-6 mb-6">
      <div className="text-right">
        <div className="text-sm text-white/70 mb-2 h-6">
          {deferredEquation}
        </div>
        <div className={`text-3xl font-bold font-mono transition-colors duration-200 ${
          error ? 'text-red-300' : 'text-white'
        }`}>
          {error || deferredDisplay}
        </div>
        {error && (
          <div className="text-xs text-red-400 mt-1">
            {error}
          </div>
        )}
      </div>
    </div>
  )
}