export default function WeeklyCalendar() {
      const today = new Date();
  const thisMonday = findMonday(today);
  let week = 0;

  function advanceWeek() {
    week++;
  }

  function showWeek() {}
  let weekDates = [];
  for (let i = 0; i < 5; ++i) {
    let date = new Date(thisMonday);
    date.setDate(thisMonday.getDate() + i);
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
    console.log("");
    console.log(`date: ${date.toDateString()}`);
    for (const unit of testUnits) {
      console.log(`unit teacher: ${unit.teacher}`);
      for (const testEvent of unit.testEvents) {
        console.log(`testEvent: ${testEvent.testDate}`);
        console.log(
          `date comparison: ${testEvent.testDate === date.toDateString()}`
        );
        if (testEvent.testDate === date.toDateString()) {
          const studentsOnThisDay = {
            students: unit.students,
            date: date.toDateString()
          };
          studentsByDay = [...studentsByDay, studentsOnThisDay];
          console.log(`studentsByDay:`);
          console.log(studentsByDay);
        }
      }
    }
  }

  const dateList2 = weekDates.map((date) => {
    let studentsOnThisDay = [];
    for (const obj of studentsByDay) {
      console.log(obj.date);
      console.log(date.toDateString());
      console.log(
        `date comparison in dateList2: ${obj.date === date.toDateString()}`
      );
      if (obj.date === date.toDateString()) {
        studentsOnThisDay = [...studentsOnThisDay, ...obj.students];
        console.log(`students on ${date}: ${studentsOnThisDay}`);
      }
    }
    return (
      <>
        <button className="advance-week" onClick={advanceWeek}>
          Advance Week
        </button>
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

  return (
    <main>
      <div className="weekly-container">{dateList2}</div>
    </main>
  );
}

    
    
}