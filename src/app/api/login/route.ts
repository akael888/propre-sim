import { getData } from "@/app/lib/action";
import { NextResponse } from "next/server";

export async function GET() {
  //   return new Response("Hello This is Login", {
  //     status: 200,
  //     headers: { "Content-type": "text/plain" },
  //   });

  const sourceData = await getData();

  return NextResponse.json(
    { data: sourceData },
    { status: 200, statusText: "completed" },
  );
}
