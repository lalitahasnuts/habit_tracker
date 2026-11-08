import { useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

type Theme = 'light' | 'dark';

export function useTheme() {
    const systemTheme: Theme =
        window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    const [theme, setTheme] = useLocalStorage<Theme>('theme', systemTheme);

    useEffect(() => {
        const root = document.documentElement;
        root.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

    return { theme, toggleTheme }
}