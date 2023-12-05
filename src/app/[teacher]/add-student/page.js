import "@/app/globals.css";
import GetTestData from "@/lib/data";

export default async function AddStudent({ params }) {
  let { teacher } = params;
  teacher = teacher.replace("%20", " ");
  const testUnits = await GetTestData(teacher);

  const classList = testUnits.map((unit) => {
    return <option value={unit.name} key={unit.name}>{unit.name}</option>;
  });

  return (
    <>
      <h4 className="form-header">Add Student</h4>
      <form className="add-data-form">
        <label for="first-name">First Name</label>
        <input type="text" id="first-name" />
        <label for="first-name">Last Name</label>
        <input type="text" id="last-name" />
        <label for="class">Class</label>
        <select type="select" id="class">
          {classList}
        </select>
      </form>
    </>
  );
}
