import UnitList from "./(components)/unit-list";
import axios from "axios";
import AddClassForm from "./(components)/add-class-form";

export default async function MyStudents({ searchParams, params }) {
  console.log("rerendering MyStudents (server component)");
  let testUnits = [];
  let { teacher } = params;
  teacher = teacher.replace("%20", " ");
  // fetch teacherTestUnits from DB
  try {
    const testUnitsRes = await axios(` http://localhost:3001/testUnits?teacher=${teacher}`);
    testUnits = testUnitsRes.data;
    console.log("testUnits", testUnits);
  } catch (err) {
    console.log(err);
  }
  if (!teacher) {
    return <p>no user selected</p>;
  } else {
    return (
      <>
      <AddClassForm teacher={teacher}/>
        <UnitList testUnits={testUnits} teacher={teacher}/>
      </>
    );
  }
}
