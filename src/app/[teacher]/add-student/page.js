import "@/app/globals.css";
import GetTestData from "@/lib/data";
import AddStudentForm from "./(components)/add-student-form";

export default async function AddStudent({ params }) {
  let { teacher } = params;
  teacher = teacher.replace("%20", " ");
  const testUnits = await GetTestData(teacher);

  const classList = testUnits.map((unit) => {
    return (
      <option value={unit.name} key={unit.name}>
        {unit.name}
      </option>
    );
  });

  return (
    <>
    <AddStudentForm
    classList={classList}
    />
    </>
  );
}
