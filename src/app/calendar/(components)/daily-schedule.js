import '@/app/globals.css';

export default function DailySchedule({date, studentsOnThisDay}) {

  const testRoom = 'placeholder'

  const studentList = studentsOnThisDay.map((student) => {
    return (
        <li
        key={student.id}>{student.name}</li>
    );
  });

  return (
    <div className="daily-container">
      <h4 className="date-header">{date.toDateString()}</h4>
      <p className='room-header'>Room: {testRoom}</p>
      <ul className="list-container">
        <li className="header-row">Students</li>
        {studentList}
        </ul>
    </div>
  );
}
