import { NextResponse } from "next/server";
import db from "@/lib/db";
import { deserializeEvent, serializeEvent } from "@/lib/events";
import * as schema from "@/lib/schema";
import { requireAdmin } from "@/auth";

export async function GET() {
  const events = await db.query.events.findMany({
    orderBy: (events, { desc }) => [desc(events.start), desc(events.end)],
  });

  return NextResponse.json(events.map(serializeEvent));
}

export async function POST(req: Request) {
  await requireAdmin();

  const event = deserializeEvent(await req.json());
  const [insertedEvent] = await db
    .insert(schema.events)
    .values(event)
    .returning();

  return NextResponse.json(serializeEvent(insertedEvent));
}
