import { useLocalStorage } from './useLocalStorage';
import type { Habit } from '../types';

export function useHabits() {
    const [ habits, setHabits ] = useLocalStorage<Habit[]>('habits', []);

    const addHabit = (name: string) => {
        const trimmed = name.trim();
        if (!trimmed) return;

        const newHabit: Habit = {
            id: crypto.randomUUID(),
            name: trimmed,
            createdAt: new Date().toISOString(),
            completions: {}, 
        };
        setHabits((prev) => [...prev, newHabit]);
    };

    const removeHabit = (id: string) => {
        setHabits((prev) => prev.filter((h) => h.id !== id));
    };

    const toggleCompletion = (habitId: string, date: string) => {
        setHabits((prev) => 
            prev.map((h) => {
                if (h.id !== habitId) return h;
                const isDone = h.completions[date] ?? false;
                return {
                    ...h,
                    completions: { ...h.completions, [date]: !isDone },
                };
            })
        );
    };

    return { habits, addHabit, removeHabit, toggleCompletion }
}