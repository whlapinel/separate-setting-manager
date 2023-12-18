import DailySchedule from "@/app/calendar/(components)/daily-schedule";
import "@/app/globals.css";
import Link from "next/link";
import addDays from "date-fns/addDays";
import { getStudents, getTestEvents } from "@/lib/data";
import { student } from "@/lib/definitions";
import { log } from "console";

export default async function Calendar({ params }) {
  let week = Number(params.week);

  // get testEvents from database
  const testEvents = await getTestEvents();

  console.log("getTestEvents() in Calendar() (server component)", testEvents);

  const today = new Date();
  const thisMonday: Date = findMonday(today); 
  const viewedMonday = addDays(thisMonday, week * 7);
  let weekDates: Array<Date>= [] ;


  for (let i = 0; i < 5; ++i) {
    let date: Date = new Date(viewedMonday);
    date.setDate(viewedMonday.getDate() + i);
    weekDates.push(date);
  }

  function findMonday(date: Date) {
    let weekDay: number = date.getDay();
    let difference: number = 1 - weekDay;
    date.setDate(difference + date.getDate());
    return date;
  }


const dateList = weekDates.map((date: Date) => {
    return (
      <>
        <DailySchedule
          date={date}
          key={date.toDateString()}
        />
      </>
    );
  });

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
