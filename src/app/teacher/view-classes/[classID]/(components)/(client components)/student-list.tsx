'use client';

import { student } from "@/lib/definitions";
import DeleteItemForm from "./delete-item-form";
import EditButton from "./edit-button";
import { log } from "console";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useFormStatus } from "react-dom";
import { editStudent } from "@/lib/data";
import editStudentAction from "@/app/teacher/view-classes/[classID]/(actions)/edit-student-action"

export default function StudentList({ students }: { students: Array<student> }) {
  const [editingID, setEditingID]: [editingID: string, setEditingID: any] = useState(null);
  const [state, formAction] = useFormState(editStudentAction, null);
  const [form, setForm] = useState(null);

  console.log("rendering StudentList (server component)");

  console.log("students");
  console.log(students);

  const studentElements = students?.map((student) => {


    function handleEdit(e) {
      console.log('edit clicked');
      console.log(e.target);
      const itemID = e.target.getAttribute('id');
      const alreadyEditing = (itemID === editingID)
      if (alreadyEditing) {
        setEditingID(null);
      } else {
        setEditingID(itemID);
      }
      console.log(`editing ${itemID}:`, itemID === editingID);
    }

    function handleChange() {
      console.log('item changed');

    }

    function SubmitButton() {
      const { pending, data } = useFormStatus();

      useEffect(() => {
        if (pending) {
          console.log('pending:', pending);
          console.log('data:', data);
          console.log('state:', state);
          setEditingID(null);
        }
      }, [pending])

      return (
        <button type="submit" aria-disabled={pending}>
          Submit
        </button>
      );
    
    }


    return (
      <>
        <div
          className={"row-container"}
          key={student.id}
        >
          <DeleteItemForm id={student.id} tableName={'students'} />
          <EditButton id={student.id}
            tableName={'testEvents'}
            handleEdit={handleEdit} />
          <div>

            {!(editingID === student.id) ?
              <>
                <span>{student.firstName}</span>
                <span> </span>
                <span>{student.lastName}</span>
              </>
              :
              <>
              <form action={formAction} className="item-edit-form">
                <input className="editInput" type="text" name="firstName" placeholder={student.firstName} onChange={handleChange}></input>
                <input className="editInput" type="text" name="lastName" placeholder={student.lastName} onChange={handleChange}></input>
                <input type="hidden" name="id" value={student.id}></input>
                <SubmitButton/>
                </form>
              </>
            }
          </div>
        </div>
      </>
    );
  });

  return (
    <>
      <div className="student-container">
        {studentElements ? studentElements : <p>no students</p>}
      </div>
    </>
  );
}
