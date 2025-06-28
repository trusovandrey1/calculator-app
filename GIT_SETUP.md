# Git Setup Guide

Руководство по настройке Git для проекта Calculator App.

## 🔧 Первоначальная настройка

### 1. Настройка пользователя Git
```bash
git config --global user.name "Ваше Имя"
git config --global user.email "your.email@example.com"
```

### 2. Настройка шаблона коммитов
```bash
git config commit.template .gitmessage
```

### 3. Полезные Git алиасы
```bash
# Основные алиасы
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.st status

# Продвинутые алиасы
git config --global alias.unstage 'reset HEAD --'
git config --global alias.last 'log -1 HEAD'
git config --global alias.visual '!gitk'

# Красивый лог
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"

# Показать изменения в последнем коммите
git config --global alias.dlc 'diff --cached HEAD^'

# Быстрый коммит с сообщением
git config --global alias.cm 'commit -m'

# Добавить все изменения и закоммитить
git config --global alias.save '!git add -A && git commit -m'

# Показать статус кратко
git config --global alias.s 'status -s'

# Показать ветки с последними коммитами
git config --global alias.bl 'branch -v'

# Удалить локальные ветки, которых нет на remote
git config --global alias.cleanup '!git branch -vv | grep ": gone]" | awk "{print \$1}" | xargs git branch -d'
```

### 4. Настройка pre-commit hooks (опционально)
```bash
# Установка pre-commit
pip install pre-commit

# Установка хуков
pre-commit install

# Ручной запуск проверок
pre-commit run --all-files
```

## 🌟 Полезные Git команды для проекта

### Разработка функций
```bash
# Создать новую ветку для фичи
git checkout -b feature/calculator-scientific-functions

# Переключиться на основную ветку
git checkout main

# Обновить main ветку
git pull origin main

# Слить фичу в main (squash commit)
git merge --squash feature/calculator-scientific-functions
git commit -m "feat: add scientific calculator functions"

# Удалить фичу ветку после слияния
git branch -d feature/calculator-scientific-functions
```

### Работа с историей
```bash
# Красивый лог (используйте алиас lg)
git lg

# Показать изменения в файле
git log -p calculator-app/app/page.tsx

# Поиск в коммитах
git log --grep="calculator"

# Показать коммиты за последнюю неделю
git log --since="1 week ago"

# Показать статистику коммитов
git shortlog -s -n
```

### Исправление ошибок
```bash
# Отменить последний коммит (сохранить изменения)
git reset --soft HEAD^

# Изменить сообщение последнего коммита
git commit --amend -m "новое сообщение"

# Добавить изменения к последнему коммиту
git add .
git commit --amend --no-edit

# Временно сохранить изменения
git stash
git stash pop

# Создать stash с описанием
git stash push -m "работа над калькулятором"
```

### Синхронизация с remote
```bash
# Добавить remote репозиторий
git remote add origin https://github.com/username/calculator-app.git

# Отправить изменения в remote
git push -u origin main

# Загрузить изменения из remote
git fetch origin
git merge origin/main

# Или одной командой
git pull origin main

# Принудительно обновить локальную ветку
git reset --hard origin/main
```

## 🔄 Git Flow для проекта

### Основные ветки
- `main` - стабильная продакшн версия
- `develop` - ветка разработки (опционально)

### Рабочие ветки
- `feature/*` - новые фичи
- `bugfix/*` - исправления багов
- `hotfix/*` - критические исправления

### Пример workflow
```bash
# 1. Обновить main
git checkout main
git pull origin main

# 2. Создать ветку для фичи
git checkout -b feature/add-memory-functions

# 3. Разработка...
git add .
git commit -m "feat: add memory store functionality"
git commit -m "feat: add memory recall functionality"

# 4. Отправить ветку в remote
git push -u origin feature/add-memory-functions

# 5. Создать Pull Request через GitHub

# 6. После merge удалить локальную ветку
git checkout main
git pull origin main
git branch -d feature/add-memory-functions
```

## 📋 Conventional Commits

Используйте следующий формат для коммитов:

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types:
- `feat` - новая функциональность
- `fix` - исправление бага
- `docs` - изменения в документации
- `style` - форматирование кода
- `refactor` - рефакторинг
- `test` - добавление тестов
- `chore` - изменения в сборке/зависимостях

### Примеры:
```bash
feat(frontend): add scientific calculator mode
fix(api): resolve division by zero error
docs(readme): update installation instructions
style(components): improve button styling
refactor(utils): extract calculation logic
test(api): add unit tests for math operations
chore(deps): update Next.js to v15.3.4
```

## 🛡️ Безопасность

### Проверка секретов
```bash
# Поиск потенциальных секретов
git secrets --scan

# Проверка истории на секреты
git secrets --scan-history
```

### Очистка истории
```bash
# Удалить файл из всей истории (ОСТОРОЖНО!)
git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch путь/к/файлу' \
  --prune-empty --tag-name-filter cat -- --all

# Альтернативно, используйте BFG
java -jar bfg.jar --delete-files файл.txt
```

## 🔍 Полезные инструменты

### GitHub CLI
```bash
# Установка (macOS)
brew install gh

# Авторизация
gh auth login

# Создать PR из командной строки
gh pr create --title "Add new feature" --body "Description"

# Просмотр PRs
gh pr list

# Проверка CI статуса
gh pr checks
```

### Git интеграции VSCode
Рекомендуемые расширения:
- GitLens
- Git Graph
- GitHub Pull Requests and Issues

## 📚 Дополнительные ресурсы

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)

---

**Совет**: Делайте коммиты часто, пишите понятные сообщения и всегда проверяйте изменения перед коммитом! 🚀