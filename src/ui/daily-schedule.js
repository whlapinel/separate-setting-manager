import '@/app/globals.css';

function DailySchedule({date, studentsOnThisDay}) {

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
  console.log('Daily Schedule');
  console.log(date);
console.log(`students on this day:`);
console.log(studentsOnThisDay);

  const studentList = studentsOnThisDay.map((obj) => {
    return (
        <li
        key={obj.id}>{obj.name}</li>
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
