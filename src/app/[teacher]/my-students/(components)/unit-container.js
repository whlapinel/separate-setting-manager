"use client";

import TestEventList from "./test-event-list";
import StudentList from "./student-list";
import Buttons from "./buttons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { set } from "date-fns";
import { DeleteClassForm } from "./delete-class-form";

export default function UnitContainer({ unit, handleDelete, handleEdit }) {
  const [deletePending, setDeletePending] = useState(false);
  const router = useRouter();
  console.log("rerendering UnitContainer (client component)");

  async function handleDeleteSelf(e) {
    handleDelete(e); // parent component's handleDelete function
    setDeletePending(true); // changes css class to show delete pending
  }

  return (
    <div
      className={
        deletePending ? "unit-container delete-pending" : "unit-container"
      }
      key={unit.id}
      id={unit.id}
      teacher={unit.teacher}
    >
      <DeleteClassForm id={unit.id}/>
      <Buttons
        id={unit.id}
        handleDelete={handleDeleteSelf}
        handleEdit={handleEdit}
      />
      <h3>{unit.name}</h3>
      <h4>Block: {unit.block}</h4>
      <StudentList
        unit={unit}
        teacher={unit.teacher}
        students={unit.students}
      />
      <h4>Test Events</h4>
      <TestEventList
        testEvents={unit.testEvents}
        nameOfClass={unit.name}
        unitId={unit.id}
        teacher={unit.teacher}
      />
    </div>
  );
}
