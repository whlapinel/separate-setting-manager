"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { revalidatePath } from "next/cache";
import Link from "next/link";

const defaultValue = {
  name: "",
  block: ""
};

export default function AddClassForm({ teacher }) {
  const [form, setForm] = useState({
    ...defaultValue,
    teacher: teacher,
    students: [],
    testEvents: []
  });

  const [submitted, setSubmitted] = useState(false); // used to show nav button after form is submitted
  const router = useRouter();

  function handleChange(e) {
    console.log(form);
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("handleSubmit called");
    console.log(form);
    try {
      console.log("posting...");
      const postResponse = await axios.post(
        "../api/test-units",
        JSON.stringify(form)
      );
    } catch (error) {
      console.log(error);
    }
    // make fetch call to revalidate data
    const revalResponse = await fetch(`../api/revalidate?path=../${teacher}`);
    const revalData = await revalResponse.json();
    console.log("revalData", revalData);
    setSubmitted(true);
  }

  return (
    <>
      <h4 className="form-header">Add Class</h4>
      <div className="form-container">
      <form className="add-data-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Class Name</label>
        <input type="text" id="name" name="name" onChange={handleChange} />
        <label htmlFor="block">Block</label>
        <select id="block" name="block" onChange={handleChange}>
          <option value={""}> </option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
        <button type="submit">Add Class</button>
      </form>
      <p className={submitted?"":"hidden"}>Class Created!</p>
      <Link href={`/${teacher}/my-students?reset=true`} className={submitted?"nav-btn":"hidden nav-btn"}>Go to "My Students"</Link>
      </div>
    </>
  );
}
