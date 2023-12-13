import GetTestData from "@/lib/data";
import DailySchedule from "@/app/calendar/(components)/daily-schedule";
import "@/app/globals.css";
import Link from "next/link";
import addDays from "date-fns/addDays";
import axios from "axios";

export default async function Calendar({ params }) {
  let week = Number(params.week);
  const testUnitsRes = await axios.get("http://localhost:3001/testUnits");
  const testUnits = testUnitsRes.data;
  console.log("testUnits in Calendar() (server component)", testUnits);
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

  // studentsByDay is an array of object literals "studentsOnThisDay" with 
  // two properties: students and date.

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
            console.log("studentsByDay", studentsByDay);
          }
        }
      } 
    }
  }


  const dateList = weekDates.map((date) => {
    let studentsOnThisDay = [];
    for (const obj of studentsByDay) {
      console.log(obj.date);
      console.log(date.toDateString());
      if (obj.date === date.toDateString()) {
        studentsOnThisDay = [...studentsOnThisDay, ...obj.students];
        console.log("in dateList: studentsOnThisDay", studentsOnThisDay);
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
