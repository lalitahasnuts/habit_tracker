import { useHabits } from './hooks/useHabits';
import { AddHabitForm } from './components/AddHabitForm';
import { HabitRow } from './components/HabitRow';
import { getCurrentStreak } from './utils/streak';
import { useState } from 'react';

type Period = 7 | 14 | 30;
const PERIODS: Period[] = [7, 14, 30];

function App() {
  const { habits, addHabit, removeHabit, toggleCompletion, renameHabit } = useHabits();
  const [period, setPeriod] = useState<Period>(14);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Трекер привычек</h1>

      <AddHabitForm onAdd={addHabit} />

      <div className="flex gap-2 mb-4">
        {PERIODS.map((p) => 
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={`px-3 py-1 rounded text-sm ${
              period === p
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
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
    </div>  
  );
}

export default App;