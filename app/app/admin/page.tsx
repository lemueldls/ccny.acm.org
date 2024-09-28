import { liveblocks } from "@/lib/liveblocks";
import { RoomCard } from "./room-card";

export default async function AdminPage() {
  const { data: rooms, nextPage, nextCursor } = await liveblocks.getRooms();

  return (
    <div className="flex max-w-screen-xl flex-col space-y-12 p-8 font-cal text-3xl font-bold dark:text-white">
      <h1>Admin</h1>
      <h2>Active rooms</h2>
      <div>
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
      Next cursor: {nextCursor}
      Next page: {nextPage}
    </div>
  );
}
