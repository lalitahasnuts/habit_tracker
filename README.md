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
-  Автосохранение в `localStorage` — данные не теряются при перезагрузке
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
- [ ] Синхронизация между устройствами (Supabase / Firebase)

<img width="720" height="565" alt="image" src="https://github.com/user-attachments/assets/0702f009-b2c4-4fe5-b472-72b86d887059" />



