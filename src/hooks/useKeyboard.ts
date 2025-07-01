'use client'

import { useEffect, useCallback } from 'react'
import { useCalculatorActions } from '@/contexts/CalculatorActionsContext'
import type { OperatorType } from '@/types/calculator'

// Enhanced keyboard hook with React 19 patterns
export function useKeyboard() {
  const {
    inputNumber,
    inputDecimal,
    inputOperator,
    pressEquals,
    clearAll,
    backspace
  } = useCalculatorActions()

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Don't interfere with form inputs
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement ||
      event.target instanceof HTMLSelectElement
    ) {
      return
    }

    // Don't interfere with modifier key combinations
    if (event.ctrlKey || event.metaKey || event.altKey) {
      return
    }

    event.preventDefault()
    
    const key = event.key.toLowerCase()
    
    // Number input
    if (key >= '0' && key <= '9') {
      inputNumber(key)
      return
    }

    // Decimal point
    if (key === '.' || key === ',') {
      inputDecimal()
      return
    }

    // Basic operators
    const operatorMap: Record<string, OperatorType> = {
      '+': '+',
      '-': '-',
      '*': '*',
      'x': '*',
      '/': '/',
      '^': '^'
    }

    if (key in operatorMap) {
      inputOperator(operatorMap[key])
      return
    }

    // Special keys
    switch (key) {
      case 'enter':
      case '=':
        pressEquals()
        break
      case 'escape':
      case 'c':
        clearAll()
        break
      case 'backspace':
      case 'delete':
        backspace()
        break
    }
  }, [
    inputNumber,
    inputDecimal,
    inputOperator,
    pressEquals,
    clearAll,
    backspace
  ])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  // Return keyboard state for UI feedback
  return {
    isKeyboardEnabled: true
  }
}