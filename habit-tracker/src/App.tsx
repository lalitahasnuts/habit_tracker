import { useState, useRef, useEffect } from 'react'
import { useSupabaseHabits } from './hooks/useSupabaseHabits'
import { AddHabitForm } from './components/AddHabitForm'
import { HabitRow } from './components/HabitRow'
import { Auth } from './components/Auth'
import { useTheme } from './hooks/useTheme'
import { getCurrentStreak } from './utils/streak'
import { getPeriodStats } from './utils/stats'
import { exportHabits, parseImportedHabits } from './utils/exportImport'
import { supabase } from './supabaseClient'

type Period = 7 | 14 | 30

const PERIODS: Period[] = [7, 14, 30]

function App() {
  const {
    habits, loading, error,
    addHabit, removeHabit, renameHabit,
    toggleCompletion, replaceHabits,
  } = useSupabaseHabits()

  const { theme, toggleTheme } = useTheme()

  const [period, setPeriod] = useState<Period>(14)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [sessionChecked, setSessionChecked] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  // ---------- Проверка сессии ----------
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserEmail(data.user?.email ?? null)
      setSessionChecked(true)
    })

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user.email ?? null)
    })

    return () => { sub.subscription.unsubscribe() }
  }, [])

  // ---------- Импорт ----------
  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const text = await file.text()
    const imported = parseImportedHabits(text)

    if (!imported) {
      alert('Невалидный файл. Ожидается JSON с массивом привычек.')
    } else if (confirm(`Импортировать ${imported.length} привычек? Текущие будут заменены.`)) {
      await replaceHabits(imported)
    }

    e.target.value = ''
  }

  // ---------- Логин ----------
  if (!sessionChecked) {
    return <div className="p-6 text-center">Проверка сессии...</div>
  }

  if (!userEmail) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Трекер привычек</h1>
          <button onClick={toggleTheme} className="text-2xl" title="Переключить тему">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
        <Auth />
      </div>
    )
  }

  // ---------- Загрузка ----------
  if (loading) {
    return <div className="p-6 text-center">Загрузка привычек...</div>
  }

  // ---------- Сводка ----------
  const overallPercent = habits.length
    ? Math.round(
        habits.reduce((sum, h) => sum + getPeriodStats(h, period).percent, 0) /
          habits.length
      )
    : 0

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Шапка */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Трекер привычек</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-stone-500 dark:text-gray-400">
            {userEmail}
          </span>
          <button
            onClick={() => supabase.auth.signOut()}
            className="text-sm text-red-500 hover:underline"
          >
            Выйти
          </button>
          <button onClick={toggleTheme} className="text-2xl" title="Переключить тему">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      {/* Ошибка */}
      {error && (
        <div className="bg-red-100 text-red-800 p-2 rounded mb-4 text-sm">
          {error}
        </div>
      )}

      <AddHabitForm onAdd={addHabit} />

      {/* Период */}
      <div className="flex gap-2 mb-2">
        {PERIODS.map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              period === p
                ? 'bg-amber-600 text-white hover:bg-amber-700'
                : 'bg-amber-100 text-amber-900 hover:bg-amber-200 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600'
            }`}
          >
            {p} дней
          </button>
        ))}
      </div>

      {/* Сводка + экспорт/импорт */}
      <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
        <p className="text-sm text-stone-600 dark:text-gray-400">
          {habits.length > 0
            ? <>Общий прогресс за {period} дн.: <strong>{overallPercent}%</strong></>
            : ' '}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => exportHabits(habits)}
            className="px-3 py-1 rounded text-sm bg-green-600 text-white hover:bg-green-700"
          >
            ⬇ Экспорт
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1 rounded text-sm bg-orange-600 text-white hover:bg-orange-700"
          >
            ⬆ Импорт
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleImport}
            className="hidden"
          />
        </div>
      </div>

      {/* Список */}
      {habits.length === 0 ? (
        <p className="text-stone-500 dark:text-gray-400 text-center py-10">
          Пока нет привычек. Добавь первую! ✨
        </p>
      ) : (
        habits.map((habit) => (
          <div key={habit.id}>
            <HabitRow
              habit={habit}
              daysCount={period}
              onToggle={toggleCompletion}
              onRemove={removeHabit}
              onRename={renameHabit}
            />
            <p className="text-sm text-stone-600 dark:text-gray-400 ml-4 -mt-1 mb-3">
              🔥 Серия: {getCurrentStreak(habit)} дн.
            </p>
          </div>
        ))
      )}
    </div>
  )
}

export default App