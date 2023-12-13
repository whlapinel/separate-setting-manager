import "@/app/globals.css";
import GetTestData from "@/lib/data";
import AddStudentForm from "./(components)/add-student-form";
import axios from "axios";

export default async function AddStudent({ params }) {
  console.log("rerendering AddStudent (server component)");
  let { teacher } = params;
  teacher = teacher.replace("%20", " ");

  // fetch teacherTestUnits from DB
  let testUnits = [];
  try {
    const testUnitsRes = await axios(` http://localhost:3001/testUnits?teacher=${teacher}`, {cache: "no-cache"});
    testUnits = testUnitsRes.data;
    console.log("testUnits", testUnits);
  } catch (err) {
    console.log(err);
  }

  const classList = testUnits.map((unit) => {
    return (
      <option value={unit.id} key={unit.id}>
        {unit.name}
      </option>
    );
  });

  return (
    <>
    <AddStudentForm
    classList={classList}
    teacher={teacher}
    />
    </>
  );
}
