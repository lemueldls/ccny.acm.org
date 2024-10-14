"use client";

import { useRef, useEffect, useReducer, useState, useCallback } from "react";

import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
  useRoom,
} from "@liveblocks/react/suspense";

import { workshops } from "@/lib/workshops";
import {
  CodeFile,
  CollaborativeEditor,
  RoomType,
} from "@/components/collaborative-editor/editor";
import { Button, CircularProgress } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { User } from "@/auth";
import AdminWorkshopQuicktime from "./quicktime";

export interface WorkshopPageProps {
  params: { slug: string };
}

interface TreeNode {
  tag: string;
  id: string;
  class: string;
  children: TreeNode[];
}

export default function AdminWorkshopPage({ params }: WorkshopPageProps) {
  const id = decodeURIComponent(params.slug);
  const workshop = workshops.find((workshop) => workshop.id === id);

  const [user, setUser] = useState<User>();
  const [roomType, setRoomType] = useState<RoomType>("host");

  const [isMounted, toggle] = useReducer((p) => !p, true);
  const iframe = useRef<HTMLIFrameElement>(null);

  const [html, setHtml] = useState("Loading...");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");

  const { data: session, status } = useSession();
  useEffect(() => {
    setUser(session?.user);
  }, [session]);

  const [tree, setTree] = useState<TreeNode>();

  const [quicktime, setQuicktime] = useState(false);

  useEffect(() => {
    // setRoomKind();
  }, [user]);

  useEffect(() => {
    const website = `${html}`;

    const parser = new DOMParser();
    const doc = parser.parseFromString(website, "text/html");

    function buildTree(node: Element): TreeNode {
      const children = Array.from(node.children).map(buildTree);
      return {
        tag: node.tagName.toLowerCase(),
        id: node.id,
        class: node.className,
        children,
      };
    }

    setTree(buildTree(doc.body));

    if (iframe.current) {
      const doc = iframe.current.contentDocument;

      if (doc) {
        doc.open();
        doc.write(website);
        doc.close();
      }
    }
  }, [html, css, js]);

  // if (status === "loading") return null;
  // const user = session?.user;
  // if (!user) return null;

  function handleOnChange(file: CodeFile) {
    if (file.language === "html") {
      setHtml(file.value);
    } else if (file.language === "css") {
      setCss(file.value);
    } else if (file.language === "javascript") {
      setJs(file.value);
    }
  }

  const roomTypeToId = useCallback(
    (roomType: RoomType) => {
      if (!workshop) throw new Error("Workshop not found");
      if (!user) throw new Error("User not found");

      if (roomType === "host") {
        return `workshop:${workshop.id}:host`;
      } else {
        return `workshop:${workshop.id}:personal:${user.id}`;
      }
    },
    [workshop, user],
  );

  if (!workshop) {
    return <div>Workshop not found</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  // function roomTypeToId(roomType: RoomType) {
  //   if (roomType === "host") {
  //     return `workshop:${workshop.id}:host`;
  //   } else {
  //     return `workshop:${workshop.id}:personal`;
  //   }
  // }

  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
      <RoomProvider id={"workshop:introductory-web:host"}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          <AdminWorkshopQuicktime />
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
