# Contributing to Calculator App

Спасибо за интерес к участию в развитии проекта! 🎉

## 🚀 Быстрый старт

1. **Форкните репозиторий**
2. **Клонируйте ваш форк**
   ```bash
   git clone https://github.com/YOUR_USERNAME/calculator-app.git
   cd calculator-app
   ```

3. **Установите зависимости**
   ```bash
   # Frontend
   cd calculator-app
   npm install
   
   # Backend
   cd ../api
   pip install -r requirements.txt
   ```

4. **Создайте ветку для фичи**
   ```bash
   git checkout -b feature/amazing-feature
   ```

## 📋 Процесс разработки

### 1. Структура веток
- `main` - стабильная продакшн версия
- `develop` - ветка разработки
- `feature/*` - новые фичи
- `bugfix/*` - исправления багов
- `hotfix/*` - критические исправления

### 2. Соглашения по именованию веток
```
feature/calculator-scientific-functions
bugfix/division-by-zero-handling
hotfix/security-vulnerability-fix
docs/api-documentation-update
```

### 3. Commit сообщения
Используйте [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add scientific calculator functions
fix: handle division by zero error
docs: update API documentation
style: improve button hover animations
refactor: reorganize utility functions
test: add unit tests for calculation logic
```

**Примеры:**
- `feat(frontend): add calculation history export`
- `fix(api): resolve CORS issue in production`
- `docs(readme): update installation instructions`

## 🧪 Тестирование

### Frontend
```bash
cd calculator-app
npm run lint          # ESLint проверка
npm run type-check     # TypeScript проверка
npm run build          # Проверка сборки
```

### Backend
```bash
cd api
python -m pytest tests/    # Запуск тестов
python main.py             # Проверка запуска API
```

### Обязательные проверки перед PR:
- [ ] Все тесты проходят
- [ ] Код проходит линтинг
- [ ] TypeScript компилируется без ошибок
- [ ] API запускается без ошибок
- [ ] Новый функционал покрыт тестами

## 📝 Pull Request Process

1. **Убедитесь, что ваша ветка обновлена**
   ```bash
   git fetch origin
   git rebase origin/develop
   ```

2. **Заполните PR template**
   - Описание изменений
   - Тип изменений
   - Чеклист тестирования

3. **Запросите ревью**
   - Минимум 1 ревьювер для небольших изменений
   - 2+ ревьювера для значительных изменений

4. **Адресуйте комментарии ревьювера**

5. **Merge после аппрува**

## 🎨 Code Style

### TypeScript/JavaScript
- Используйте ESLint конфигурацию проекта
- Предпочитайте функциональные компоненты с hooks
- Типизируйте все props и state
- Используйте деструктуризацию где это уместно

```typescript
// ✅ Хорошо
interface CalculatorProps {
  initialValue?: number
  onCalculate: (result: number) => void
}

const Calculator: React.FC<CalculatorProps> = ({ 
  initialValue = 0, 
  onCalculate 
}) => {
  // component logic
}

// ❌ Плохо
const Calculator = (props: any) => {
  // component logic
}
```

### Python
- Следуйте PEP 8
- Используйте type hints
- Документируйте функции с помощью docstrings
- Предпочитайте async/await для I/O операций

```python
# ✅ Хорошо
async def calculate(
    operation: str, 
    a: float, 
    b: float
) -> CalculationResult:
    """
    Perform mathematical calculation.
    
    Args:
        operation: The mathematical operation (+, -, *, /)
        a: First operand
        b: Second operand
        
    Returns:
        CalculationResult with result and metadata
        
    Raises:
        ValueError: If operation is not supported
    """
    # function logic

# ❌ Плохо
def calc(op, x, y):
    # function logic
```

## 🐛 Reporting Bugs

1. **Проверьте существующие issues**
2. **Используйте bug report template**
3. **Включите подробную информацию:**
   - Шаги воспроизведения
   - Ожидаемое поведение
   - Актуальное поведение
   - Скриншоты (если применимо)
   - Информация об окружении

## 💡 Предложение фич

1. **Проверьте existing issues и PRs**
2. **Используйте feature request template**
3. **Объясните:**
   - Проблему, которую решает фича
   - Предлагаемое решение
   - Альтернативы
   - Acceptance criteria

## 🏗️ Архитектурные решения

### Frontend (Next.js)
- Используйте App Router для новых страниц
- Держите компоненты в папке `components/`
- Используйте Tailwind для стилизации
- Предпочитайте Server Components где возможно

### Backend (FastAPI)
- Следуйте RESTful принципам
- Используйте Pydantic модели для валидации
- Документируйте API endpoints
- Обрабатывайте ошибки gracefully

## 🔒 Безопасность

- Никогда не коммитьте секреты или API ключи
- Используйте environment variables для конфигурации
- Валидируйте все пользовательские входы
- Следуйте OWASP рекомендациям

## 📚 Ресурсы

- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React TypeScript Guide](https://react-typescript-cheatsheet.netlify.app/)
- [Python Type Hints](https://docs.python.org/3/library/typing.html)

## ❓ Вопросы?

- Создайте issue с меткой `question`
- Обратитесь к maintainers
- Проверьте существующую документацию

## 🙏 Acknowledgments

Спасибо всем контрибьюторам, которые помогают улучшать этот проект!

---

**Помните**: Код ревьюится не для критики, а для улучшения качества проекта. Будьте конструктивны и уважительны в общении! 🤝