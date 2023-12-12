"use client";

import TestEventList from "./test-event-list";
import StudentList from "./student-list";
import Buttons from "./buttons";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function UnitContainer({ unit }) {
  const router = useRouter();

  async function handleDelete(e) {
    console.log("deleting unit");
    console.log("target", e.target);
    console.log("parent", e.target.parentNode);
    console.log("id", e.target.parentNode.getAttribute("id"));
    const id = e.target.parentNode.getAttribute("id");
    // send request to delete class
    try {
      const res = await axios.delete(`../api/classrooms/${id}`);
      router.refresh();
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  }

  function handleEdit(e) {
    console.log("edit");
  }

  return (
    <div className="unit-container" id={unit.id}>
      <Buttons
        id={unit.id}
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
