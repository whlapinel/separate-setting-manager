'use client';

import {useState} from 'react';

export default function EditButton({ id, tableName, handleEdit }: { id: string, tableName: string, handleEdit: any }) {
    const [isActive, setActive] = useState(false);

    function handleClick(e) {
        console.log('isActive:', isActive);
        setActive(!isActive);
        handleEdit(e);
    }
    
    return (
        <button className={isActive?"active edit-btn":"edit-btn"} onClick={handleClick} id={id}>Edit</button>
    )
}
