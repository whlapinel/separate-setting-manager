"use client";

import { useState } from "react";
import DetailsModal from "./details";

export default function StudentList({ unit, teacher }) {
  const [hidden, setHidden] = useState(true);
  const [details, setDetails] = useState(null);

  function handleShowDetails(e) {
    const prev = hidden;
    const modal = document.querySelector('.modal');
    if ((e.target === modal) && (prev === false)) { // clicked outside modal and modal wasn't hidden
      return setHidden(!prev);
    } 
    else {
    const studentID = e.target.getAttribute("id");
    setDetails(studentID);
    setHidden(!prev);
    }
  }

  const studentList = unit.students.map((student) => {
    return (
        <p
        key={student.id}
          id={student.id}
          name={student.name}
          onClick={handleShowDetails}
        >
          {student.name}
        </p>
    );
  });

  return (
    <>
      {studentList}
      <DetailsModal
      hidden={hidden}
      handleShowDetails={handleShowDetails}
      >
        <p>{details}</p>
      </DetailsModal>
    </>
  );
}
