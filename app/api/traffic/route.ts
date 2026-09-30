import { NextRequest, NextResponse } from "next/server";
import {
  incrementVisitCount,
  getVisitCount,
  getVisitCountInRange,
  pingOnline,
  getOnlineCount,
} from "@/lib/traffic";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as {
      sessionId?: string;
      heartbeatOnly?: boolean;
    };
    const sessionId = typeof body.sessionId === "string" ? body.sessionId : null;

    const [count, realtime] = await Promise.all([
      body.heartbeatOnly ? getVisitCount() : incrementVisitCount(),
      sessionId ? pingOnline(sessionId) : getOnlineCount(),
    ]);
    return NextResponse.json({ count, realtime });
  } catch (err) {
    console.error("[api/traffic] Error:", err);
    return NextResponse.json({ count: 0, realtime: 0 }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const from = new Date(req.nextUrl.searchParams.get("from") ?? "");
    const to = new Date(req.nextUrl.searchParams.get("to") ?? "");
    const hasRange = !isNaN(from.getTime()) && !isNaN(to.getTime());

    const [count, realtime, range] = await Promise.all([
      getVisitCount(),
      getOnlineCount(),
      hasRange ? getVisitCountInRange(from, to) : Promise.resolve(undefined),
    ]);
    return NextResponse.json({ count, realtime, range });
  } catch (err) {
    console.error("[api/traffic] Error:", err);
    return NextResponse.json({ count: 0, realtime: 0 }, { status: 500 });
  }
}
