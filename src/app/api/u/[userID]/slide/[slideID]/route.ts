import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userID: string; slideID: string } },
) {
  const url = await params;

  const f

  return NextResponse.json(
    {
      data: null,
      message: `Connected to Slide (${url.slideID}) for this user: ${url.userID}`,
    },
    { status: 200, statusText: "Connected" },
  );
}
