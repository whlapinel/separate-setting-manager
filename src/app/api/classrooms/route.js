import axios from 'axios';
import { revalidatePath } from 'next/cache';
import {NextResponse} from 'next/server';
import {nanoid} from 'nanoid';


export async function POST(request) {
    console.log(request);
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


    // return NextResponse.json({nameOfClass, block});

}

// delete class
export async function DELETE(request) {
    const data = await request.json();
    revalidatePath("/", "layout");
    console.log("data", data);
    const { classID, teacher } = data;
    console.log("classID", classID);
    console.log("teacher", teacher);
    const url = `http://localhost:3001/testUnits/${classID}`;
    console.log("url", url);
    try {
      const data = await axios.delete(url);
      return new NextResponse(data.status);
    } catch (err) {
      console.log(err);
      return new NextResponse(err.message);
    }
  }