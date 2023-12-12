import GetTestData from "@/lib/data";
import AddTestEventForm from "@/app/[teacher]/add-test-event/(components)/add-test-event-form";

export default async function AddTestEvent({ params }) {
  let { teacher } = params;
  teacher = teacher.replace("%20", " ");
  const testUnits = await GetTestData(teacher);

  const classList = testUnits.map((unit) => {

    return(
        <option value={unit.id} key={unit.id}>{unit.name}</option>
        );
  });

  return (
    <>
    <AddTestEventForm teacher={teacher} classList={classList} />
    </>
  );
}
