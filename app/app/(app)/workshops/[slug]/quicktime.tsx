"use client";

import { Avatar, AvatarGroup, Button, CircularProgress } from "@heroui/react";
import { useMutation } from "convex/react";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";

import MarkdownRenderer from "@/components/markdown-renderer";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { slideSegment } from "@/convex/schema";

import { endQuicktime } from "../../../../../convex/activeWorkshops";

export interface QuicktimeProps {
  workshopId: Id<"workshops">;
  prompt?: QuicktimePrompt;
  onEnd(answerIndex: number | undefined): void;
  className?: string;
}

let timeout: ReturnType<typeof setTimeout> | undefined;

export type QuicktimePrompt = typeof slideSegment.type & { kind: "quicktime" };

export default function Quicktime(props: QuicktimeProps) {
  const { workshopId, prompt, onEnd, className } = props;

  const setUserAnswer = useMutation(api.activeWorkshops.setUserAnswer);
  const endQuicktime = useMutation(api.activeWorkshops.endQuicktime);

  const [timer, setTimer] = useState(prompt?.time);

  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number>();

  useEffect(() => {
    if (!prompt) {
      return;
    }
    if (timeout) {
      return;
    }

    timeout = setTimeout(() => {
      if (timer === 0) {
        onEnd(selectedAnswer);
        endQuicktime({ workshopId });
        setShowAnswer(true);
        setSelectedAnswer(undefined);
      } else {
        setTimer((prev) => (prev === undefined ? prompt.time : prev) - 1);
      }

      timeout = undefined;
    }, 1000);
  }, [timer, selectedAnswer, onEnd, endQuicktime, workshopId, prompt]);

  const handleSetAnswer = useCallback(
    (index: number) => {
      if (!prompt) {
        return;
      }

      setSelectedAnswer(index);
      setUserAnswer({ answer: prompt.answers[index], workshopId });
    },
    [prompt, setUserAnswer, workshopId],
  );

  if (!prompt) {
    return null;
  }

  return (
    <div className={`flex h-full flex-col gap-4 ${className}`}>
      <div className="flex">
        <div className="flex flex-1 flex-col gap-2">
          {/* <h2 className="text-4xl font-bold">🅱️ahoot</h2> */}
          {/* <h2 className="font-mono text-4xl font-bold italic">QUICKTIME</h2> */}

          <div className="text-[2em] font-semibold">
            <MarkdownRenderer>{prompt.question}</MarkdownRenderer>
          </div>
        </div>

        <CircularProgress
          classNames={{
            svg: "w-[6em] h-[6em] drop-shadow-md",
            value: "text-[1em] font-semibold text-white",
          }}
          size="lg"
          color="primary"
          value={timer}
          maxValue={prompt.time}
          strokeWidth={4}
          showValueLabel={true}
          formatOptions={{ style: "unit", unit: "second" }}
        />
      </div>

      <div className="grid h-full flex-1 grid-cols-2 gap-2 font-mono">
        <Button
          variant={
            !showAnswer && selectedAnswer === undefined
              ? "solid"
              : selectedAnswer === 0
                ? "solid"
                : "flat"
          }
          className="h-full p-4 text-[1.25em]"
          color="danger"
          onPress={() => handleSetAnswer(0)}
          isDisabled={showAnswer && prompt.correctAnswer !== prompt.answers[0]}
        >
          <MarkdownRenderer>{prompt.answers[0]}</MarkdownRenderer>
        </Button>
        <Button
          variant={
            !showAnswer && selectedAnswer === undefined
              ? "solid"
              : selectedAnswer === 1
                ? "solid"
                : "flat"
          }
          className="h-full p-4 text-[1.25em]"
          color="secondary"
          onPress={() => handleSetAnswer(1)}
          isDisabled={showAnswer && prompt.correctAnswer !== prompt.answers[1]}
        >
          <MarkdownRenderer>{prompt.answers[1]}</MarkdownRenderer>
        </Button>
        <Button
          variant={
            !showAnswer && selectedAnswer === undefined
              ? "solid"
              : selectedAnswer === 2
                ? "solid"
                : "flat"
          }
          className="h-full p-4 text-[1.25em]"
          color="warning"
          onPress={() => handleSetAnswer(2)}
          isDisabled={showAnswer && prompt.correctAnswer !== prompt.answers[2]}
        >
          <MarkdownRenderer>{prompt.answers[2]}</MarkdownRenderer>
        </Button>
        <Button
          variant={
            !showAnswer && selectedAnswer === undefined
              ? "solid"
              : selectedAnswer === 3
                ? "solid"
                : "flat"
          }
          className="h-full p-4 text-[1.25em]"
          color="success"
          onPress={() => handleSetAnswer(3)}
          isDisabled={showAnswer && prompt.correctAnswer !== prompt.answers[3]}
        >
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
