import { useCallback } from "react";

import { useOthers, useSelf } from "@liveblocks/react/suspense";

import { Avatar, AvatarGroup } from "@nextui-org/react";
import AdminWorkshopQuicktimeQuestionCard from "./prompt-card";

import { prompts } from "@/lib/workshops";

export default function AdminWorkshopQuicktime() {
  const users = useOthers();
  const currentUser = useSelf();

  return (
    <div className="flex flex-col gap-4">
      {prompts.map((prompt, index) => (
        <AdminWorkshopQuicktimeQuestionCard key={index} prompt={prompt} />
      ))}

      <AvatarGroup isBordered max={10}>
        {users.map(({ connectionId, info }) => (
          <Avatar
            key={connectionId}
            src={info.image}
            name={info.name}
            // size="sm"
          />
        ))}

        {currentUser && (
          <Avatar
            key={currentUser.connectionId}
            src={currentUser.info.image}
            name={currentUser.info.name}
            // size="sm"
          />
        )}
      </AvatarGroup>
    </div>
  );
}
