import { useState, type FormEvent } from "react";

interface Props {
    onAdd: (name: string) => void;
}

export function AddHabitForm({ onAdd }: Props) {
    const [ name, setName ] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        onAdd(name);
        setName('');
    };

    return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Новая привычка..."
        className="flex-1 border rounded px-3 py-2"
        maxLength={50}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Добавить
      </button>
    </form>
  );
} 