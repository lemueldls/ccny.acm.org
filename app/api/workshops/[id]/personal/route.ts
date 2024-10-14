import { requireUser } from "@/auth";
import { NextResponse } from "next/server";
import { liveblocks } from "@/lib/liveblocks";

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  const user = await requireUser();
  const { id: workshopId } = await req.json();

  const roomId = `workshop:${workshopId}:personal:${user.id}`;
  const { id } = await liveblocks.getRoom(roomId).catch(() =>
    liveblocks.createRoom(roomId, {
      defaultAccesses: ["room:read", "room:presence:write"],
      usersAccesses: { [user.id]: ["room:write"] },
      groupsAccesses: { admin: ["room:write"] },
    }),
  );

  return NextResponse.json({ id });
}
