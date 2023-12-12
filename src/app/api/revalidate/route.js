import { revalidatePath } from "next/cache";
import { NextResponse } from 'next/server';


export async function GET(request) {
    console.log('revalidate route: GET');
    const url = request.nextUrl;
    const searchParams = url.searchParams;
    console.log('searchParams', searchParams);
    console.log('searchParams.get("path")', searchParams.get('path'));
    const path = searchParams.get('path');
    revalidatePath(path, 'page');
    revalidatePath(`/calendar/[week]`, 'page'); // revalidate the calendar page
    console.log('path revalidated');
    return new NextResponse(200);
}