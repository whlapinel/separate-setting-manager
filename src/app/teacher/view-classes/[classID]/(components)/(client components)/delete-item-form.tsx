'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { deleteItemAction } from '../../(actions)/delete-item-action'
import { Button } from '@/ui/button'
import { tableName } from '@/lib/definitions'
import clsx from 'clsx'

const initialState = {
    message: null,
}

function DeleteButton({canDelete = true}: {canDelete?: boolean}) {
    const { pending } = useFormStatus()

    console.log("canDelete: ", canDelete);
    

    return (
        <Button type="submit" disabled={pending || !canDelete} color='red'  className={'h-8'} >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clipRule="evenodd" />
            </svg>
        </Button>
    )
}

export default function DeleteItemForm({ id, tableName, canDelete }: { id: string, tableName: tableName, canDelete?: boolean }) {
    const [state, formAction] = useFormState(deleteItemAction, initialState)

    return (
        <form action={formAction}>
            <input type="hidden" name="tableName" value={tableName} />
            <input type="hidden" name="id" value={id} />
            <DeleteButton canDelete={canDelete}/>
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
}