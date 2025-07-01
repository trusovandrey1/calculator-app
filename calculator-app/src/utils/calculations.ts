import type { OperatorType, ScientificFunction } from '@/types/calculator'

// Enhanced calculation utilities with better error handling
export function calculate(firstOperand: number, secondOperand: number, operator: OperatorType): number {
  switch (operator) {
    case '+': 
      return firstOperand + secondOperand
    case '-': 
      return firstOperand - secondOperand
    case '*': 
      return firstOperand * secondOperand
    case '/': 
      if (secondOperand === 0) {
        throw new Error('Division by zero')
      }
      return firstOperand / secondOperand
    case '^': 
      return Math.pow(firstOperand, secondOperand)
    default: 
      throw new Error(`Unknown operator: ${operator}`)
  }
}

export function calculateScientific(value: number, func: ScientificFunction): number {
  switch (func) {
    case 'sin': 
      return Math.sin(value * Math.PI / 180)
    case 'cos': 
      return Math.cos(value * Math.PI / 180)
    case 'tan': {
      const result = Math.tan(value * Math.PI / 180)
      if (!isFinite(result)) {
        throw new Error('Undefined result')
      }
      return result
    }
    case 'log': {
      if (value <= 0) {
        throw new Error('Logarithm of non-positive number')
      }
      return Math.log10(value)
    }
    case 'ln': {
      if (value <= 0) {
        throw new Error('Natural logarithm of non-positive number')
      }
      return Math.log(value)
    }
    case 'sqrt': {
      if (value < 0) {
        throw new Error('Square root of negative number')
      }
      return Math.sqrt(value)
    }
    case '1/x': {
      if (value === 0) {
        throw new Error('Division by zero')
      }
      return 1 / value
    }
    case 'x²': 
      return value * value
    default: 
      throw new Error(`Unknown function: ${func}`)
  }
}

export function formatResult(result: number, precision: number = 10): string {
  if (!isFinite(result)) {
    return 'Error'
  }
  
  // Handle very small numbers
  if (Math.abs(result) < Math.pow(10, -precision)) {
    return '0'
  }
  
  // Handle very large numbers
  if (Math.abs(result) > Math.pow(10, precision)) {
    return result.toExponential(6)
  }
  
  // Remove trailing zeros
  return parseFloat(result.toPrecision(precision)).toString()
}

export function parseExpression(expression: string): { operand: number; operator: OperatorType | null } {
  const parts = expression.trim().split(' ')
  const operand = parseFloat(parts[0])
  const operator = parts[1] as OperatorType | undefined
  
  return {
    operand: isNaN(operand) ? 0 : operand,
    operator: operator || null
  }
}