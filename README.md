# Habit Tracker

Трекер привычек на React + TypeScript. Добавляй привычки, отмечай выполнение по дням и следи за серией (streak).

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)

## Возможности

-  Добавление привычек с валидацией пустого ввода
-  Отметка выполнения по дням — сетка за 7 / 14 / 30 дней
-  Подсчёт текущей серии (streak) с «мягким» сбросом: если сегодня ещё не отмечено, серия не обнуляется
-  Переименование привычки по двойному клику (Enter — сохранить, Esc — отменить)
-  Удаление привычек
-  Синхронизация между устройствами Supabase
-  Адаптивная вёрстка на Tailwind CSS
-  Тёмная/светлая темы
-  Экспорт / импорт данных в JSON
-  Статистика: процент выполнения за период

## Запуск локально

### Требования

- Node.js 20+ (рекомендуется 22 LTS)
- npm 10+

### Установка

```bash
# клонируй репозиторий
git clone https://github.com/lalitahasnuts/habit-tracker.git
cd habit-tracker

# установи зависимости
npm install

# cоздай файл .env.local в корне проекта и добавь свои ключи Supabase:
VITE_SUPABASE_URL=твой_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=твой_publishable_key

# запусти dev-сервер
npm run dev
```

Приложение откроется на [http://localhost:5173](http://localhost:5173).

## Скрипты

| Команда           | Что делает                              |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Запуск dev-сервера с HMR                |
| `npm run build`   | Сборка production-бандла в `dist/`      |
| `npm run preview` | Локальный предпросмотр production-сборки |
| `npm run lint`    | Проверка кода ESLint                    |

## Стек

- **React 19** — UI-библиотека
- **TypeScript** — статическая типизация
- **Vite** — сборщик и dev-сервер
- **Tailwind CSS v4** — утилитарные стили (через `@tailwindcss/vite`)
- **Backend / База данных:** Supabase (PostgreSQL, Auth, Realtime)
- **date-fns** — работа с датами (форматирование, вычисление streak)

## Структура проекта

```
src/
├── components/
│   ├── AddHabitForm.tsx    # Форма добавления привычки
│   ├── HabitRow.tsx        # Строка привычки с сеткой дней
│   └── HabitTitle.tsx      # Название с inline-редактированием
├── hooks/
│   ├── useLocalStorage.ts  # Generic-хук для синхронизации с localStorage
│   └── useHabits.ts        # Бизнес-логика: add / remove / rename / toggle
├── utils/
│   └── streak.ts           # Подсчёт текущей серии
├── types.ts                # Общие типы (Habit)
├── App.tsx                 # Корневой компонент
├── main.tsx                # Точка входа
└── index.css               # @import "tailwindcss" + базовые стили
```

### Хранение

Все привычки хранятся в одном ключе `localStorage` под именем `habits`. Синхронизация инкапсулирована в хуке `useLocalStorage<T>`.

## Планы

- [ ] Написать тесты (Vitest + Testing Library) на `getCurrentStreak` и хуки

<img width="707" height="413" alt="image" src="https://github.com/user-attachments/assets/7c0d90b5-057e-4b38-bdf8-736329c6a213" />




