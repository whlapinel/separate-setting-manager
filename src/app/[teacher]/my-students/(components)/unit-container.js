"use client";

import TestEventList from "./test-event-list";
import StudentList from "./student-list";
import Buttons from "./buttons";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function UnitContainer({ unit, handleDelete, handleEdit }) {
  const router = useRouter();

  return (
    <div className="unit-container" id={unit.id}>
      <Buttons
        id={unit.id}
        teacher={unit.teacher}
        handleDelete={handleDelete}
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
