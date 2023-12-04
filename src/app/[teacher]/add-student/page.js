import "@/app/globals.css";
import GetTestData from "@/lib/data";

export default async function AddStudent({ params}) {
  let { teacher } = params;
  teacher = teacher.replace("%20", " ");
  const testUnits = await GetTestData(teacher);


  return (
    <>
      <h3 className="main-header">this will be the add student form</h3>
      <form className="add-student-form">
        <label for="first-name">First Name</label>
        <input type="text" id="first-name" />
        <label for="first-name">Last Name</label>
        <input type="text" id="last-name" />
        <label for="block">Block</label>
        <select type="select" id="block">
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
      </form>
    </>
  );
}
