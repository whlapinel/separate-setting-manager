import axios from 'axios';
import { revalidatePath } from 'next/cache';
import {NextResponse} from 'next/server';

// delete class
export async function DELETE(request, {params}) {
  console.log('classrooms route: DELETE');
  console.log("params", params);
  console.log('classID', params.id);
  const { id } = params;
  revalidatePath("/", "layout");
  const url = `http://localhost:3001/testUnits/${id}`;
  console.log("url", url);
  try {
    const data = await axios.delete(url);
    return new NextResponse(data.status);
  } catch (err) {
    console.log(err);
    return new NextResponse(err.message);
  }
}