'use client'

import Display from './Display'
import Button from './Button'
import { useCalculatorActions } from '@/contexts/CalculatorActionsContext'
import { useKeyboard } from '@/hooks/useKeyboard'
import type { ScientificFunction } from '@/types/calculator'

export default function Calculator() {
  const {
    inputNumber,
    inputOperator,
    pressEquals,
    callFunction,
    clearAll,
    inputDecimal
  } = useCalculatorActions()
  
  // Enable keyboard support
  useKeyboard()

  const handleScientific = (func: ScientificFunction) => {
    callFunction(func)
  }

  return (
    <div className="glass max-w-md mx-auto p-6">
      <Display />
      
      <div className="grid grid-cols-4 gap-3">
        {/* Scientific functions row 1 */}
        <Button onClick={() => handleScientific('sin')} className="bg-blue-500/30 hover:bg-blue-500/50">
          sin
        </Button>
        <Button onClick={() => handleScientific('cos')} className="bg-blue-500/30 hover:bg-blue-500/50">
          cos
        </Button>
        <Button onClick={() => handleScientific('tan')} className="bg-blue-500/30 hover:bg-blue-500/50">
          tan
        </Button>
        <Button onClick={() => inputOperator('^')} className="bg-yellow-500/30 hover:bg-yellow-500/50">
          x^y
        </Button>
        
        {/* Scientific functions row 2 */}
        <Button onClick={() => handleScientific('log')} className="bg-blue-500/30 hover:bg-blue-500/50">
          log
        </Button>
        <Button onClick={() => handleScientific('ln')} className="bg-blue-500/30 hover:bg-blue-500/50">
          ln
        </Button>
        <Button onClick={() => handleScientific('sqrt')} className="bg-blue-500/30 hover:bg-blue-500/50">
          √
        </Button>
        <Button onClick={() => handleScientific('x²')} className="bg-blue-500/30 hover:bg-blue-500/50">
          x²
        </Button>
        
        {/* Clear and operations */}
        <Button onClick={clearAll} className="bg-red-500/30 hover:bg-red-500/50">
          C
        </Button>
        <Button onClick={() => handleScientific('1/x')} className="bg-blue-500/30 hover:bg-blue-500/50">
          1/x
        </Button>
        <Button onClick={() => inputOperator('/')} className="bg-yellow-500/30 hover:bg-yellow-500/50">
          ÷
        </Button>
        <Button onClick={() => inputOperator('*')} className="bg-yellow-500/30 hover:bg-yellow-500/50">
          ×
        </Button>
        
        {/* Numbers and operations */}
        <Button onClick={() => inputNumber('7')} className="bg-gray-500/30 hover:bg-gray-500/50">
          7
        </Button>
        <Button onClick={() => inputNumber('8')} className="bg-gray-500/30 hover:bg-gray-500/50">
          8
        </Button>
        <Button onClick={() => inputNumber('9')} className="bg-gray-500/30 hover:bg-gray-500/50">
          9
        </Button>
        <Button onClick={() => inputOperator('-')} className="bg-yellow-500/30 hover:bg-yellow-500/50">
          -
        </Button>
        
        <Button onClick={() => inputNumber('4')} className="bg-gray-500/30 hover:bg-gray-500/50">
          4
        </Button>
        <Button onClick={() => inputNumber('5')} className="bg-gray-500/30 hover:bg-gray-500/50">
          5
        </Button>
        <Button onClick={() => inputNumber('6')} className="bg-gray-500/30 hover:bg-gray-500/50">
          6
        </Button>
        <Button onClick={() => inputOperator('+')} className="bg-yellow-500/30 hover:bg-yellow-500/50">
          +
        </Button>
        
        <Button onClick={() => inputNumber('1')} className="bg-gray-500/30 hover:bg-gray-500/50">
          1
        </Button>
        <Button onClick={() => inputNumber('2')} className="bg-gray-500/30 hover:bg-gray-500/50">
          2
        </Button>
        <Button onClick={() => inputNumber('3')} className="bg-gray-500/30 hover:bg-gray-500/50">
          3
        </Button>
        <Button onClick={pressEquals} className="bg-green-500/30 hover:bg-green-500/50" rowSpan={2}>
          =
        </Button>
        
        <Button onClick={() => inputNumber('0')} className="bg-gray-500/30 hover:bg-gray-500/50" colSpan={2}>
          0
        </Button>
        <Button onClick={inputDecimal} className="bg-gray-500/30 hover:bg-gray-500/50">
          .
        </Button>
      </div>
    </div>
  )
}