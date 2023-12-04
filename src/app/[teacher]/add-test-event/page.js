import GetTestData from "@/lib/data";

export default async function AddTestEvent({ params }) {
  let { teacher } = params;
  teacher = teacher.replace("%20", " ");
  const testUnits = await GetTestData(teacher);

  const classList = testUnits.map((unit) => {

    return(
        <option value={unit.name}>{unit.name}</option>
        );
  });

  return (
    <>
      <h3>Add Test Event</h3>
      <form className="add-test-event-form">
        <label for="choose-class-select"></label>
        <select id="choose-class-select">{classList}</select>
      </form>
    </>
  );
}
