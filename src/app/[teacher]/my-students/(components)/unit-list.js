import TestEventList from "./test-event-list";
import StudentList from "./student-list";

export default function UnitList({ testUnits, teacher }) {
  const userUnits = testUnits.filter((unit) => {
    return unit.teacher === teacher;
  });
  const unitList = userUnits.map((unit) => {
    return (
      <div className="unit-container" key={unit.id} id={unit.id}>
        <h3 key={unit.name}>{unit.name}</h3>
        <h4>Block: {unit.block}</h4>
        <StudentList unit={unit} teacher={teacher} students={unit.students}/>
        <h4>Test Events</h4>
        <TestEventList
          testEvents={unit.testEvents}
          nameOfClass={unit.name}
          teacher={teacher}
        />
      </div>
    );
  });

  return (
    <>
      <h4 className="form-header">My Students</h4>
      <div className="unit-list">{unitList}</div>
    </>
  );
}
