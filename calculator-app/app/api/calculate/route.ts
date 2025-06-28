import { NextRequest, NextResponse } from 'next/server'

interface CalculationRequest {
  a: number
  b: number
  operation: string
}

export async function POST(request: NextRequest) {
  try {
    const body: CalculationRequest = await request.json()
    const { a, b, operation } = body

    // Validate input
    if (typeof a !== 'number' || typeof b !== 'number' || typeof operation !== 'string') {
      return NextResponse.json(
        { error: 'Invalid input parameters' },
        { status: 400 }
      )
    }

    // Call Python backend API
    const pythonApiUrl = process.env.PYTHON_API_URL || 'http://127.0.0.1:8000'
    
    try {
      const response = await fetch(`${pythonApiUrl}/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ a, b, operation }),
      })

      if (!response.ok) {
        throw new Error('Python API request failed')
      }

      const result = await response.json()
      return NextResponse.json(result)
      
    } catch (pythonError) {
      console.warn('Python API unavailable, falling back to local calculation:', pythonError)
      
      // Fallback to local calculation if Python API is not available
      let result: number
      
      switch (operation) {
        case '+':
          result = a + b
          break
        case '-':
          result = a - b
          break
        case '×':
        case '*':
          result = a * b
          break
        case '÷':
        case '/':
          if (b === 0) {
            return NextResponse.json(
              { error: 'Division by zero' },
              { status: 400 }
            )
          }
          result = a / b
          break
        default:
          return NextResponse.json(
            { error: 'Invalid operation' },
            { status: 400 }
          )
      }

      return NextResponse.json({
        result,
        source: 'nextjs-fallback'
      })
    }
    
  } catch (error) {
    console.error('Calculation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}