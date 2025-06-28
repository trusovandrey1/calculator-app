# Calculator App

Современный калькулятор с архитектурой Next.js frontend + Python FastAPI backend, созданный с использованием Context7 для получения актуальной документации.

## 🏗 Архитектура

### Frontend (Next.js)
- **Framework**: Next.js 15 с App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Features**: 
  - Адаптивный дизайн
  - История вычислений
  - Клиентские и серверные вычисления
  - Fallback механизм

### Backend (Python FastAPI)
- **Framework**: FastAPI
- **Language**: Python
- **Features**:
  - REST API эндпоинты
  - Автоматическая документация (Swagger)
  - CORS поддержка
  - Валидация данных с Pydantic

## 🚀 Быстрый запуск

### Установка зависимостей

**Frontend:**
```bash
cd calculator-app
npm install
```

**Backend:**
```bash
cd api
pip install -r requirements.txt
```

### Запуск приложения

1. **Запуск Python API (Terminal 1):**
```bash
cd api
python main.py
# API будет доступно на http://127.0.0.1:8000
```

2. **Запуск Next.js frontend (Terminal 2):**
```bash
cd calculator-app
npm run dev
# Приложение будет доступно на http://localhost:3000
```

## 📱 Функционал

### Основные возможности:
- ✅ Базовые математические операции (+, -, ×, ÷)
- ✅ Клиентские вычисления (JavaScript)
- ✅ Серверные вычисления (Python API)
- ✅ История операций (последние 10)
- ✅ Адаптивный дизайн
- ✅ Fallback механизм (если API недоступно)

### UI/UX особенности:
- Современный дизайн с градиентами
- Анимации при нажатии кнопок
- Responsive layout (desktop/mobile)
- История вычислений в реальном времени
- Отображение текущей операции

## 🔌 API Эндпоинты

### Python FastAPI Backend

**Base URL**: `http://127.0.0.1:8000`

#### Основные эндпоинты:

```http
GET /
# Информация об API

GET /health
# Проверка состояния API

POST /calculate
Content-Type: application/json
{
  "a": 10,
  "b": 5,
  "operation": "+"
}
# Выполнение вычислений

GET /operations
# Список поддерживаемых операций
```

#### Пример запроса:
```bash
curl -X POST "http://127.0.0.1:8000/calculate" \
     -H "Content-Type: application/json" \
     -d '{"a": 10, "b": 5, "operation": "+"}'
```

#### Пример ответа:
```json
{
  "result": 15.0,
  "expression": "10.0 + 5.0",
  "source": "python-api"
}
```

### Next.js API Routes

**Base URL**: `http://localhost:3000`

```http
POST /api/calculate
# Прокси для Python API с fallback логикой
```

## 📂 Структура проекта

```
.
├── calculator-app/          # Next.js Frontend
│   ├── app/
│   │   ├── api/calculate/
│   │   │   └── route.ts    # API прокси
│   │   ├── globals.css     # Global стили
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Главная страница калькулятора
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── next.config.js
│
├── api/                    # Python Backend
│   ├── main.py            # FastAPI приложение
│   └── requirements.txt   # Python зависимости
│
└── README.md
```

## 🛠 Технологии

### Frontend Stack:
- **Next.js 15** - React framework с App Router
- **TypeScript** - Типизированный JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - State management

### Backend Stack:
- **FastAPI** - Современный Python web framework
- **Pydantic** - Валидация данных
- **Uvicorn** - ASGI сервер
- **CORS Middleware** - Cross-origin requests

### DevTools:
- **Context7** - Получение актуальной документации
- **ESLint** - Линтинг кода
- **PostCSS** - CSS обработка

## 🔧 Конфигурация

### Environment Variables (опционально):

**calculator-app/.env.local:**
```env
PYTHON_API_URL=http://127.0.0.1:8000
```

### CORS настройки:
Backend настроен для работы с frontend на портах 3000 и 3001.

## 🧪 Тестирование

### Тестирование API:
```bash
# Проверка состояния
curl http://127.0.0.1:8000/health

# Тестовое вычисление
curl -X POST http://127.0.0.1:8000/calculate \
  -H "Content-Type: application/json" \
  -d '{"a": 15, "b": 3, "operation": "÷"}'
```

### Автоматическая документация:
- **Swagger UI**: http://127.0.0.1:8000/docs
- **ReDoc**: http://127.0.0.1:8000/redoc

## 🚀 Продакшн

### Сборка для продакшна:

**Frontend:**
```bash
cd calculator-app
npm run build
npm start
```

**Backend:**
```bash
cd api
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Docker (опционально):

**Backend Dockerfile:**
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 🔮 Возможные улучшения

- [ ] Добавить научные функции (sin, cos, log, etc.)
- [ ] Реализовать сохранение истории в базе данных
- [ ] Добавить тесты (Jest для frontend, pytest для backend)
- [ ] Добавить аутентификацию пользователей
- [ ] Реализовать WebSocket для real-time вычислений
- [ ] Добавить Docker композицию
- [ ] Добавить CI/CD пайплайн

## 🤝 Разработка

Проект создан с использованием Context7 для получения актуальной документации по Next.js и FastAPI, что обеспечивает соответствие современным стандартам разработки.

## 📄 Лицензия

MIT License