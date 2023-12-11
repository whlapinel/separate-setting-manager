import StudentList from "@/app/[teacher]/my-students/(components)/student-list";
import GetTestData from "@/lib/data";
import Buttons from "./(components)/buttons";
import UnitList from "./(components)/unit-list";

export default async function MyStudents({ params }) {
  let { teacher } = params;
  teacher = teacher.replace("%20", " ");
  const testUnits = await GetTestData(teacher);

  if (!params.teacher) {
    return <p>no user selected</p>;
  } else {

    return (
      <>
        <UnitList testUnits={testUnits} teacher={teacher}/>
      </>
    );
  }
}
