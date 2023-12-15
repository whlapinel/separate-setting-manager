'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { deleteClassAction } from '../(actions)/delete-class-action'

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

export function DeleteClassForm({ id }) {
  const [state, formAction] = useFormState(deleteClassAction, initialState)

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <DeleteButton />
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  )
}