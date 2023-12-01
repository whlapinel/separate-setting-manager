import StudentList from "@/ui/student-list";
import GetTestData from "@/lib/data";
// import { useSearchParams } from "next/navigation";

export default async function MyStudents({ params }) {
  const testUnits = await GetTestData();
  console.log(`params: ${params.teacher}`);
  const teacherParams = params.teacher;
  const teacher = teacherParams.replace('%20',' ');
  console.log(teacher);

  if (!params.teacher) {
    return <p>no user selected</p>;
  } else {
    console.log(testUnits?.length);
    for (const unit of testUnits) {
      console.log(teacher === unit.teacher);
    }
    const userUnits = testUnits.filter((unit) => {
      return unit.teacher === teacher;
    });

    const unitList = userUnits.map((unit) => {
      return (
        <div key={unit.block}>
          <h3>Block: {unit.block}</h3>
          <h4>Students</h4>
          <StudentList unit={unit} teacher={teacher}/>
        </div>
      );
    });

    console.log(unitList);

    return (
      <div className="unit-list">
      { unitList }
      </div>
    )
  }
}
