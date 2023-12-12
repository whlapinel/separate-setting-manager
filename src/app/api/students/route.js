import { NextResponse } from "next/server";
import GetTestData from "@/lib/data";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { nanoid } from "nanoid";

const baseURL = `http://localhost:3001/testUnits`;

export async function GET(request) {
  console.log("api/students GET route...");
  const url = request.nextUrl;
  const searchParams = url.searchParams;
  console.log("searchParams", searchParams);
  console.log("searchParams.get('unitID')", searchParams.get("unitID"));
  const unitID = searchParams.get("unitID");
  console.log("unitID", unitID);
  const studentsRes = await axios.get(`http://localhost:3001/testUnits/${unitID}`);
  const students = studentsRes.data.students;
  console.log("students", students);
  console.log("sending students to client");
  return NextResponse.json({ students });
}

export async function DELETE(request) { // need classID, studentID
  // get the classID and studentID from the request body
  console.log('api/students DELETE route...');
  const data = await request.json();
  const { studentID, unitID } = data;
  console.log("studentID", studentID);
  console.log("unitID", unitID);

  // get the class from the database
  const res = await axios.get(`http://localhost:3001/testUnits/${unitID}`);
  const chosenClass = res.data;

  // get the students array from the class
  console.log("chosenClass", chosenClass);
  const oldStudents = chosenClass?.students;
  console.log("oldStudents", oldStudents);

  // filter the students array to remove the student with the matching studentID
  const updatedStudents = oldStudents.filter((student) => {
    console.log(String(student.id) !== String(studentID));
    return String(student.id) !== String(studentID);
  });
  console.log("updatedStudents", updatedStudents);

  // send a patch request to update the students array in the database
  try {
    const data = await axios.patch(`http://localhost:3001/testUnits/${unitID}`, {
      students: updatedStudents
    });
    return new NextResponse(data.status);
  } catch (err) {
    console.log(err);
    return new NextResponse(err.message);
  }
}

export async function POST(request) {
  const form = await request.json();
  console.log("form: ", form);
  const { firstName, lastName, unitID} = form;
  const studentObj = { name: `${firstName} ${lastName}` };
  studentObj.id = nanoid();
  console.log(studentObj);

  // get old students array for class
  const res = await axios.get(`http://localhost:3001/testUnits/${unitID}`);
  const chosenClass = res.data;
  let updatedStudents = [];

  if (!chosenClass.students) {
    updatedStudents = [studentObj];
  } else {
    updatedStudents = [...chosenClass?.students, studentObj];
  }
  console.log("updated students: ", updatedStudents);

  // send patch request to update students property with new array
  try {
    const res = await axios.patch(`http://localhost:3001/testUnits/${unitID}`, { students: updatedStudents });
    return new NextResponse(res.status);
  } catch (err) {
    console.log(err.message);
    return new NextResponse(err.message);
  }
}
