'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from 'axios';

const defaultValue = {
    name: '',
    block: '',
  }
  
  export default function AddClassForm({ teacher }) {
  
    const [form, setForm] = useState({...defaultValue, teacher: teacher})
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
      setForm({...form,
        teacher: teacher,
      })
      try {
        const response = await axios.post("../api/classrooms", JSON.stringify(form));
        router.push(`/${teacher}`);
      } catch (error) {
        alert(error.response.data);
      }
    }
  
  
  
  
    return (
      <>
        <h4 className="form-header">Add Class</h4>
        <form className="add-data-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Class Name</label>
        <input type="text" id="name" name="name" onChange={handleChange}/>
        <label htmlFor="block">Block</label>
        <select id="block" name="block" onChange={handleChange}>
          <option value={''}> </option>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
        <button type="submit">Add Class</button>
        </form>
      </>
    );
  }
  