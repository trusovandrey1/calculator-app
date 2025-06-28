from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Union
import uvicorn

app = FastAPI(
    title="Calculator API",
    description="A simple calculator API built with FastAPI",
    version="1.0.0"
)

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CalculationRequest(BaseModel):
    a: float
    b: float
    operation: str

class CalculationResponse(BaseModel):
    result: float
    expression: str
    source: str = "python-api"

@app.get("/")
async def read_root():
    return {
        "message": "Calculator API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/calculate", response_model=CalculationResponse)
async def calculate(request: CalculationRequest):
    """
    Perform mathematical calculations
    
    Supported operations:
    - + (addition)
    - - (subtraction)
    - * or × (multiplication)
    - / or ÷ (division)
    """
    try:
        a, b, operation = request.a, request.b, request.operation
        
        # Validate operation
        valid_operations = ['+', '-', '*', '×', '/', '÷']
        if operation not in valid_operations:
            raise HTTPException(
                status_code=400, 
                detail=f"Invalid operation. Supported operations: {', '.join(valid_operations)}"
            )
        
        # Perform calculation
        result: float
        
        if operation == '+':
            result = a + b
        elif operation == '-':
            result = a - b
        elif operation in ['*', '×']:
            result = a * b
        elif operation in ['/', '÷']:
            if b == 0:
                raise HTTPException(
                    status_code=400,
                    detail="Division by zero is not allowed"
                )
            result = a / b
        
        # Format expression for display
        expression = f"{a} {operation} {b}"
        
        return CalculationResponse(
            result=result,
            expression=expression,
            source="python-api"
        )
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Calculation error: {str(e)}"
        )

@app.get("/operations")
async def get_supported_operations():
    """Get list of supported mathematical operations"""
    return {
        "operations": [
            {"symbol": "+", "name": "addition", "description": "Add two numbers"},
            {"symbol": "-", "name": "subtraction", "description": "Subtract second number from first"},
            {"symbol": "*", "name": "multiplication", "description": "Multiply two numbers"},
            {"symbol": "×", "name": "multiplication", "description": "Multiply two numbers (alternative symbol)"},
            {"symbol": "/", "name": "division", "description": "Divide first number by second"},
            {"symbol": "÷", "name": "division", "description": "Divide first number by second (alternative symbol)"}
        ]
    }

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8000,
        reload=True,
        log_level="info"
    )