import '@/app/globals.css';

import { getStudents, getTestEvents } from '@/lib/data';
import { student } from '@/lib/definitions';
import { testEvent } from '@/lib/definitions';
import { testClass } from '@/lib/definitions';

export default async function DailySchedule({ date }: { date: Date }) {

  const testRoom = 'placeholder'

  console.log("date", date);
  

  const testEventsOnThisDay: Array<testEvent> = await getTestEvents(null, date); {
    console.log("eventsOnThisDay", testEventsOnThisDay);
  }

  const testClassesOnThisDay: Array<string> = testEventsOnThisDay?.map((testEvent) => {
    return testEvent.testClass;
  });

  let studentsOnThisDay: Array<student> = [];

  if (testClassesOnThisDay) {

    for (const testClass of testClassesOnThisDay) {
      const studentsInThisClass: Array<student> = await getStudents(testClass);
      studentsOnThisDay = [...studentsOnThisDay, ...studentsInThisClass];
    }
    
    console.log("students", studentsOnThisDay);
    
  }
    const studentElements: React.ReactNode = studentsOnThisDay?.map((student) => {
      return (
        <li
        key={student.id}>
        <span>
          {student.firstName}
        </span>
        <span> </span>
        <span>
          {student.lastName}
        </span>
      </li>
    );
  });

  return (
    <div className="daily-container">
      <h4 className="date-header">{date.toDateString()}</h4>
      <p className='room-header'>Room: {testRoom}</p>
      <ul className="list-container">
        <li className="header-row">Students</li>
        {studentElements}
      </ul>
    </div>
  );
}
