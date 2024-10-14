import { requireUser } from "@/auth";
import { NextResponse } from "next/server";
import { liveblocks } from "@/lib/liveblocks";

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const user = await requireUser();
  const { id: workshopId } = params;

  const groupIds = [];
  if (user.isAdmin) groupIds.push("admin");

  const { id: hostId } = await liveblocks.createRoom(
    `workshop:${workshopId}:host`,
    {
      defaultAccesses: ["room:read", "room:presence:write"],
      groupsAccesses: { admin: ["room:write"] },
    },
  );

  const { id: quicktimeId } = await liveblocks.createRoom(
    `workshop:${workshopId}:quicktime`,
    {
      defaultAccesses: ["room:read", "room:presence:write"],
      groupsAccesses: { admin: ["room:write"] },
    },
  );

  return NextResponse.json({ hostId, quicktimeId });
}
