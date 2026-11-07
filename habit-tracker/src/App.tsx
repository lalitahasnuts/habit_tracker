import { useHabits } from './hooks/useHabits';
import { AddHabitForm } from './components/AddHabitForm';
import { HabitRow } from './components/HabitRow';
import { getCurrentStreak } from './utils/streak';

const DAYS_TO_SHOW = 14;

function App() {
  const { habits, addHabit, removeHabit, toggleCompletion } = useHabits();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Трекер привычек</h1>
      <AddHabitForm onAdd={addHabit} />

      {habits.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          Пока нет привычек. Добавь первую! ✨
        </p>
      ) : (
        habits.map((habit) => (
          <div key={habit.id}>
            <HabitRow
              habit={habit}
              daysCount={DAYS_TO_SHOW}
              onToggle={toggleCompletion}
              onRemove={removeHabit}
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