// Enhanced TypeScript types following 2025 patterns
export type OperatorType = '+' | '-' | '*' | '/' | '^'
export type ScientificFunction = 'sin' | 'cos' | 'tan' | 'log' | 'ln' | 'sqrt' | '1/x' | 'x²'
export type CalculatorMode = 'basic' | 'scientific' | 'programmer'
export type ThemeMode = 'light' | 'dark' | 'auto'

export interface CalculationHistory {
  id: string
  calculation: string
  result: string
  timestamp: number
  mode: CalculatorMode
}

export interface UserPreferences {
  defaultMode: CalculatorMode
  theme: ThemeMode
  precision: number
  soundEnabled: boolean
  keyboardShortcuts: boolean
}

export interface CalculatorState {
  display: string
  equation: string
  waitingForNewValue: boolean
  history: CalculationHistory[]
  mode: CalculatorMode
  preferences: UserPreferences
  error: string | null
}

// Enhanced action types with discriminated unions
export type CalculatorAction =
  | { type: 'NUMBER_INPUT'; payload: { digit: string; append: boolean } }
  | { type: 'OPERATOR_INPUT'; payload: { operator: OperatorType; precedence: number } }
  | { type: 'FUNCTION_CALL'; payload: { function: ScientificFunction; value: number } }
  | { type: 'EQUALS_PRESSED' }
  | { type: 'CLEAR_ALL' }
  | { type: 'CLEAR_ENTRY' }
  | { type: 'DECIMAL_INPUT' }
  | { type: 'BACKSPACE' }
  | { type: 'MODE_CHANGE'; payload: { mode: CalculatorMode; preserveState: boolean } }
  | { type: 'HISTORY_ACTION'; payload: { action: 'clear' | 'undo' | 'redo' } }
  | { type: 'SET_PREFERENCES'; payload: Partial<UserPreferences> }
  | { type: 'SET_ERROR'; payload: string | null }

export interface CalculatorActions {
  inputNumber: (digit: string) => void
  inputOperator: (operator: OperatorType) => void
  callFunction: (func: ScientificFunction) => void
  pressEquals: () => void
  clearAll: () => void
  clearEntry: () => void
  inputDecimal: () => void
  backspace: () => void
  changeMode: (mode: CalculatorMode, preserveState?: boolean) => void
  clearHistory: () => void
  undo: () => void
  redo: () => void
  updatePreferences: (preferences: Partial<UserPreferences>) => void
}