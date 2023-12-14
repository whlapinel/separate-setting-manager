"use client";

import axios from "axios";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

import UnitContainer from "./unit-container";
import { set } from "date-fns";

export default function UnitList({ testUnits}) {
  const [unitList, setUnitList] = useState(testUnits);
  const [deletePending, setDeletePending] = useState(false);
  console.log('rerendering UnitList (client component');

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
 
  useEffect(() => {
    // reset state if reset searchParam is true
    console.log('searchParams.get("reset")', searchParams.get("reset"));
    if (searchParams.get("reset")) {
      console.log("resetting unitList...");
      setUnitList(testUnits);
      console.log("unitList reset to testUnits");
      console.log('clearing searchParams', searchParams);
      router.replace(pathname);
    }
  }, [pathname, searchParams])



  async function handleDelete(e) {
    console.log("deleting unit");
    console.log("target", e.target);
    console.log("parent", e.target.parentNode);
    console.log("id", e.target.parentNode.getAttribute("id"));
    const id = e.target.parentNode.getAttribute("id");
    const teacher = e.target.closest("div.unit-container").getAttribute("teacher");
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
