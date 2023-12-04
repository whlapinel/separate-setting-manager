import StudentList from "@/ui/student-list";
import GetTestData from "@/lib/data";

export default async function MyStudents({ params }) {
  const testUnits = await GetTestData();
  const teacher = params.teacher.replace('%20',' ');

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
