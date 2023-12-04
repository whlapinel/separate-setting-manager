import GetTestData from "@/lib/data";
import DailySchedule from "@/ui/daily-schedule";
import "@/app/globals.css";
import Link from 'next/link';
import addDays from 'date-fns/addDays'

export default async function Calendar({params}) {
  let week = Number(params.week);
  const testUnits = await GetTestData();
  const today = new Date();
  // console.log(today);
  const thisMonday = findMonday(today);
  const viewedMonday = addDays(thisMonday, (week * 7));
  // console.log(viewedMonday);

  function showWeek() {}

  let weekDates = [];
  for (let i = 0; i < 5; ++i) {
    let date = new Date(viewedMonday);
    date.setDate(viewedMonday.getDate() + i);
    weekDates.push(date);
  }

  function findMonday(date) {
    let weekDay = date.getDay();
    let difference = 1 - weekDay;
    date.setDate(difference + date.getDate());
    return date;
  }

  let studentsByDay = [];

  for (const date of weekDates) {
    // console.log("");
    // console.log(`date: ${date.toDateString()}`);
    for (const unit of testUnits) {
      // console.log(`unit teacher: ${unit.teacher}`);
      for (const testEvent of unit.testEvents) {
        // console.log(`testEvent: ${testEvent.testDate}`);
        // console.log(
          // `date comparison: ${testEvent.testDate === date.toDateString()}`
        // );
        if (testEvent.testDate === date.toDateString()) {
          const studentsOnThisDay = {
            students: unit.students,
            date: date.toDateString()
          };
          studentsByDay = [...studentsByDay, studentsOnThisDay];
          // console.log(`studentsByDay:`);
          // console.log(studentsByDay);
        }
      }
    }
  }

  const dateList2 = weekDates.map((date) => {
    let studentsOnThisDay = [];
    for (const obj of studentsByDay) {
      console.log(obj.date);
      console.log(date.toDateString());
      // console.log(
      //   `date comparison in dateList2: ${obj.date === date.toDateString()}`
      // );
      if (obj.date === date.toDateString()) {
        studentsOnThisDay = [...studentsOnThisDay, ...obj.students];
        // console.log(`students on ${date}: ${studentsOnThisDay}`);
      }
    }
    return (
      <>
        <DailySchedule
          date={date}
          studentsOnThisDay={studentsOnThisDay}
          key={date}
        />
      </>
    );
  });

  // const dateList = weekDates.map((date) => (
  //   <DailySchedule date={date} testUnits={testUnits} key={date}/>
  // ))

  // FIXME hrefs aren't right
  return (
    <main>
      <div className="cal-nav-btn-container">
        <Link className="retreat-week" href={`/calendar/${week - 1}`}>Previous Week</Link>
        <Link className="advance-week" href={`/calendar/${week + 1}`}>Next Week</Link>
      </div>
      <div className="weekly-container">{dateList2}</div>
    </main>
  );
}
