import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          Engineering Calculator
        </h1>
        <p className="text-lg text-white/80 mb-8">
          Современный инженерный калькулятор с дизайном Glassmorphism
        </p>
        
        <div className="space-y-4">
          <Link 
            href="/calculator" 
            className="glass-button inline-block px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-500/30 to-purple-500/30 hover:from-blue-500/50 hover:to-purple-500/50 transition-all duration-300"
          >
            Открыть калькулятор
          </Link>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-3 text-blue-200">Базовые операции</h3>
              <ul className="text-white/70 space-y-1">
                <li>• Сложение, вычитание, умножение, деление</li>
                <li>• Степень (x^y)</li>
                <li>• Десятичные числа</li>
              </ul>
            </div>
            
            <div className="glass p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-3 text-purple-200">Инженерные функции</h3>
              <ul className="text-white/70 space-y-1">
                <li>• Тригонометрия (sin, cos, tan)</li>
                <li>• Логарифмы (log, ln)</li>
                <li>• Корни и степени (√, x²)</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-4 glass rounded-2xl">
            <h3 className="text-lg font-semibold mb-2 text-green-200">Управление с клавиатуры</h3>
            <p className="text-white/70 text-sm">
              Используйте цифры, операторы (+, -, *, /), Enter для вычисления, Escape для очистки
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}