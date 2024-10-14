import { Liveblocks } from "@liveblocks/node";
import { requireUser } from "@/auth";
import { NextResponse } from "next/server";
import { liveblocks } from "@/lib/liveblocks";

export async function POST(request: Request) {
  const user = await requireUser();

  const groupIds = [];

  if (user.isAdmin) {
    groupIds.push("admin");
  }

  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.id,
      groupIds,
    },
    {
      userInfo: {
        id: user.id,
        name: user.name,
        image: user.image || undefined,
      },
    },
  );

  return new Response(body, { status });
}
