import { useHabits } from './hooks/useHabits';
import { AddHabitForm } from './components/AddHabitForm';

function App() {
  const { habits, addHabit } = useHabits();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Трекер привычек</h1>
      <AddHabitForm onAdd={addHabit} />

      {/* Временный вывод*/}
      <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
        {JSON.stringify(habits, null, 2)}
      </pre>
    </div>
  );
}

export default App;