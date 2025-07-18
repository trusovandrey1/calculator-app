# Engineering Calculator

Современный инженерный калькулятор с дизайном Glassmorphism, построенный на Next.js и TypeScript.

## Особенности

- ✨ **Glassmorphism дизайн** - современный стеклянный эффект
- 🧮 **Базовые операции** - сложение, вычитание, умножение, деление
- 🔬 **Инженерные функции** - sin, cos, tan, log, ln, sqrt, x², 1/x, степени
- 📱 **Адаптивный дизайн** - работает на всех устройствах
- ⚡ **TypeScript** - типизированный код для надежности
- 🧪 **Автотесты** - полное покрытие с Playwright

## Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Запуск тестов
npm test
```

## Структура проекта

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # Глобальные стили и Glassmorphism
│   ├── layout.tsx      # Корневой layout
│   └── page.tsx        # Главная страница
└── components/         # React компоненты
    ├── Calculator.tsx  # Основной компонент калькулятора
    ├── Display.tsx     # Компонент дисплея
    └── Button.tsx      # Компонент кнопки
```

## Доступные функции

### Базовые операции
- Сложение (+)
- Вычитание (-)
- Умножение (×)
- Деление (÷)
- Степень (x^y)

### Инженерные функции
- sin, cos, tan (в градусах)
- log (десятичный логарифм)
- ln (натуральный логарифм)
- √ (квадратный корень)
- x² (квадрат)
- 1/x (обратное значение)

### Дополнительно
- Десятичные числа
- Очистка дисплея (C)
- История текущего выражения

## Технологии

- **Next.js 14** - React фреймворк
- **TypeScript** - типизация
- **CSS Modules** - стилизация компонентов
- **Playwright** - автоматизированное тестирование

## Команды

```bash
npm run dev      # Режим разработки
npm run build    # Сборка
npm run start    # Запуск продакшен версии
npm run lint     # Линтинг кода
npm test         # Запуск тестов
npm run test:ui  # Интерактивный режим тестирования
```

## Glassmorphism эффекты

Приложение использует современный дизайн Glassmorphism с:
- Полупрозрачными элементами
- Размытием фона (backdrop-filter)
- Плавными анимациями
- Градиентным фоном
- Тенями и эффектами глубины

## Автор

Создано с помощью Claude Code