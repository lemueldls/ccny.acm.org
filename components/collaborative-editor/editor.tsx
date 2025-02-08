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
import { Avatar, AvatarGroup, Tab, Tabs } from "@heroui/react";
import { SimpleIconsHtml5 } from "../icons/html5";
import { SimpleIconsCss3 } from "../icons/css3";
import { SimpleIconsJavascript } from "../icons/javascript";
import { Room } from "@liveblocks/client";
import { QuicktimePrompt, Workshop } from "@/lib/workshops";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import ShineBorder from "../ui/shine-border";

export type RoomType = "personal" | "host";
export type Language = "html" | "css" | "javascript";

const files = {
  html: "index.html",
  css: "style.css",
  javascript: "script.js",
};

export interface EditorProps {
  workshop: Workshop;
  website: any;
  onFileChange?: (value: { language: Language; value: string }) => void;
}

const yDoc = new Y.Doc();

// Collaborative code editor with undo/redo, live cursors, and live avatars
export function CollaborativeEditor(props: EditorProps) {
  // const room = useRoom();

  // const users = useOthers();
  // const currentUser = useSelf();

  const [editorRef, setEditorRef] = useState<editor.IStandaloneCodeEditor>();
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();
  // const [yDoc, setYDoc] = useState<Y.Doc>(new Y.Doc());
  // const yDoc = useMemo(() => new Y.Doc(), []);
  // const [binding, setBinding] = useState<MonacoBinding>();

  const [language, setLanguage] = useState<Language>("html");

  const [quicktimePrompt, setQuicktimePrompt] = useState<QuicktimePrompt>();
  const [quicktimeAnswer, setQuicktimeAnswer] = useState<string>();

  // // Set up Liveblocks Yjs provider and attach Monaco editor
  // useEffect(() => {
  //   let yProvider: LiveblocksYjsProvider;
  //   let binding: MonacoBinding;

  //   if (editorRef) {
  //     const yText = yDoc.getText(`${room.id}:${file.name}`);
  //     yProvider = new LiveblocksYjsProvider(room, yDoc);
  //     setProvider(yProvider);

  //     // Attach Yjs to Monaco
  //     binding = new MonacoBinding(
  //       yText,
  //       editorRef.getModel() as editor.ITextModel,
  //       new Set([editorRef]),
  //       yProvider.awareness as unknown as Awareness,
  //     );
  //   }

  //   return () => {
  //     yDoc?.destroy();
  //     yProvider?.destroy();
  //     binding?.destroy();
  //   };
  // }, [editorRef, file.name, room, yDoc]);

  // useEventListener(({ event, user, connectionId }) => {
  //   if (event.type === "QUICKTIME") {
  //     const { question, answers, points, time } = event;
  //   }
  // });

  // const handleQuicktimeAnswer = useCallback(async () => {
  //   await fetch(`/api/workshops/${props.workshop.id}/answer`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       answer: file.value,
  //     }),
  //   });
  // }, []);

  const handleOnMount = useCallback((e: editor.IStandaloneCodeEditor) => {
    setEditorRef(e);
  }, []);

  function handleTabChange(key: string | number) {
    setLanguage(key as Language);
  }

  function handleOnChange(value: string | undefined) {
    props.onFileChange?.({ language, value: value || "" });
  }

  const color = {
    html: "#E34F26",
    css: "#1572B6",
    javascript: "#F7DF1E",
  }[language];
  const cursor = {
    html: "bg-[#E34F26]",
    css: "bg-[#1572B6]",
    javascript: "bg-[#F7DF1E]",
  }[language];

  return (
    <div color={color} className="relative flex h-full w-full flex-col">
      {/* {provider ? <Cursors yProvider={provider} /> : null} */}

      <Tabs
        fullWidth
        size="lg"
        variant="underlined"
        // disabledKeys={["style.css", "script.js"]}
        selectedKey={language}
        onSelectionChange={handleTabChange}
        classNames={{ cursor }}
      >
        <Tab
          key="html"
          title={
            <div className="flex items-center space-x-2">
              <SimpleIconsHtml5 />
              <span>{files["html"]}</span>
            </div>
          }
        />
        <Tab
          key="css"
          title={
            <div className="flex items-center space-x-2">
              <SimpleIconsCss3 />
              <span>{files["css"]}</span>
            </div>
          }
        />
        <Tab
          key="javascript"
          title={
            <div className="flex items-center space-x-2">
              <SimpleIconsJavascript />
              <span>{files["javascript"]}</span>
            </div>
          }
        />
      </Tabs>

      <ShineBorder color={color} duration={60} className="w-full flex-1">
        <Editor
          onMount={handleOnMount}
          onChange={handleOnChange}
          height="100%"
          width="100%"
          theme="vs-dark"
          path={files[language]}
          language={language}
          defaultValue={props.website?.[language]}
          options={{
            tabSize: 2,
            padding: { top: 20 },
            readOnly: !props.website,
          }}
        />
      </ShineBorder>
      {/* <div className="flex items-center gap-4 p-4">
        <Tabs
          className="flex-1"
          fullWidth
          size="lg"
          isDisabled
          defaultSelectedKey={props.roomType}
          onSelectionChange={(roomType) =>
            props.onRoomChange?.(roomType as RoomType)
          }
        >
          <Tab
            key="host"
            title={
              <div className="flex items-center space-x-2">
                <span>Host</span>
              </div>
            }
          />
          <Tab
            key="personal"
            title={
              <div className="flex items-center space-x-2">
                <span>Personal</span>
              </div>
            }
          />
        </Tabs>
      </div> */}
    </div>
  );
}
