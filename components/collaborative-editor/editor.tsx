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
import { Cursors } from "./cursors";
// import { Toolbar } from "./toolbar";
import { Avatar, AvatarGroup, Tab, Tabs } from "@nextui-org/react";
import { SimpleIconsHtml5 } from "../icons/html5";
import { SimpleIconsCss3 } from "../icons/css3";
import { SimpleIconsJavascript } from "../icons/javascript";
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
  workshop: Workshop;
  // roomType: RoomType;
  // onRoomChange?: (roomType: RoomType) => void;
  onFileChange?: (value: CodeFile) => void;
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

  const [file, setFile] = useState(files["index.html"]);

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
    setFile(files[key as string]);
  }

  function handleOnChange(value: string | undefined) {
    props.onFileChange?.({
      name: file.name,
      language: file.language,
      value: value || "",
    });
  }

  return (
    <div className="relative flex h-full w-full flex-col">
      {/* {provider ? <Cursors yProvider={provider} /> : null} */}

      <Tabs
        fullWidth
        size="lg"
        variant="underlined"
        // disabledKeys={["style.css", "script.js"]}
        selectedKey={file.name}
        onSelectionChange={handleTabChange}
      >
        <Tab
          key="index.html"
          title={
            <div className="flex items-center space-x-2">
              <SimpleIconsHtml5 />
              <span>index.html</span>
            </div>
          }
        />
        <Tab
          key="style.css"
          title={
            <div className="flex items-center space-x-2">
              <SimpleIconsCss3 />
              <span>style.css</span>
            </div>
          }
        />
        <Tab
          key="script.js"
          title={
            <div className="flex items-center space-x-2">
              <SimpleIconsJavascript />
              <span>script.js</span>
            </div>
          }
        />
      </Tabs>

      <div className="relative flex-1">
        <Editor
          onMount={handleOnMount}
          onChange={handleOnChange}
          height="100%"
          width="100%"
          theme="vs-dark"
          path={file.name}
          language={file.language}
          defaultValue={file.value}
          options={{
            tabSize: 2,
            padding: { top: 20 },
            // readOnly: !currentUser.canWrite,
          }}
        />
      </div>
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
