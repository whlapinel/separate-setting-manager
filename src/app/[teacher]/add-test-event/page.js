import GetTestData from "@/lib/data";

export default async function AddTestEvent({ params }) {
  let { teacher } = params;
  teacher = teacher.replace("%20", " ");
  const testUnits = await GetTestData(teacher);

  const classList = testUnits.map((unit) => {

    return(
        <option value={unit.name} key={unit.name}>{unit.name}</option>
        );
  });

  return (
    <>
      <h4 className="form-header">Add Test Event</h4>
      <form className="add-data-form">
        <label for="choose-class-select">Choose Class</label>
        <select id="choose-class-select">{classList}</select>
        <label for="choose-class-select">Enter Date</label>
        <input type="date"/>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
