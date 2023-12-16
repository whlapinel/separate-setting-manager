"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
import Link from "next/link";

const defaultValue = {
  teacher: "",
  testClass: "",
  testName: "",
  testDate: "",
};

export default function AddTestEventForm({ teacher, classList }) {
  const router = useRouter();
  const [form, setForm] = useState({defaultValue});
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.patch(
        "../api/test-events",
        JSON.stringify(form)
      );
    } catch (error) {
      alert(error.response.data);
    }
    setSubmitted(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
    console.log(form);
  }

  return (
    <>
      <h4 className="form-header">Add Test Event</h4>
      <div className="form-container">
      <form className="add-data-form" onSubmit={handleSubmit}>
        <label htmlFor="choose-class-select">Choose Class</label>
        <select
          id="choose-class-select"
          name="unitID"
          required
          onChange={handleChange}
        >
          <option value={''}> </option>

          {classList}
        </select>
        <label htmlFor="date">Enter Date</label>
        <input
          id="date"
          type="date"
          name="testDate"
          required
          onChange={handleChange}
        />
        <label htmlFor="test-name">Enter Test Name</label>
        <input
          id="test-name"
          type="text"
          name="testName"
          required
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      <p className={submitted?"":"hidden"}>Test Event Created!</p>
      <Link href={`/${teacher}/my-students`} className={submitted?"nav-btn":"hidden nav-btn"}>Go to "My Students"</Link>
      </div>
    </>
  );
}
