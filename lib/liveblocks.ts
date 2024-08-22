import { Liveblocks } from "@liveblocks/node";

const secret = process.env.LIVEBLOCKS_SECRET_API_KEY;
if (!secret) throw new Error("liveblock secret key not found");

export const liveblocks = new Liveblocks({ secret });
