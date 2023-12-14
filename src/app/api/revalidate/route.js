import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request) {
  console.log("revalidate route: GET");
  const path = request.nextUrl.searchParams.get("path");

  if (path) {
    revalidatePath(path);
    return Response.json({ revalidated: true, now: Date.now() });
  }

  return Response.json({
    revalidated: false,
    now: Date.now(),
    message: "Missing path to revalidate"
  });
}
