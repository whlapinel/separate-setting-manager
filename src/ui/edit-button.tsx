'use client';

import { Button } from '@/ui/button';
import { useState } from 'react';

export default function EditButton({ id, tableName, handleEdit }: { id: string, tableName: string, handleEdit: any }) {
    const [isActive, setActive] = useState(false);

    function handleClick(e) {
        console.log('isActive:', isActive);
        setActive(!isActive);
        handleEdit(e);
    }

    return (
        <Button color='blue' className={isActive ? "active edit-btn" : "edit-btn"} onClick={handleClick} id={id}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" />
                <path d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" />
            </svg>
        </Button>
    )
}
