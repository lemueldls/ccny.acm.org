import { NextResponse } from "next/server";
import { requireAdmin } from "@/auth";
import db from "@/lib/db";
import { serializeUser } from "@/lib/users";

export async function GET() {
  await requireAdmin();

  const users = await db.query.users.findMany();

  return NextResponse.json(users.map(serializeUser));
}
