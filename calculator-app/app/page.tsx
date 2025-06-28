'use client'

import { useState } from 'react'

interface CalculationHistory {
  id: number
  expression: string
  result: number
  timestamp: Date
}

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [history, setHistory] = useState<CalculationHistory[]>([])

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = performCalculation(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
      
      // Add to history
      const calculation: CalculationHistory = {
        id: Date.now(),
        expression: `${currentValue} ${operation} ${inputValue}`,
        result: newValue,
        timestamp: new Date()
      }
      setHistory(prev => [calculation, ...prev.slice(0, 9)]) // Keep last 10 calculations
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const performCalculation = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '×':
        return firstValue * secondValue
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0
      default:
        return secondValue
    }
  }

  const calculate = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = performCalculation(previousValue, inputValue, operation)
      
      // Add to history
      const calculation: CalculationHistory = {
        id: Date.now(),
        expression: `${previousValue} ${operation} ${inputValue}`,
        result: newValue,
        timestamp: new Date()
      }
      setHistory(prev => [calculation, ...prev.slice(0, 9)])
      
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const handleServerCalculation = async () => {
    if (!previousValue || !operation) return
    
    try {
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          a: previousValue,
          b: parseFloat(display),
          operation: operation
        }),
      })
      
      if (response.ok) {
        const data = await response.json()
        setDisplay(String(data.result))
        
        const calculation: CalculationHistory = {
          id: Date.now(),
          expression: `${previousValue} ${operation} ${parseFloat(display)} (server)`,
          result: data.result,
          timestamp: new Date()
        }
        setHistory(prev => [calculation, ...prev.slice(0, 9)])
        
        setPreviousValue(null)
        setOperation(null)
        setWaitingForOperand(true)
      }
    } catch (error) {
      console.error('Server calculation failed:', error)
      // Fallback to client calculation
      calculate()
    }
  }

  const Button = ({ 
    onClick, 
    className = '', 
    children, 
    variant = 'default' 
  }: { 
    onClick: () => void
    className?: string
    children: React.ReactNode
    variant?: 'default' | 'operator' | 'special'
  }) => {
    const baseClasses = 'h-16 text-lg font-semibold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95'
    const variantClasses = {
      default: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
      operator: 'bg-blue-500 hover:bg-blue-600 text-white',
      special: 'bg-red-500 hover:bg-red-600 text-white'
    }
    
    return (
      <button
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      >
        {children}
      </button>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Calculator App
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              {/* Display */}
              <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                <div className="text-right text-3xl font-mono text-gray-800 overflow-hidden">
                  {display}
                </div>
                {operation && previousValue !== null && (
                  <div className="text-right text-sm text-gray-500 mt-1">
                    {previousValue} {operation}
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-4 gap-3">
                <Button onClick={clear} variant="special" className="col-span-2">
                  Clear
                </Button>
                <Button onClick={() => {}} variant="operator">
                  ±
                </Button>
                <Button onClick={() => performOperation('÷')} variant="operator">
                  ÷
                </Button>

                <Button onClick={() => inputNumber('7')}>7</Button>
                <Button onClick={() => inputNumber('8')}>8</Button>
                <Button onClick={() => inputNumber('9')}>9</Button>
                <Button onClick={() => performOperation('×')} variant="operator">
                  ×
                </Button>

                <Button onClick={() => inputNumber('4')}>4</Button>
                <Button onClick={() => inputNumber('5')}>5</Button>
                <Button onClick={() => inputNumber('6')}>6</Button>
                <Button onClick={() => performOperation('-')} variant="operator">
                  -
                </Button>

                <Button onClick={() => inputNumber('1')}>1</Button>
                <Button onClick={() => inputNumber('2')}>2</Button>
                <Button onClick={() => inputNumber('3')}>3</Button>
                <Button onClick={() => performOperation('+')} variant="operator">
                  +
                </Button>

                <Button onClick={() => inputNumber('0')} className="col-span-2">
                  0
                </Button>
                <Button onClick={inputDecimal}>.</Button>
                <Button onClick={calculate} variant="operator">
                  =
                </Button>
              </div>

              {/* Server Calculation Button */}
              <div className="mt-4">
                <Button 
                  onClick={handleServerCalculation} 
                  variant="special"
                  className="w-full"
                >
                  Calculate on Server
                </Button>
              </div>
            </div>
          </div>

          {/* History */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">History</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {history.length === 0 ? (
                  <p className="text-gray-500 text-sm">No calculations yet</p>
                ) : (
                  history.map((calc) => (
                    <div key={calc.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-mono text-gray-800">
                        {calc.expression} = {calc.result}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {calc.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
              {history.length > 0 && (
                <button
                  onClick={() => setHistory([])}
                  className="mt-4 w-full text-sm text-red-500 hover:text-red-700"
                >
                  Clear History
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}