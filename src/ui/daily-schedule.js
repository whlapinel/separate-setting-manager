import '@/app/globals.css';

function DailySchedule({testUnits, date}) {

  let unitsOnThisDay = [];
  let studentsOnThisDay = [];
  const testRoom = 'placeholder'

  function dateCheckEqual(date1, date2) {
    if (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth()
    ) {
      return true;
    } else {
      return false;
    }
  }

  // FIXME I think below could be made much shorter with object destructuring
  for (const unit of testUnits) {
    console.log(unit);
    for (const testEvent of unit.testEvents) {
      console.log(testEvent);
      console.log(testEvent.testDate);
      const testEventDate = new Date(Date.parse(testEvent.testDate));
      if (dateCheckEqual(testEventDate, date)) {
        console.log(
          `dates: ${testEventDate} and ${date} are equal, adding unit to day`
        );
        unitsOnThisDay.push(unit);
        for (const student of unit.students) {
          studentsOnThisDay.push({
            studentName: student.name,
            testName: testEvent.testName,
            teacherName: unit.teacher
          });
        }
      }
    }
  }

  const studentList = studentsOnThisDay.map((student) => {
    return (
        <>
        <li>{student.studentName}</li>
        {/* <li>{student.testName}</li>
        <li>{student.teacherName}</li> */}
        </>
    );
  });

  return (
    <div className="daily-container">
      <h4 className="date-header">{date.toDateString()}</h4>
      <p className='room-header'>Room: {testRoom}</p>
      <ul className="list-container">
        <li className="header-row">Students</li>
        {/* <li className="header-row">Test</li>
        <li className="header-row">Teacher</li> */}
        {studentList}
        </ul>
    </div>
  );
}

export default DailySchedule;
