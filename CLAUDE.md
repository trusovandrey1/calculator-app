# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a modern engineering calculator web application built with the latest technologies for 2025:
- **Next.js 15.3.4** - Latest stable version with App Router
- **React 19.1.0** - Latest React with new concurrent features
- **TypeScript 5.8.3** - Modern TypeScript with strict typing
- **Tailwind CSS 4.1.11** - Latest v4 with separate PostCSS plugin
- Features modern Glassmorphism design and provides both basic arithmetic operations and scientific functions

## Development Commands

```bash
# Development
npm run dev          # Start development server on http://localhost:3000
npm run build        # Production build with React 19 optimizations
npm run start        # Start production server
npm run lint         # Lint code with ESLint 9.30.0

# Testing
npm test             # Run Playwright tests (requires dev server running)
npm run test:ui      # Run tests in interactive UI mode
```

## Modern Architecture (2025 Patterns)

### Routes
- `/` - Home page with project overview and navigation to calculator
- `/calculator` - Calculator application page

### State Management (React 19 Context Pattern)
Modern separated context architecture for optimal performance:

**Contexts:**
- `CalculatorStateContext` - State-only context to prevent unnecessary re-renders
- `CalculatorActionsContext` - Actions-only context for cleaner separation
- `CalculatorProvider` - Main provider combining both contexts

**State Structure:**
```typescript
interface CalculatorState {
  display: string
  equation: string
  waitingForNewValue: boolean
  history: CalculationHistory[]
  mode: 'basic' | 'scientific' | 'programmer'
  preferences: UserPreferences
  error: string | null
}
```

### React 19 Features Used
- **useTransition** - For non-blocking state updates during calculations
- **useDeferredValue** - For optimizing display updates and performance
- **Enhanced useReducer** - With strict TypeScript discriminated unions
- **Improved concurrent rendering** - Better user experience during complex operations

### Component Structure
- **Calculator.tsx** - Main component using separated contexts
- **Display.tsx** - Optimized with useDeferredValue for smooth updates
- **Button.tsx** - Reusable component with glassmorphism effects
- **Custom Hooks:**
  - `useKeyboard.ts` - Enhanced keyboard handling
  - `useCalculatorState()` - State context hook
  - `useCalculatorActions()` - Actions context hook

### File Structure
```
src/
├── types/calculator.ts              # Comprehensive TypeScript types
├── contexts/
│   ├── CalculatorStateContext.tsx   # State-only context
│   ├── CalculatorActionsContext.tsx # Actions-only context
│   └── CalculatorProvider.tsx       # Main provider with useReducer
├── utils/
│   ├── calculations.ts              # Pure calculation functions
│   └── id.ts                        # Cross-platform ID generation
├── hooks/useKeyboard.ts             # Enhanced keyboard support
└── components/                      # React 19 optimized components
```

### Key Features
- **Advanced Operations:** Basic arithmetic, scientific functions, power operations
- **Error Handling:** Comprehensive validation (division by zero, negative logs, etc.)
- **History System:** Complete calculation history with timestamps
- **Keyboard Support:** Full keyboard navigation and input
- **Cross-platform Compatibility:** Works in all environments (fixed crypto.randomUUID issue)
- **Performance Optimized:** Uses React 19 concurrent features

### Styling (Tailwind CSS v4)
- **Modern Glassmorphism:** Custom CSS layers with backdrop-blur effects
- **Color-coded Interface:** Blue (scientific), yellow (operators), gray (numbers), red (clear), green (equals)
- **Responsive Design:** Grid layouts that work on all devices
- **Latest PostCSS Integration:** Uses `@tailwindcss/postcss` plugin

### TypeScript Excellence
- **Strict typing** throughout the application
- **Discriminated unions** for action types
- **Comprehensive interfaces** for all data structures
- **Type-safe error handling**

### Performance Optimizations
- **Separated contexts** prevent unnecessary re-renders
- **useTransition** for smooth UI during calculations
- **useDeferredValue** for display updates
- **Memoized calculations** and pure functions

## Cross-Platform Compatibility

The app includes utilities for cross-platform ID generation (`utils/id.ts`) that gracefully falls back from `crypto.randomUUID()` to alternative methods for older environments.

## Testing

Playwright tests are configured for the modern architecture and target the `/calculator` route. Tests validate both UI interactions and keyboard input functionality.

## Build Configuration

- **PostCSS:** Uses `@tailwindcss/postcss` for Tailwind v4 compatibility
- **TypeScript:** ES2017 target for modern feature support
- **ESLint:** Configured for React 19 and Next.js 15 best practices

This is a state-of-the-art React application using 2025's best practices and latest stable technologies.