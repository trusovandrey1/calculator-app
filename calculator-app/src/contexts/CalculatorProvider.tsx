'use client'

import { useReducer, useCallback, useTransition, type ReactNode } from 'react'
import { CalculatorStateProvider } from './CalculatorStateContext'
import { CalculatorActionsProvider } from './CalculatorActionsContext'
import type { CalculatorState, CalculatorAction, CalculatorActions, OperatorType, ScientificFunction, CalculatorMode, UserPreferences } from '@/types/calculator'
import { calculate, calculateScientific, formatResult, parseExpression } from '@/utils/calculations'
import { generateId } from '@/utils/id'

// Enhanced initial state with modern patterns
const defaultPreferences: UserPreferences = {
  defaultMode: 'scientific',
  theme: 'auto',
  precision: 10,
  soundEnabled: false,
  keyboardShortcuts: true
}

const initialState: CalculatorState = {
  display: '0',
  equation: '',
  waitingForNewValue: false,
  history: [],
  mode: 'scientific',
  preferences: defaultPreferences,
  error: null
}

// Enhanced reducer with better error handling and state management
function calculatorReducer(state: CalculatorState, action: CalculatorAction): CalculatorState {
  try {
    switch (action.type) {
      case 'NUMBER_INPUT': {
        const { digit, append } = action.payload
        if (state.waitingForNewValue || !append) {
          return { ...state, display: digit, waitingForNewValue: false, error: null }
        }
        return { 
          ...state, 
          display: state.display === '0' ? digit : state.display + digit,
          error: null
        }
      }

      case 'OPERATOR_INPUT': {
        const { operator } = action.payload
        const inputValue = parseFloat(state.display)
        
        if (state.equation === '') {
          return {
            ...state,
            equation: inputValue + ' ' + operator + ' ',
            waitingForNewValue: true,
            error: null
          }
        } else {
          const { operand, operator: prevOperator } = parseExpression(state.equation)
          if (prevOperator) {
            const result = calculate(operand, inputValue, prevOperator)
            return {
              ...state,
              display: formatResult(result, state.preferences.precision),
              equation: result + ' ' + operator + ' ',
              waitingForNewValue: true,
              error: null
            }
          }
        }
        return state
      }

      case 'FUNCTION_CALL': {
        const { function: func, value } = action.payload
        const result = calculateScientific(value, func)
        const calculation = `${func}(${value}) = ${formatResult(result, state.preferences.precision)}`
        
        return {
          ...state,
          display: formatResult(result, state.preferences.precision),
          waitingForNewValue: true,
          history: [...state.history, {
            id: generateId(),
            calculation,
            result: formatResult(result, state.preferences.precision),
            timestamp: Date.now(),
            mode: state.mode
          }],
          error: null
        }
      }

      case 'EQUALS_PRESSED': {
        if (state.equation !== '') {
          const { operand, operator } = parseExpression(state.equation)
          if (operator) {
            const secondOperand = parseFloat(state.display)
            const result = calculate(operand, secondOperand, operator)
            const calculation = `${operand} ${operator} ${secondOperand} = ${formatResult(result, state.preferences.precision)}`
            
            return {
              ...state,
              display: formatResult(result, state.preferences.precision),
              equation: '',
              waitingForNewValue: true,
              history: [...state.history, {
                id: generateId(),
                calculation,
                result: formatResult(result, state.preferences.precision),
                timestamp: Date.now(),
                mode: state.mode
              }],
              error: null
            }
          }
        }
        return state
      }

      case 'CLEAR_ALL':
        return { ...state, display: '0', equation: '', waitingForNewValue: false, error: null }

      case 'CLEAR_ENTRY':
        return { ...state, display: '0', error: null }

      case 'DECIMAL_INPUT': {
        if (state.waitingForNewValue) {
          return { ...state, display: '0.', waitingForNewValue: false, error: null }
        } else if (state.display.indexOf('.') === -1) {
          return { ...state, display: state.display + '.', error: null }
        }
        return state
      }

      case 'BACKSPACE': {
        if (state.display.length > 1) {
          return { ...state, display: state.display.slice(0, -1), error: null }
        } else {
          return { ...state, display: '0', error: null }
        }
      }

      case 'MODE_CHANGE': {
        const { mode, preserveState } = action.payload
        return preserveState 
          ? { ...state, mode, error: null }
          : { ...initialState, mode, preferences: state.preferences }
      }

      case 'HISTORY_ACTION': {
        const { action: historyAction } = action.payload
        switch (historyAction) {
          case 'clear':
            return { ...state, history: [], error: null }
          // TODO: Implement undo/redo with history stack
          case 'undo':
          case 'redo':
            return state
          default:
            return state
        }
      }

      case 'SET_PREFERENCES':
        return { 
          ...state, 
          preferences: { ...state.preferences, ...action.payload },
          error: null
        }

      case 'SET_ERROR':
        return { ...state, error: action.payload }

      default:
        return state
    }
  } catch (error) {
    return { 
      ...state, 
      error: error instanceof Error ? error.message : 'Calculation error',
      display: 'Error'
    }
  }
}

interface CalculatorProviderProps {
  children: ReactNode
  initialState?: Partial<CalculatorState>
}

export function CalculatorProvider({ children, initialState: customInitialState }: CalculatorProviderProps) {
  const [state, dispatch] = useReducer(calculatorReducer, {
    ...initialState,
    ...customInitialState
  })
  
  // Use React 19's useTransition for non-urgent updates
  const [isPending, startTransition] = useTransition()

  // Enhanced actions with React 19 patterns
  const actions: CalculatorActions = {
    inputNumber: useCallback((digit: string) => {
      dispatch({ type: 'NUMBER_INPUT', payload: { digit, append: true } })
    }, []),

    inputOperator: useCallback((operator: OperatorType) => {
      startTransition(() => {
        dispatch({ type: 'OPERATOR_INPUT', payload: { operator, precedence: 1 } })
      })
    }, []),

    callFunction: useCallback((func: ScientificFunction) => {
      const value = parseFloat(state.display)
      startTransition(() => {
        dispatch({ type: 'FUNCTION_CALL', payload: { function: func, value } })
      })
    }, [state.display]),

    pressEquals: useCallback(() => {
      startTransition(() => {
        dispatch({ type: 'EQUALS_PRESSED' })
      })
    }, []),

    clearAll: useCallback(() => {
      dispatch({ type: 'CLEAR_ALL' })
    }, []),

    clearEntry: useCallback(() => {
      dispatch({ type: 'CLEAR_ENTRY' })
    }, []),

    inputDecimal: useCallback(() => {
      dispatch({ type: 'DECIMAL_INPUT' })
    }, []),

    backspace: useCallback(() => {
      dispatch({ type: 'BACKSPACE' })
    }, []),

    changeMode: useCallback((mode: CalculatorMode, preserveState = false) => {
      dispatch({ type: 'MODE_CHANGE', payload: { mode, preserveState } })
    }, []),

    clearHistory: useCallback(() => {
      dispatch({ type: 'HISTORY_ACTION', payload: { action: 'clear' } })
    }, []),

    undo: useCallback(() => {
      dispatch({ type: 'HISTORY_ACTION', payload: { action: 'undo' } })
    }, []),

    redo: useCallback(() => {
      dispatch({ type: 'HISTORY_ACTION', payload: { action: 'redo' } })
    }, []),

    updatePreferences: useCallback((preferences: Partial<UserPreferences>) => {
      dispatch({ type: 'SET_PREFERENCES', payload: preferences })
    }, [])
  }

  return (
    <CalculatorStateProvider value={state}>
      <CalculatorActionsProvider value={actions}>
        {children}
      </CalculatorActionsProvider>
    </CalculatorStateProvider>
  )
}