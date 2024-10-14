"use client";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import {
  liveblocksConfig,
  LiveblocksPlugin,
  FloatingThreads,
  FloatingComposer,
  AnchoredThreads,
} from "@liveblocks/react-lexical";
import { Toolbar } from "./toolbar";
import { Threads } from "./threads";

export function Editor() {
  // Wrap your Lexical config with `liveblocksConfig`
  const initialConfig = liveblocksConfig({
    namespace: "Demo",
    onError: (error: unknown) => {
      console.error(error);
      throw error;
    },
  });

  const threads = [];

  return (
    <LexicalComposer initialConfig={initialConfig}>
      {/* <Toolbar /> */}
      <div className="relative w-full h-full">
        <RichTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={<div className="placeholder">Start typing here…</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <LiveblocksPlugin>
          {/* <Threads /> */}
          {/* <FloatingThreads /> */}
          <FloatingComposer />
          {/* <AnchoredThreads /> */}
        </LiveblocksPlugin>
      </div>
    </LexicalComposer>
  );
}
