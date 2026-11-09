import { format, subDays } from 'date-fns';
import type { Habit } from '../types';

export interface PeriodStats {
    completed: number;
    total: number;
    percent: number;
}

export function getPeriodStats(habit: Habit, daysCount: number): PeriodStats {
    let completed = 0;

    for (let i = 0; i < daysCount; i++) {
        const key = format(subDays(new Date(), i), 'dd-MM-yyyy');
        if (habit.completions[key]) completed++;
    }

    const percent = Math.round((completed / daysCount) * 100);
    return { completed, total: daysCount, percent };
}