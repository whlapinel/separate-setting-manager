import DailySchedule from "@/app/teacher/calendar/(components)/daily-schedule";
import CalNavBtn from "../(components)/cal-nav-btn";
import addDays from "date-fns/addDays";
import { getStudents, getTestEvents } from "@/lib/data";
import { student } from "@/lib/definitions";
import { log } from "console";
import { currentUser } from "@clerk/nextjs";
import checkAuthorization from "@/lib/authorization";
import { redirect } from "next/navigation";
import { testRoom } from "@/lib/definitions";
import { roomAssignment } from "@/lib/definitions";
import { isWithinInterval } from "date-fns";
import { Client } from "pg";
import type { Interval } from "date-fns"
import type { assignmentMap, studentRoomAssignment, testEvent } from "@/lib/definitions"

export default async function Calendar({ params }) {
  let week = Number(params.week);

  const {userID} = params;

  // get testEvents from database
  const testEvents = await getTestEvents();

  console.log("getTestEvents() in Calendar() (server component)", testEvents);

  const today = new Date();
  const thisMonday: Date = findMonday(today);
  const viewedMonday = addDays(thisMonday, week * 7);
  let weekDates: Array<Date> = [];

  for (let i = 0; i < 5; ++i) {
    let date: Date = new Date(viewedMonday);
    date.setDate(viewedMonday.getDate() + i);
    weekDates.push(date);
  }
  const roomAssignments: Array<roomAssignment> = await getAllRoomAssignments();
  const testRooms: assignmentMap = await getTestRooms(weekDates);

  function findMonday(date: Date) {
    let weekDay: number = date.getDay();
    let difference: number = 1 - weekDay;
    date.setDate(difference + date.getDate());
    return date;
  }

  async function getAllRoomAssignments(): Promise<Array<roomAssignment>> {
    let roomAssignments: Array<roomAssignment>;
    const client = new Client();
    await client.connect();
    try {
      const res = await client.query(
        `SELECT * FROM "roomAssignments";`
      );
      roomAssignments = res.rows;
      console.log("roomAssignments", roomAssignments);
    } catch (err) {
      console.log(err);
    } finally {
      await client.end();
    }
    return roomAssignments;
  }

  async function getTestRooms(weekDates: Array<Date>): Promise<assignmentMap> {
    // for each date in weekDates, search through testIntervals to see if date falls within interval.
    console.log('Calendar.getTestRooms: running...');
    let assignmentMap: assignmentMap = new Map();
    for (const date of weekDates) {
      console.log('Calendar.getTestRooms(): looping through dates. date: ', date);
      let room: string;

      

      // look for all room assignments whose dates coincide with date, return array of room assignments.  
      const filteredAssignments: Array<roomAssignment> = roomAssignments.filter((roomAssignment: roomAssignment) => {
        return (
          isWithinInterval(
            date,
            {
              start: roomAssignment.startDate,
              end: roomAssignment.endDate,
            },
          ));
      }
      );
      // if this is null then there are no rooms assigned for that date.
      if (!filteredAssignments) {
        console.log('Calendar.getTestRooms(): interval was null or undefined');
        room = "No Room Assigned";
      } else {
        // need to change this, need to check availability first which isn't possible without student counts
        room = 'placeholder... there are 1+ rooms available';

        // loop through each date, get testClasses and testStudents
        for (const date of weekDates ) {
          console.log('looping through for date: ' + date);
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
          // assign students to rooms in groups of 12, in priority order
          // split studentsOnThisDay into slices of 12
          
          const oneToOneStudents = studentsOnThisDay.filter((student) => {
            return student.accommodation === '1:1'
          });
          const twelveOrFewerStudents = studentsOnThisDay.filter((student) => {
            return student.accommodation !== '1:1'
          })
          const primaryStudents = twelveOrFewerStudents.slice(0, 12);
          const secondaryStudents = twelveOrFewerStudents.slice(12, 24);
          const tertiaryStudents = twelveOrFewerStudents.slice(24, 36);

          console.log("primaryStudents: " + primaryStudents);
          // is there a filteredRoomAssignment with designation of primary (should only be 1)?

          let studentRoomAssignments: studentRoomAssignment[];

          const primaryRoomAssignment = filteredAssignments.find((roomAssignment) => {
            return roomAssignment.desig === 'primary';
          })
          const secondaryRoomAssignment = filteredAssignments.find((roomAssignment) => {
            return roomAssignment.desig === 'secondary';
          })
          const tertiaryRoomAssignment = filteredAssignments.find((roomAssignment) => {
            return roomAssignment.desig === 'tertiary';
          })
          const oneToOneRoomAssignment = filteredAssignments.find((roomAssignment) => {
            return roomAssignment.desig === '1:1';
          })

          assignmentMap.set(date, [
            {
              room: primaryRoomAssignment?.roomNumber,
              students: primaryStudents,
            },
            {
              room: secondaryRoomAssignment?.roomNumber,
              students: secondaryStudents,
            },
            {
              room: tertiaryRoomAssignment?.roomNumber,
              students: tertiaryStudents,
            },
            {
              room: oneToOneRoomAssignment?.roomNumber,
              students: oneToOneStudents,
            },
          ])
        }
      }
      console.log('Calendar.getTestRooms(): ', assignmentMap.get(date));
    }

    return assignmentMap;
  }


  const dateList = weekDates.map((date: Date) => {
    return (
      <div className="flex flex-col">
      <DailySchedule
      date={date}
      key={date.toDateString()}
      assignments={testRooms.get(date)}
      />
      </div>
    );
  });

  const calNavBtns = [
    { name: "Previous Week", link: `/teacher/calendar/${week - 1}` },
    { name: "This Week", link: `/teacher/calendar/0` },
    { name: "Next Week", link: `/teacher/calendar/${week + 1}` }
  ].map((btn) => {
    return (
      <CalNavBtn name={btn.name} link={btn.link} key={btn.name} />
    )
  })

  return (
    <>
      <div className="flex justify-center gap-2">
        {calNavBtns}
      </div>
      <div className=" flex justify-center gap-4 p-4">{dateList}</div>
    </>
  );
}
