export interface Habit{
    id: string;
    name: string;
    createdAt: string;
    completion: Record<string, boolean>;
}