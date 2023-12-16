"use client";

import { useEffect, useState } from "react";
import Buttons from "./buttons";
import axios from "axios";
import { Fragment } from "react";

export default function TestEventList({
  testEvents,
  nameOfClass,
  unitID,
  teacher
}) {
  const [deletePending, setDeletePending] = useState(false);
  const [eventList, setEventList] = useState(testEvents);
  console.log("rerendering TestEventList (client component)");

  async function handleDelete(e) {
    // set delete pending to true
    setDeletePending(true);
    const eventID = e.target.parentNode.getAttribute("id");
    console.log("eventId", eventID);
    const unitDiv = e.target.closest("div.unit-container");
    const unitID = unitDiv.getAttribute("id");
    console.log("unitID", unitID);

    // send delete request to api
    try {
      const response = await axios.delete("../api/test-events", {
        data: { eventID: eventID, unitID: unitID }
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
    console.log("revalidating...");
    try {
      const revalRes = await axios.get(
        `../api/revalidate?path=/[teacher]/my-students`
      );
      console.log("revalidation complete.");
    } catch (err) {
      console.log(err);
    }
    // fetch new data
    console.log("fetching new data...");
    try {
      const res = await axios.get(`../api/test-events?unitID=${unitID}`);
      const newTestEvents = res.data.testEvents;
      console.log("newTestEvents", newTestEvents);
      setEventList(newTestEvents);
      setDeletePending(false);
    } catch (err) {
      console.log(err);
    }
  }

  function handleEdit(e) {
    console.log("edit");
  }

  const eventElements = !eventList ? (
    <p>no events</p>
  ) : (
    eventList.map((testEvent) => {
      return (
        <Fragment key={testEvent.id}>
          <div
            id={testEvent.id}
            className={
              deletePending ? "row-container delete-pending" : "row-container"
            }
          >
            <Buttons
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              id={testEvent.id}
              unitID={unitID}
            />
            <div>
              <p>{testEvent.testName}</p>
              <p>{testEvent.testDate}</p>
            </div>
          </div>
        </Fragment>
      );
    })
  );

  return (
    <>
      <div className="test-event-container">{eventElements}</div>
    </>
  );
}
