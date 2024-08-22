"use client";

import { RoomProvider } from "@/liveblocks.config";
// import { CollaborativeEditor } from "@/components/editor";
import { ClientSideSuspense } from "@liveblocks/react";
import dynamic from "next/dynamic";

const CollaborativeEditor = dynamic(
  async () => {
    const { CollaborativeEditor } = await import("@/components/editor");
    return CollaborativeEditor;
  },
  { ssr: false },
);

export default function Page() {
  return (
    <RoomProvider id="my-room" initialPresence={{}}>
      {/* <ClientSideSuspense fallback="Loading…">
        {() => <CollaborativeEditor />}
      </ClientSideSuspense> */}
      <CollaborativeEditor />
    </RoomProvider>
  );
}
