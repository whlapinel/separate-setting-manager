"use client";

import { useEffect, useState } from "react";
import Buttons from "./buttons";
import axios from "axios";

export default function TestEventList({ testEvents, nameOfClass, teacher }) {
  const [deletePending, setDeletePending] = useState(false);
  const [eventList, setEventList] = useState(testEvents);




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
      const eventID = e.target.parentNode.getAttribute("id");
      console.log("eventId", eventID);
      const nameOfClass = e.target.parentNode.getAttribute("nameOfClass");
      console.log("nameOfClass", nameOfClass);
      const teacher = e.target.parentNode.getAttribute("teacher");
      console.log("teacher", teacher);

      // send delete request to api
      try {
        const response = await axios.delete("../api/test-events", {
          data: { eventID: eventID, teacher: teacher, unitID: unitID }
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
      const res = await axios.get(`../api/test-events/${teacher}/${unitID}`);
      const newTestEvents = res.data;
      setEventList(newTestEvents.data);
      setDeletePending(false);
    }
  }

  function handleEdit(e) {
    console.log("edit");
  }

  const testList = eventList?.map((testEvent) => {
    return (
      <>
        <div key={testEvent.name} className={deletePending?"row-container delete-pending":"row-container"}>
          <Buttons
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            id={testEvent.id}
            nameOfClass={nameOfClass}
            teacher={teacher}
          />
          <p>
            {testEvent.testName} - {testEvent.testDate}
          </p>
        </div>
      </>
    );
  });
  return (
    <>
      <div className="test-event-container">{testList}</div>
    </>
  );
}
