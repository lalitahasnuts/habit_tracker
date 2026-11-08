import type { Habit } from '../types';

export function exportHabits(habits: Habit[]) {
    const data = JSON.stringify(habits, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `habits-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();

    URL.revokeObjectURL(url);
}

export function parseImportedHabits(text: string): Habit[] | null {
    try {
        const parsed = JSON.parse(text);
        if (!Array.isArray(parsed)) return null;    

        const isValid = parsed.every(
            (h) => 
                typeof h?.id === 'string' &&
                typeof h?.name === 'string' &&
                typeof h?.createdAt === 'string' &&
                typeof h?.completions === 'object' &&
                h.completions !== null
        );

        return isValid ? (parsed as Habit[]) : null;
    } catch {
        return null;
    }
}

