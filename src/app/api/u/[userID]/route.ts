import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ userID: string }> },
) {
  const url = await params;
  return NextResponse.json(
    { data: null, message: `Connected to User : ${url.userID}` },
    { status: 200, statusText: "Connected" },
  );
}
