'use client';

import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
    const { pending } = useFormStatus();
  
    return (
        <>
      <button type="submit" aria-disabled={pending}>
        {pending?'Submitting...':'Submit'}
      </button>
        </>
    );
  }
  