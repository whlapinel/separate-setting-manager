import GetTestData from "@/lib/data";
import DailySchedule from "@/app/calendar/(components)/daily-schedule";
import "@/app/globals.css";
import Link from "next/link";
import addDays from "date-fns/addDays";

export default async function Calendar({ params }) {
  let week = Number(params.week);
  const testUnits = await GetTestData();
  const today = new Date();
  const thisMonday = findMonday(today);
  const viewedMonday = addDays(thisMonday, week * 7);
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
    for (const unit of testUnits) {
      if (unit.testEvents) {
        for (const testEvent of unit.testEvents) {
          if (testEvent.testDate === date.toDateString()) {
            const studentsOnThisDay = {
              students: unit.students,
              date: date.toDateString()
            };
            studentsByDay = [...studentsByDay, studentsOnThisDay];
          }
        }
      } 
    }
  }

  const dateList = weekDates.map((date) => {
    let studentsOnThisDay = [];
    for (const studentArr of studentsByDay) {
      console.log(studentArr.date);
      console.log(date.toDateString());
      if (studentArr.date === date.toDateString()) {
        studentsOnThisDay = [...studentsOnThisDay, ...studentArr.students];
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

  // FIXME hrefs aren't right
  return (
    <main>
      <div className="cal-nav-btn-container">
        <Link className="retreat-week" href={`/calendar/${week - 1}`}>
          Previous Week
        </Link>
        <Link className="advance-week" href={`/calendar/${week + 1}`}>
          Next Week
        </Link>
      </div>
      <div className="weekly-container">{dateList}</div>
    </main>
  );
}
