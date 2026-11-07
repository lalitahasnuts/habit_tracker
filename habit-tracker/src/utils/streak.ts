import { format, subDays } from 'date-fns';
import type { Habit } from '../types';

export function getCurrentStreak(habit: Habit): number {
    let streak = 0;
    let cursor = new Date();

    const todayKey = format(cursor, 'dd-MM-yyyy');
    if (!habit.completions[todayKey]) {
        cursor = subDays(cursor, 1);
    }

    while (habit.completions[format(cursor, 'dd-MM-yyyy')]) {
        streak++;
        cursor = subDays(cursor, 1);
    }
    return streak;
}