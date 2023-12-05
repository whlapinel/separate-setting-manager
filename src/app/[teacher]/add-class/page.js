import GetTestData from "@/lib/data";

export default async function AddClass({ params }) {
  let { teacher } = params;
  teacher = teacher.replace("%20", " ");
  const testUnits = await GetTestData(teacher);

  return (
    <>
      <h4 className="form-header">Add Class</h4>
      <form className="add-data-form">
      <label for="name">Class Name</label>
      <input type="text" id="name"/>
      <label for="block">Block</label>
      <select id="block">
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
