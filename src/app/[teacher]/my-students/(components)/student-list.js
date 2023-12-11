"use client";

import { useState, useEffect } from "react";
import DetailsModal from "./details";
import Buttons from "./buttons";
import axios from "axios";

export default function StudentList({ unit, teacher, students }) {
  console.log("unit", unit);
  console.log("unit.students", unit.students);
  const [hidden, setHidden] = useState(true);
  const [details, setDetails] = useState(null);
  const [deletePending, setDeletePending] = useState(false);
  const [studentList, setStudentList] = useState(students);

  async function handleDelete(e) {
    if (window.confirm("Are you sure you want to delete this test event?")) {
      // set delete pending to true
      setDeletePending(true);
      console.log("target", e.target);
      console.log("parent", e.target.parentNode);
      const unitDiv = e.target.closest("div.unit-container");
      console.log("unitDiv", unitDiv);
      const unitID = unitDiv.getAttribute("id");
      console.log("unitID", unitID);
      const studentID = e.target.parentNode.getAttribute("id");
      console.log("studentID", studentID);
      const teacher = e.target.parentNode.getAttribute("teacher");
      console.log("teacher", teacher);

      // send delete request to api
      try {
        const response = await axios.delete("../api/students", {
          data: { studentID: studentID, teacher: teacher, unitID: unitID }
        });
        if (response.status === 200) {
          // if successful, set delete pending to false
          console.log("delete successful, setting delete pending to false");
          setDeletePending(false);
        }
      } catch (error) {
        console.log("error");
        console.log(error);
        alert(error.response?.data);
      }
      // revalidate data
      const res = await axios.get(`../api/students/${teacher}/${unitID}`);
      const newStudents = res.data;
      setStudentList(newStudents.data);
      setDeletePending(false);
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

  const studentElements = studentList?.map((student) => {
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
  });

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
