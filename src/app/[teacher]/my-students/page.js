import StudentList from "@/ui/student-list";
import GetTestData from "@/lib/data";

export default async function MyStudents({ params }) {
  let { teacher } = params;
  teacher = teacher.replace("%20", " ");
  const testUnits = await GetTestData(teacher);
  console.log(testUnits);

  if (!params.teacher) {
    return <p>no user selected</p>;
  } else {
    for (const unit of testUnits) {
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

    return (
      <div className="unit-list">
      { unitList }
      </div>
    )
  }
}
