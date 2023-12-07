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
      const response = await axios.post("../api/students", JSON.stringify(form));
      router.push("/");
    } catch (error) {
      alert(error.response.data);
    }
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
          name="studentClass"
          value={form.studentClass}
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
