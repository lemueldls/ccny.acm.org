"use client";

import { useRef, useEffect, useReducer, useState } from "react";

import { useOthers, useSelf } from "@liveblocks/react/suspense";

import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";

import { QuicktimePrompt, workshops } from "@/lib/workshops";
import { CollaborativeEditor } from "@/components/collaborative-editor/editor";
import {
  Avatar,
  AvatarGroup,
  Button,
  CircularProgress,
} from "@nextui-org/react";
import MarkdownRenderer from "@/components/markdown-renderer";

export interface QuicktimeProps {
  prompt: QuicktimePrompt;
  onEnd(answerIndex: number | undefined): void;
}

const initialTimer = 20;

export default function Quicktime(props: QuicktimeProps) {
  const { prompt, onEnd } = props;

  const [timer, setTimer] = useState(initialTimer);
  const [answer, setAnswer] = useState<number>();

  let i = 0;

  // const users = useOthers();
  // const currentUser = useSelf();

  useEffect(() => {
    const timerId = setInterval(() => {
      if (timer === 0) onEnd(answer);
      else setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timer, answer, onEnd]);

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex">
        <div className="flex flex-1 flex-col gap-2">
          {/* <h2 className="text-4xl font-bold">🅱️ahoot</h2> */}
          {/* <h2 className="font-mono text-4xl font-bold italic">QUICKTIME</h2> */}

          <MarkdownRenderer className="text-3xl font-semibold">
            {prompt.question}
          </MarkdownRenderer>
        </div>

        <CircularProgress
          classNames={{
            svg: "w-24 h-24 drop-shadow-md",
            value: "text-xl font-semibold text-white",
          }}
          size="lg"
          color="primary"
          value={timer}
          maxValue={initialTimer}
          strokeWidth={4}
          showValueLabel={true}
          formatOptions={{ style: "unit", unit: "second" }}
        />
      </div>

      <div className="grid h-full flex-1 grid-cols-2 gap-2 font-mono">
        <Button className="h-full" color="danger" onClick={() => setAnswer(0)}>
          <MarkdownRenderer>{prompt.answers[0]}</MarkdownRenderer>
        </Button>
        <Button
          className="h-full"
          color="secondary"
          onClick={() => setAnswer(1)}
        >
          <MarkdownRenderer>{prompt.answers[1]}</MarkdownRenderer>
        </Button>
        <Button className="h-full" color="warning" onClick={() => setAnswer(2)}>
          <MarkdownRenderer>{prompt.answers[2]}</MarkdownRenderer>
        </Button>
        <Button className="h-full" color="success" onClick={() => setAnswer(3)}>
          <MarkdownRenderer>{prompt.answers[3]}</MarkdownRenderer>
        </Button>
      </div>

      {/* <AvatarGroup className="self-end" isBordered max={12}>
        {users.map(({ connectionId, info }) => (
          <Avatar
            key={connectionId}
            src={info.image}
            name={info.name}
            size="sm"
          />
        ))}

        {currentUser && (
          <Avatar
            key={currentUser.connectionId}
            src={currentUser.info.image}
            name={currentUser.info.name}
            size="sm"
          />
        )}
      </AvatarGroup> */}
    </div>
  );
}
