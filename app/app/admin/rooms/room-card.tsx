import { liveblocks } from "@/lib/liveblocks";
import { RoomData } from "@liveblocks/node";
import { Card } from "primereact/card";

interface RoomCardProps {
  room: RoomData;
}

export async function RoomCard({ room }: RoomCardProps) {
  const { data: users } = await liveblocks.getActiveUsers(room.id);

  return (
    <Card title={room.id}>
      <p>{room.createdAt.toISOString()}</p>
      <p>Active users: {users.length}</p>
      {users.map((user) => (
        <Card key={user.id} title={user.id}>
          <p>Connection ID: {user.connectionId}</p>
        </Card>
      ))}
    </Card>
  );
}
