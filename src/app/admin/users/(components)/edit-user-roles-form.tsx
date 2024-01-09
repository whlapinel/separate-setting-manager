import { Checkbox, CheckboxField, CheckboxGroup } from '@/ui/checkbox';
import React from 'react'
import { useFormState } from 'react-dom';
import editUserRolesAction from '@/app/admin/users/(actions)/edit-user-roles'
import { SubmitButton } from '@/ui/submit-button';
import { Description, Label } from '@headlessui/react';
import { useState } from 'react';

export default function EditUserRolesForm({ userID, roles }) {

  const initialState = {
    admin: roles.includes('admin'),
    teacher: roles.includes('teacher'),
    message: null,
  }
  
  const [state, formAction] = useFormState(editUserRolesAction, initialState);

  return (
    <>
      <form action={formAction}>
        <div className="flex flex-col gap-1 text-left">
          <input type="hidden" name="userID" value={userID} readOnly />
          <CheckboxGroup>
            <CheckboxField>
              <Label htmlFor='admin'>Admin</Label>
              <Checkbox name='admin' defaultChecked={state.admin}/>
              </CheckboxField>
              <CheckboxField>
              <Label htmlFor='teacher'>Teacher</Label>
              <Checkbox name='teacher' defaultChecked={state.teacher}/>
              </CheckboxField>
          </CheckboxGroup>
        </div>
        <SubmitButton className="my-2" />
      </form>
      {state.message ?
        <p aria-live="polite" className="sr-only" role="status">
          {state.message}
        </p>
        : null}
    </>
  );
}
