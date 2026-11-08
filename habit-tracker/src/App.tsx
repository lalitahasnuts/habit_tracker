import { useHabits } from './hooks/useHabits';
import { AddHabitForm } from './components/AddHabitForm';
import { HabitRow } from './components/HabitRow';
import { getCurrentStreak } from './utils/streak';
import { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { exportHabits, parseImportedHabits } from './utils/exportImport';
import { useRef } from 'react';

type Period = 7 | 14 | 30;
const PERIODS: Period[] = [7, 14, 30];

function App() {
  const { habits, addHabit, removeHabit, toggleCompletion, renameHabit, replaceHabits } = useHabits();
  const [period, setPeriod] = useState<Period>(14);
  const { theme, toggleTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const text = await file.text();
  const imported = parseImportedHabits(text);

  if (!imported) {
    alert('Невалидный файл. Ожидается JSON с массивом привычек.');
  } else if (confirm(`Импортировать ${imported.length} привычек? Текущие будут заменены.`)) {
    replaceHabits(imported);
  }

  e.target.value = '';
};

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Трекер привычек</h1>
        <button
          onClick={toggleTheme}
          className="text-2xl"
          title="Переключить тему"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
    </div>

      <AddHabitForm onAdd={addHabit} />

      <div className="flex gap-2 mb-4">
        {PERIODS.map((p) => 
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
        )}
      </div>

      {habits.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
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
            <p className="text-sm text-gray-600 ml-4 -mt-1 mb-3">
              🔥 Серия: {getCurrentStreak(habit)} дн.
            </p>
          </div>
        ))
      )}
      <div className="flex gap-2 mb-4">
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
  );
}

export default App;