import { NextRequest, NextResponse } from "next/server";
import { incrementVisitCount, getVisitCount } from "@/lib/traffic";

export async function POST() {
  try {
    const count = await incrementVisitCount();
    return NextResponse.json({ count });
  } catch (err) {
    console.error("[api/traffic] Error:", err);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const count = await getVisitCount();
    return NextResponse.json({ count });
  } catch (err) {
    console.error("[api/traffic] Error:", err);
    return NextResponse.json({ count: 0 }, { status: 500 });
  }
}
