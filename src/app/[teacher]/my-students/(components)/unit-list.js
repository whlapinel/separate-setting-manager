"use client";

import axios from "axios";

import { useState } from "react";
import { useRouter } from "next/navigation";

import UnitContainer from "./unit-container";

export default function UnitList({ testUnits}) {
  const [unitList, setUnitList] = useState(testUnits);
  const [deletePending, setDeletePending] = useState(false);
  console.log('rerendering UnitList (client component');


  async function handleDelete(e) {
    console.log("deleting unit");
    console.log("target", e.target);
    console.log("parent", e.target.parentNode);
    console.log("id", e.target.parentNode.getAttribute("id"));
    const id = e.target.parentNode.getAttribute("id");
    const teacher = e.target.parentNode.getAttribute("teacher");
    // send request to delete class
    try {
      const res = await axios.delete(`../api/test-units?id=${id}`);
    } catch (error) {
      console.log("error");
      console.log(error);
    }
    // fetch new data
    console.log("fetching new data...");
    try {
      const res = await axios.get(`../api/test-units?teacher=${teacher}`);
      const updatedUnits = res.data;
      console.log(res.data);
      console.log("updatedUnits", updatedUnits);
      setUnitList(updatedUnits);
      setDeletePending(false);
    } catch (err) {
      console.log(err);
    }
  }

  function handleEdit(e) {
    console.log("edit");
  }
  const unitListElements = unitList?.map((unit) => {
    return (
      <UnitContainer unit={unit} key={unit.id} handleDelete={handleDelete} />
    );
  });

  return (
    <>
      <h4 className="form-header">My Students</h4>
      <div className="unit-list">{unitListElements}</div>
    </>
  );
}
