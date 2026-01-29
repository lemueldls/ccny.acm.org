"use client";

// import { Toolbar } from "./toolbar";
import { Avatar, AvatarGroup, Tab, Tabs } from "@heroui/react";
import { Editor } from "@monaco-editor/react";
import { useQuery } from "convex/react";
import { editor } from "monaco-editor";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MonacoBinding } from "y-monaco";
import { Awareness } from "y-protocols/awareness";
import * as Y from "yjs";

import { api } from "@/convex/_generated/api";
import { QuicktimePrompt, Workshop } from "@/lib/workshops";

import { SimpleIconsCss3 } from "../icons/css3";
import { SimpleIconsHtml5 } from "../icons/html5";
import { SimpleIconsJavascript } from "../icons/javascript";
import ShineBorder from "../ui/shine-border";

export type RoomType = "personal" | "host";
export type Language = "html" | "css" | "javascript";

const files = {
  css: "style.css",
  html: "index.html",
  javascript: "script.js",
};

export interface EditorProps {
  workshop: Workshop;
  website: any;
  onFileChange?: (value: { language: Language; value: string }) => void;
}

// const yDoc = new Y.Doc();

// collaborative code editor with undo/redo, live cursors, and live avatars
export function CollaborativeEditor(props: EditorProps) {
  const [editorRef, setEditorRef] = useState<editor.IStandaloneCodeEditor>();

  const [language, setLanguage] = useState<Language>("html");

  const { resolvedTheme } = useTheme();

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
    css: "#1572B6",
    html: "#E34F26",
    javascript: "#F7DF1E",
  }[language];
  const cursor = {
    css: "bg-[#1572B6]",
    html: "bg-[#E34F26]",
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
          theme={resolvedTheme === "dark" ? "vs-dark" : "vs-light"}
          path={files[language]}
          language={language}
          defaultValue={props.website?.[language]}
          options={{
            minimap: { enabled: false },
            padding: { top: 20 },
            readOnly: !props.website,
            tabSize: 2,
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
