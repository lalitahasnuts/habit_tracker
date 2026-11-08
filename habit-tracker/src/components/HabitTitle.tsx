import { useState, useEffect, useRef, type KeyboardEvent } from 'react';

interface Props {
    name: string;
    onRename: (name: string) => void;
}

export function HabitTitle({ name, onRename }: Props) {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(name);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editing) {
            inputRef.current?.focus();
            inputRef.current?.select();
        }
    }, [editing]);

    const save = () => {
        onRename(draft);
        setEditing(false);
    };

    const cancel = () => {
        setDraft(name);
        setEditing(false);
    };

    const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') save();
        if (e.key === 'Escape') cancel(); 
    };

    if (editing) {
        return (
            <input 
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={handleKey}
                onBlur={cancel}
                className="font-medium border-b border-blue-500 outline-none bg-tranparent"
            />
        );
    }

    return (
        <h3
            onDoubleClick={() => {
                setDraft(name);
                setEditing(true);
            }}
            className="font-medium cursor-pointer hover:text-blue-600"
        >
            {name}
        </h3>
    )
}