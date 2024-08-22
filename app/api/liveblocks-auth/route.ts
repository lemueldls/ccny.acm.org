import { Liveblocks } from "@liveblocks/node";
import { getSession } from "@/lib/auth";
import { getServerSession } from "next-auth";

const secret = process.env.LIVEBLOCKS_SECRET_API_KEY;
if (!secret) throw new Error("liveblock secret key not found");

const liveblocks = new Liveblocks({ secret });

export async function POST(request: Request) {
  // const {room} = await request.json();

  const { user } = await getSession();

  // // Identify the user and return the result
  const { status, body } = await liveblocks.identifyUser(
    {
      userId: user.id,
      groupIds: [], // Optional
    },
    // { userInfo: user.metadata },
  );

  return new Response(body, { status });
}
