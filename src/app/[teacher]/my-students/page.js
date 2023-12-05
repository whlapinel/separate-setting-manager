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
        <div className="unit-container" key={unit.name}>
          <h4 key={unit.name}>Class: {unit.name}</h4>
          <h4>Block: {unit.block}</h4>
          <h5>Students</h5>
          <StudentList unit={unit} teacher={teacher}/>
        </div>
      );
    });

    return (
      <>
      <h4 className="form-header">My Students</h4>
      <div className="unit-list">
      { unitList }
      </div>
      </>
    )
  }
}
