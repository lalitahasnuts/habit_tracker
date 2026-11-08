import { format, subDays, isToday } from 'date-fns';
import type { Habit } from '../types';
import { HabitTitle } from './HabitTitle';

interface Props {
    habit: Habit;
    daysCount: number;
    onToggle: (habitId: string, date: string) => void;
    onRemove: (id: string) => void; 
    onRename: (id: string, name: string) => void;
}

export function HabitRow({ habit, daysCount, onToggle, onRemove, onRename }: Props) {
    const days = Array.from({ length: daysCount }, (_, i) =>
        subDays(new Date(), daysCount - 1 - i)
    );

    return (
        <div className="border rounded p-4 md-3">
            <div className="flex justify-between items-center mb-3">
                <HabitTitle
                    name={habit.name}
                    onRename={(newName) => onRename(habit.id, newName)}
                />
                <button
                    onClick={() => onRemove(habit.id)}
                    className="text-red-500 text-sm hover:underline"
                >
                    Удалить
                </button>
            </div>

            <div className="flex gap-1 flex-wrap">
                {days.map((date) => {
                    const key = format(date, 'dd-MM-yyyy');
                    const done = habit.completions[key] ?? false;
                    const today = isToday(date);
                    return (
                        <button
                            key={key}
                            onClick={() => onToggle(habit.id, key)}
                            title={format(date, 'dd.MM.yyyy')}
                            className={`w-8 h-8 rounded text-xs ${
                                done
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-200 hover:bg-gray-300'
                            } ${ today ? 'ring-2 ring-red-500 ring-offset-1' : ''}`}                       
                            >
                            {format(date, 'd')}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}