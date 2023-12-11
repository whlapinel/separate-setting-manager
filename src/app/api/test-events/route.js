import { NextResponse } from "next/server";
import GetTestData from "@/lib/data";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { add } from "date-fns";
import { nanoid } from "nanoid";

export async function DELETE(request) {
  const data = await request.json();
  revalidatePath("/", "layout");
  console.log("data", data);
  const { eventID, teacher, unitID } = data;
  console.log("eventID", eventID);
  console.log("teacher", teacher);
  console.log("unitID", unitID);
  const testUnits = await GetTestData(teacher);
  const chosenClass = testUnits.find((currClass) => {
    console.log("currClass.id", currClass.id);
    console.log("unitID", unitID);
    console.log(`finding class from test units. current class: ${currClass.name}.  result:`, String(currClass.id) === String(unitID));
    return String(currClass.id) === String(unitID);
  });
  const oldTestEvents = chosenClass?.testEvents;
  console.log(oldTestEvents);
  const updatedTestEvents = oldTestEvents.filter((testEvent) => {
    console.log(testEvent.id !== String(eventID));
    return testEvent?.id !== String(eventID);
  });
  console.log("updatedTestEvents", updatedTestEvents);
  const units = await GetTestData();
  const index = units.findIndex((currClass) => {
    return String(currClass.id) === String(unitID);
  });
  console.log("index", index);
  const url = `http://localhost:3001/testUnits/${index}`;
  console.log("url", url);  
  try {
    const data = await axios.patch(url, { testEvents: updatedTestEvents });
    return new NextResponse(data.status);
  } catch (err) {
    console.log(err);
    return new NextResponse(err.message);
  }
}

export async function PATCH(request) {
  revalidatePath("/", "layout");
  const form = await request.json();
  console.log("form: ", form);
  // destructure form data
  let { teacher, testClass, testName, testDate } = form;
  // convert test date to date object
  let testDateObj = new Date(testDate);
  console.log(testDateObj);
  const offset = testDateObj.getTimezoneOffset();
  console.log(offset);
  testDateObj = testDateObj = add(testDateObj, { minutes: offset });
  console.log(testDateObj);
  testDate = testDateObj.toDateString();

  // create new test event object
  const testObj = { testName, testDate, id: nanoid() };

  // get class object using class name
  const classes = await GetTestData(teacher);
  const chosenClass = classes.find((currClass) => {
    return currClass.name === testClass;
  });

  let updatedTestEvents = [];

  // is testevents property null?
  if (!chosenClass.testEvents) {
    updatedTestEvents = [testObj];
  } else {
    updatedTestEvents = [...chosenClass.testEvents, testObj];
  }

  try {
    const res = await axios.patch(
      `http://localhost:3001/testUnits/${chosenClass.id}`,
      { testEvents: updatedTestEvents }
    );
    console.log(res);
    return new NextResponse(res.status);
  } catch (err) {
    console.log(err);
    return new NextResponse(err.message);
  }
}
