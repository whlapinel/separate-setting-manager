"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';
import axios from 'axios';

const defaultValue = {
  firstName: "",
  lastName: "",
  studentClass: ""
};

export default function AddStudentForm({ classList, teacher }) {

  const [form, setForm] = useState({...defaultValue, teacher: teacher});
  const router = useRouter();

  function checkForChanges() {

  }

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

    // destructuring form
    const { firstName, lastName, unitID, teacher } = form;

    try {
      const response = await axios.post("../api/students", {firstName, lastName, unitID, teacher});
    } catch (error) {
      console.log(error);
    }
    try {

      // make axios GET call to api/revalidate
      console.log('revalidating...');
      const res = await axios.get(`../api/revalidate?path=/[teacher]/my-students`);
      console.log('revalidation complete.');
    } catch (error) {
      console.log(error);
    }
    console.log("routing user to /${teacher}/my-students");
    router.push(`/${teacher}/my-students`);
  }

  return (
    <>
      <h4 className="form-header">Add Student</h4>
      <form className="add-data-form" onSubmit={handleSubmit}>
        <label htmlFor="first-name">First Name</label>
        <input
          type="text"
          id="first-name"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          required
        />
        <label htmlFor="last-name">Last Name</label>
        <input
          type="text"
          id="last-name"
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          required
        />
        <label htmlFor="class" >Class</label>
        <select
          type="select"
          id="class"
          name="unitID"
          value={form.unitID}
          onChange={handleChange}
          required
        >
          <option value={""}> </option>
          {classList}
        </select>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
