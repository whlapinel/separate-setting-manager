import {NextResponse} from 'next/server';
import GetTestData from '@/lib/data';
import axios from 'axios';
import { revalidatePath } from 'next/cache';
import {nanoid} from 'nanoid';


export async function DELETE(request) {
    const data = await request.json();
    revalidatePath("/", "layout");
    console.log("data", data);
    const { studentID, teacher, unitID } = data;
    console.log("studentID", studentID);
    console.log("teacher", teacher);
    console.log("unitID", unitID);
    const testUnits = await GetTestData(teacher);
    const chosenClass = testUnits.find((currClass) => {
      console.log("currClass.id", currClass.id);
      console.log("unitID", unitID);
      console.log(`finding class from test units. current class: ${currClass.name}.  result:`, String(currClass.id) === String(unitID));
      return String(currClass.id) === String(unitID);
    });
    const oldStudents = chosenClass?.students;
    console.log(oldStudents);
    const updatedStudents = oldStudents.filter((student) => {
      console.log(String(student.id) !== String(studentID));
      return String(student.id) !== String(studentID);
    });
    console.log("updatedStudents", updatedStudents);
    const units = await GetTestData();
    const index = units.findIndex((currClass) => {
      return String(currClass.id) === String(unitID);
    });
    console.log("index", index);
    const url = `http://localhost:3001/testUnits/${index}`;
    console.log("url", url);  
    try {
      const data = await axios.patch(url, { students: updatedStudents });
      return new NextResponse(data.status);
    } catch (err) {
      console.log(err);
      return new NextResponse(err.message);
    }
  }
  
export async function POST(request) {
    revalidatePath('/', 'layout');
    const form = await request.json();
    console.log('form: ', form);
    const {firstName, lastName, studentClass, teacher} = form;
    const studentObj = {name: `${firstName} ${lastName}`}
    studentObj.id = nanoid();
    console.log(studentObj);

    // get old students array for class
    const classes = await GetTestData(teacher);
    const chosenClass = classes.findIndex((currClass) => {
        return currClass.id === studentClass.id;
    });

    const {id} = chosenClass;
    let updatedStudents = [];

    if (!chosenClass.students) {
        updatedStudents = [studentObj];
    } else {
        updatedStudents = [...chosenClass.students, studentObj];
    }

    // send patch request to update students property with new array
    try {
        const res = await axios.patch(`http://localhost:3001/testUnits/${id}`, {students: updatedStudents});
        console.log(res);
        return new NextResponse(res.status);

    } catch (err) {
        console.log(err.message);
        return new NextResponse(err.message);
    }




    return NextResponse.json({firstName, lastName, studentClass, teacher});

}