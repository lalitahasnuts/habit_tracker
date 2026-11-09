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

### Хранение

Все привычки хранятся в Supabase.

### Схема базы данных (Supabase)
Проект использует таблицу habits со следующими полями:

```
id (uuid, primary key)

user_id (uuid, references auth.users)

name (text)

created_at (timestamptz)

completions (jsonb) — объект с отметками по дням в формате { "2026-11-09": true }.
```

<img width="707" height="413" alt="image" src="https://github.com/user-attachments/assets/7c0d90b5-057e-4b38-bdf8-736329c6a213" />




