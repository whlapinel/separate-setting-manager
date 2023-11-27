import GetTestData from "@/lib/data"
import DailySchedule from "@/ui/daily-schedule";

export default async function Calendar() {
    
    const testUnits = await GetTestData();
    const today = new Date();
    const thisMonday = findMonday(today);
    console.log(thisMonday);
  
    let weekDates = [];
    for (let i = 0; i < 5; ++i) {
      let date = new Date(thisMonday);
      date.setDate(thisMonday.getDate() + i);
      console.log(date);
      weekDates.push(date);
    }
  
    function findMonday(date) {
      let weekDay = date.getDay();
      let difference = 1 - weekDay;
      date.setDate(difference + date.getDate());
      return date;
    }
  
    const dateList = weekDates.map((date) => (
      <DailySchedule date={date} testUnits={testUnits} key={date}/>
    ))
  
  
    for (const date of weekDates) {
      console.log(`date: ${date}`);
    }
  
  
    return (
      <div className="weekly-container">
          {dateList}
      </div>
    );
}