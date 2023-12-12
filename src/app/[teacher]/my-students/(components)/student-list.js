"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DetailsModal from "./details";
import Buttons from "./buttons";
import axios from "axios";

export default function StudentList({ unit, teacher, students }) {
  const router = useRouter();
  console.log("unit", unit);
  console.log("unit.students", unit.students);
  const [hidden, setHidden] = useState(true);
  const [details, setDetails] = useState(null);
  const [deletePending, setDeletePending] = useState(false);
  const [studentList, setStudentList] = useState(students);

  async function handleDelete(e) {
    console.log("delete clicked");
    setDeletePending(true);
    const unitDiv = e.target.closest("div.unit-container");
    const unitID = unitDiv.getAttribute("id");
    const studentID = e.target.parentNode.getAttribute("id");
    const teacher = e.target.parentNode.getAttribute("teacher");

    // send delete request to api
    try {
      const response = await axios.delete("../api/students", {
        data: { studentID: studentID, unitID: unitID }
      });
    } catch (error) {
      console.log("error");
      console.log(error);
      alert(error.response?.data);
    }
    // revalidate data
    console.log("revalidating...");
    try {
      const revalRes = await axios.get(
        `../api/revalidate?path=/[teacher]/my-students`
      );
      console.log('revalidation complete.');
    } catch (err) {
      console.log(err);
    }
    console.log('fetching student list...');
    try {
      const getDataRes = await axios.get(`../api/students?unitID=${unitID}`);
      const newStudents = getDataRes.data.students;
      setStudentList(newStudents);
      console.log('new student list: ', newStudents);
      setDeletePending(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleEdit(e) {
    console.log("edit");
  }

  function handleShowDetails(e) {
    const prev = hidden;
    const modal = document.querySelector(".modal");
    if (e.target === modal && prev === false) {
      // clicked outside modal and modal wasn't hidden
      return setHidden(!prev);
    } else {
      const studentID = e.target.getAttribute("id");
      setDetails(studentID);
      setHidden(!prev);
    }
  }
  console.log("studentList");
  console.log(studentList);

  const studentElements = !studentList ? (
    <p>no students</p>
  ) : (
    studentList.map((student) => {
      return (
        <>
          <div className="row-container">
            <Buttons
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              id={student.id}
              nameOfClass={unit.name}
              teacher={teacher}
            />
            <p
              key={student.name}
              id={student.id}
              name={student.name}
              onClick={handleShowDetails}
            >
              {student.name}
            </p>
          </div>
        </>
      );
    })
  );

  return (
    <>
      <div className="student-container">
        {studentElements ? studentElements : <p>no students</p>}
        <DetailsModal hidden={hidden} handleShowDetails={handleShowDetails}>
          <p>{details}</p>
        </DetailsModal>
      </div>
    </>
  );
}
