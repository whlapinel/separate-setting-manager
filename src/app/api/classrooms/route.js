import axios from 'axios';
import { revalidatePath } from 'next/cache';
import {NextResponse} from 'next/server';
import {nanoid} from 'nanoid';


export async function POST(request) {
    console.log(request);
    const form = await request.json();
    console.log('data: ', form);
    const id = nanoid();
    const {name, block, teacher} = form;
    console.log(name);

    try {
        const res = await axios.post(`http://localhost:3001/testUnits`, {name, block, teacher, id})
        revalidatePath('/', 'layout');
        return new NextResponse(res.status);

    } catch (err) {
        console.log(err.message);
        return new NextResponse(err.message);
    }


    // return NextResponse.json({nameOfClass, block});

}