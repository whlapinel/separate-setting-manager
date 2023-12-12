import { NextResponse } from "next/server";
import GetTestData from "@/lib/data";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { add } from "date-fns";
import { nanoid } from "nanoid";

export async function GET(request) {
  const url = request.nextUrl;
  const searchParams = url.searchParams;
  console.log("test-events api route: GET");
  console.log("searchParams", searchParams);
  console.log("searchParams.get('unitID')", searchParams.get("unitID"));
  const unitID = searchParams.get("unitID");
  console.log("unitID", unitID);
  const testEventsRes = await axios.get(`http://localhost:3001/testUnits/${unitID}`);
  const testEvents = testEventsRes.data.testEvents;
  console.log("testEvents", testEvents);
  console.log("sending test events to client");
  return NextResponse.json({ testEvents });
}


export async function DELETE(request) {
  console.log("test-events api route: DELETE");
  const data = await request.json();
  console.log("data", data);
  const { eventID, unitID } = data;
  console.log("eventID", eventID);
  console.log("unitID", unitID);
  // get test unit from DB using unitID
  const oldTestEventsRes = await axios.get(`http://localhost:3001/testUnits/${unitID}`);
  const testClass = oldTestEventsRes.data;
  console.log("testClass", testClass);
  const oldTestEvents = oldTestEventsRes.data.testEvents;
  console.log("oldTestEvents", oldTestEvents);

  // filter out the test event with the matching eventID
  const updatedTestEvents = oldTestEvents?.filter((testEvent) => {
    return String(testEvent.id) !== String(eventID);
  });
  console.log("updatedTestEvents", updatedTestEvents);

  const url = `http://localhost:3001/testUnits/${unitID}`;
  console.log("url", url);  
  // send a patch request to update the test events array in the database
  try {
    const data = await axios.patch(url, { testEvents: updatedTestEvents });
    return new NextResponse(data.status);
  } catch (err) {
    console.log(err);
    return new NextResponse(err.message);
  }
}

export async function PATCH(request) {
  const form = await request.json();
  console.log("form: ", form);
  // destructure form data
  let { unitID, testName, testDate } = form;

  // convert test date to date object
  let testDateObj = new Date(testDate);
  console.log(testDateObj);
  const offset = testDateObj.getTimezoneOffset();
  console.log(offset);
  testDateObj = add(testDateObj, { minutes: offset });
  console.log(testDateObj);
  testDate = testDateObj.toDateString();

  // create new test event object
  const testObj = { testName, testDate, id: nanoid() };

  // get class object using class name
  const testEventClassRes = await axios.get(`http://localhost:3001/testUnits/${unitID}`);
  const testEventClass = testEventClassRes.data;
  console.log("testEventClass", testEventClass);
  let updatedTestEvents = [];

  // if there are no test events, create a new array with the new test event
  if (!testEventClass.testEvents) {
    updatedTestEvents = [testObj];

    // otherwise, add the new test event to the existing array
  } else {
    updatedTestEvents = [...testEventClass.testEvents, testObj];
  }

// update the database with the new test events array
  try {
    const res = await axios.patch(
      `http://localhost:3001/testUnits/${unitID}`,
      { testEvents: updatedTestEvents }
    );
    console.log(res);
    return new NextResponse(res.status);
  } catch (err) {
    console.log(err);
    return new NextResponse(err.message);
  }
}
