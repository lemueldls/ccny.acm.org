"use client";

import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import {
  useEventListener,
  useOthers,
  useRoom,
  useSelf,
} from "@liveblocks/react/suspense";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { MonacoBinding } from "y-monaco";
import { Awareness } from "y-protocols/awareness";
// import { Toolbar } from "./toolbar";
import { Avatar, AvatarGroup, Tab, Tabs } from "@nextui-org/react";
import { Room } from "@liveblocks/client";
import { QuicktimePrompt, Workshop } from "@/lib/workshops";

export type RoomType = "personal" | "host";

export interface CodeFile {
  name: string;
  language: string;
  value: string;
}

const files: { [key: string]: CodeFile } = {
  "index.html": {
    name: "index.html",
    language: "html",
    value: "",
  },
  "style.css": {
    name: "style.css",
    language: "css",
    value: "",
  },
  "script.js": {
    name: "script.js",
    language: "javascript",
    value: "",
  },
};

export interface EditorProps {
  roomType: RoomType;
  workshop: Workshop;
  onFileChange?: (value: CodeFile) => void;
  onRoomChange?: (roomType: RoomType) => void;
}

// Collaborative code editor with undo/redo, live cursors, and live avatars
export function CollaborativeEditor(props: EditorProps) {
  const users = useOthers();
  const currentUser = useSelf();

  return (
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
  );
}
