import db from "@/lib/db";
import { NextResponse } from "next/server";
import { deserializeEvent, serializeEvent } from "@/lib/events";
import { requireAdmin } from "@/auth";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const event = await db.query.events.findFirst({
    where: (events, { eq }) => eq(events.id, params.id),
  });

  if (!event)
    return NextResponse.json({ error: "Event not found" }, { status: 404 });

  return NextResponse.json(serializeEvent(event));
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  await requireAdmin();

  const event = deserializeEvent(await req.json());
  const [insertedEvent] = await db
    .insert(schema.events)
    .values(event)
    .returning();

  return NextResponse.json(serializeEvent(insertedEvent));
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  await requireAdmin();

  const event = deserializeEvent(await req.json());
  const [updatedEvent] = await db
    .update(schema.events)
    .set(event)
    .where(eq(schema.events.id, params.id))
    .returning();

  return NextResponse.json(serializeEvent(updatedEvent));
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  await requireAdmin();

  const [deletedEvent] = await db
    .delete(schema.events)
    .where(eq(schema.events.id, params.id))
    .returning();

  return NextResponse.json(serializeEvent(deletedEvent));
}
