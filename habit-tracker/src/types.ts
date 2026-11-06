export interface Habit{
    id: string;
    name: string;
    createdAt: string;
    completions: Record<string, boolean>;
}