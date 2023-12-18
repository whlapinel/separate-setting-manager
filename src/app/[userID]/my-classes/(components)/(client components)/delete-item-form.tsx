'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { deleteItemAction } from '../../(actions)/delete-item-action'

const initialState = {
    message: null,
}

function DeleteButton() {
    const { pending } = useFormStatus()

    return (
        <button type="submit" aria-disabled={pending}>
            Delete
        </button>
    )
}

export default function DeleteItemForm({ id, tableName }) {
    const [state, formAction] = useFormState(deleteItemAction, initialState)

    return (
        <form action={formAction}>
            <input type="hidden" name="tableName" value={tableName} />
            <input type="hidden" name="id" value={id} />
            <DeleteButton />
            <p aria-live="polite" className="sr-only" role="status">
                {state?.message}
            </p>
        </form>
    )
}