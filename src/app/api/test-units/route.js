import axios from 'axios';
import { revalidatePath } from 'next/cache';
import {NextResponse} from 'next/server';
import {nanoid} from 'nanoid';
import { NextURL } from 'next/dist/server/web/next-url';

export async function GET(request) {
  const url = request.nextUrl;
  const searchParams = url.searchParams;
  const teacher = searchParams.get('teacher');
  if (teacher) {
    const teacherTestUnitsRes = await axios.get(`http://localhost:3001/testUnits?teacher=${teacher}`);
    console.log('teacherUnitsRes.data', teacherTestUnitsRes.data);
    const teacherTestUnits = teacherTestUnitsRes.data; 
    return NextResponse.json(teacherTestUnits);
  }
  if (id) {
    console.log('no teacher searchParam... returning unit by ID');
    const id = searchParams.get('id');
    console.log(id);
    const testUnitsRes = await axios.get(`http://localhost:3001/testUnits/${id}`);
    const testUnits = testUnitsRes.data;
    return NextResponse.json(testUnits);
  } 

}


export async function POST(request) {
  // create new test unit
  console.log('POST request received for test-units');
    const form = await request.json();
    console.log('data: ', form);
    const id = nanoid();
    const students = [];
    const testEvents = [];
    const {name, block, teacher} = form;
    console.log(name);
    try {
        const res = await axios.post(`http://localhost:3001/testUnits`, {name, block, teacher, id, students, testEvents})
        return new NextResponse(res.status);
    } catch (err) {
        console.log(err.message);
        return new NextResponse(err.message);
    }
}

// delete class
export async function DELETE(request) {
  console.log('DELETE request received for test-units');
  const url = request.nextUrl;
  const searchParams = url.searchParams;
  const id = searchParams.get('id');
  console.log(id);
  try {
    const data = await axios.delete(`http://localhost:3001/testUnits/${id}`);
    console.log('delete request status: ', data.status);
    return new NextResponse(data.status);
  } catch (err) {
    console.log(err);
    return new NextResponse(err.message);
  }
}