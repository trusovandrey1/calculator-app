'use client'

import { useState } from 'react'
import Display from './Display'
import Button from './Button'
import styles from './Calculator.module.css'

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [equation, setEquation] = useState('')
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)

  const calculate = (firstOperand: number, secondOperand: number, operator: string): number => {
    switch (operator) {
      case '+': return firstOperand + secondOperand
      case '-': return firstOperand - secondOperand
      case '*': return firstOperand * secondOperand
      case '/': return firstOperand / secondOperand
      case '^': return Math.pow(firstOperand, secondOperand)
      default: return secondOperand
    }
  }

  const handleNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num)
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? num : display + num)
    }
  }

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display)

    if (equation === '') {
      setEquation(inputValue + ' ' + nextOperator + ' ')
    } else {
      const parts = equation.split(' ')
      const firstOperand = parseFloat(parts[0])
      const operator = parts[1]
      
      const result = calculate(firstOperand, inputValue, operator)
      setDisplay(String(result))
      setEquation(result + ' ' + nextOperator + ' ')
    }
    
    setWaitingForNewValue(true)
  }

  const handleEquals = () => {
    if (equation !== '') {
      const parts = equation.split(' ')
      const firstOperand = parseFloat(parts[0])
      const operator = parts[1]
      const secondOperand = parseFloat(display)
      
      const result = calculate(firstOperand, secondOperand, operator)
      setDisplay(String(result))
      setEquation('')
      setWaitingForNewValue(true)
    }
  }

  const handleScientific = (func: string) => {
    const value = parseFloat(display)
    let result: number

    switch (func) {
      case 'sin': result = Math.sin(value * Math.PI / 180); break
      case 'cos': result = Math.cos(value * Math.PI / 180); break
      case 'tan': result = Math.tan(value * Math.PI / 180); break
      case 'log': result = Math.log10(value); break
      case 'ln': result = Math.log(value); break
      case 'sqrt': result = Math.sqrt(value); break
      case '1/x': result = 1 / value; break
      case 'x²': result = value * value; break
      default: result = value
    }

    setDisplay(String(result))
    setWaitingForNewValue(true)
  }

  const handleClear = () => {
    setDisplay('0')
    setEquation('')
    setWaitingForNewValue(false)
  }

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.')
      setWaitingForNewValue(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  return (
    <div className={`${styles.calculator} glass`}>
      <Display value={display} equation={equation} />
      
      <div className={styles.buttonGrid}>
        {/* Scientific functions row 1 */}
        <Button onClick={() => handleScientific('sin')} className={styles.scientific}>sin</Button>
        <Button onClick={() => handleScientific('cos')} className={styles.scientific}>cos</Button>
        <Button onClick={() => handleScientific('tan')} className={styles.scientific}>tan</Button>
        <Button onClick={() => handleOperator('^')} className={styles.operator}>x^y</Button>
        
        {/* Scientific functions row 2 */}
        <Button onClick={() => handleScientific('log')} className={styles.scientific}>log</Button>
        <Button onClick={() => handleScientific('ln')} className={styles.scientific}>ln</Button>
        <Button onClick={() => handleScientific('sqrt')} className={styles.scientific}>√</Button>
        <Button onClick={() => handleScientific('x²')} className={styles.scientific}>x²</Button>
        
        {/* Clear and operations */}
        <Button onClick={handleClear} className={styles.clear}>C</Button>
        <Button onClick={() => handleScientific('1/x')} className={styles.scientific}>1/x</Button>
        <Button onClick={() => handleOperator('/')} className={styles.operator}>÷</Button>
        <Button onClick={() => handleOperator('*')} className={styles.operator}>×</Button>
        
        {/* Numbers and operations */}
        <Button onClick={() => handleNumber('7')} className={styles.number}>7</Button>
        <Button onClick={() => handleNumber('8')} className={styles.number}>8</Button>
        <Button onClick={() => handleNumber('9')} className={styles.number}>9</Button>
        <Button onClick={() => handleOperator('-')} className={styles.operator}>-</Button>
        
        <Button onClick={() => handleNumber('4')} className={styles.number}>4</Button>
        <Button onClick={() => handleNumber('5')} className={styles.number}>5</Button>
        <Button onClick={() => handleNumber('6')} className={styles.number}>6</Button>
        <Button onClick={() => handleOperator('+')} className={styles.operator}>+</Button>
        
        <Button onClick={() => handleNumber('1')} className={styles.number}>1</Button>
        <Button onClick={() => handleNumber('2')} className={styles.number}>2</Button>
        <Button onClick={() => handleNumber('3')} className={styles.number}>3</Button>
        <Button onClick={handleEquals} className={styles.equals} rowSpan={2}>=</Button>
        
        <Button onClick={() => handleNumber('0')} className={styles.number} colSpan={2}>0</Button>
        <Button onClick={handleDecimal} className={styles.number}>.</Button>
      </div>
    </div>
  )
}