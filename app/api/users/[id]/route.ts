import db from "@/lib/db";
import { NextResponse } from "next/server";
import { requireAdmin, requireUser } from "@/auth";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";
import { deserializeUser, serializeUser } from "@/lib/users";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } },
) {
  await requireAdmin();

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, params.id),
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(serializeUser(user));
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  await requireAdmin();

  const user = deserializeUser(await req.json());
  const [insertedUser] = await db.insert(schema.users).values(user).returning();

  return NextResponse.json(insertedUser);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  await requireAdmin();

  const user = deserializeUser(await req.json());
  const [updatedUser] = await db
    .update(schema.users)
    .set(user)
    .where(eq(schema.users.id, params.id))
    .returning();

  return NextResponse.json(serializeUser(updatedUser));
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  await requireAdmin();

  const [deletedUser] = await db
    .delete(schema.users)
    .where(eq(schema.users.id, params.id))
    .returning();

  return NextResponse.json(serializeUser(deletedUser));
}
