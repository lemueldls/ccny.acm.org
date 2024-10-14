import { useState, useCallback } from "react";
import { useBroadcastEvent } from "@liveblocks/react/suspense";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Radio,
  RadioGroup,
  Snippet,
  Textarea,
} from "@nextui-org/react";
import { QuicktimePrompt } from "@/lib/workshops";

interface AdminWorkshopQuicktimePromptCardProps {
  prompt: QuicktimePrompt;
}

export default function AdminWorkshopQuicktimePromptCard(
  props: AdminWorkshopQuicktimePromptCardProps,
) {
  const [prompt, setQuestion] = useState<QuicktimePrompt>(props.prompt);
  const [isEditing, setIsEditing] = useState(false);

  const broadcast = useBroadcastEvent();

  // const broadcastQuicktime = useCallback(() => {
  //   broadcast({ type: "QUICKTIME", emoji: "🔥" });
  // }, [broadcast]);

  const updatePrompt = useCallback(
    (
      key: keyof QuicktimePrompt,
      value: QuicktimePrompt[keyof QuicktimePrompt],
    ) => {
      setQuestion((prev) => ({ ...prev, [key]: value }));
    },
    [setQuestion],
  );

  const updatePromptAnswer = useCallback(
    (index: number, value: string) => {
      setQuestion((prev) => ({
        ...prev,
        answers: prev.answers.map((answer, i) =>
          i === index ? value : answer,
        ),
      }));
    },
    [setQuestion],
  );

  const broadcastPrompt = useCallback(() => {
    broadcast({
      type: "QUICKTIME",
      question: prompt.question,
      answers: [],
      points: prompt.points,
      time: prompt.time,
    });
  }, [broadcast, prompt]);

  return (
    <Card className="flex flex-col gap-4">
      <CardHeader>
        <h3 className="text-3xl font-semibold">{prompt.question}</h3>
      </CardHeader>
      <CardBody className="grid grid-cols-2 gap-4">
        {isEditing ? (
          <RadioGroup
            color="success"
            defaultValue={prompt.correctAnswer}
            onValueChange={(value) => updatePrompt("correctAnswer", value)}
          >
            {prompt.answers.map((answer, index) => (
              <Radio key={index} value={answer}>
                <Input
                  className="w-full"
                  defaultValue={answer}
                  // focus on click
                  onClick={(e) => (e.target as HTMLInputElement).focus()}
                />
              </Radio>
            ))}
          </RadioGroup>
        ) : (
          <div className="grid h-[20rem] grid-cols-2 gap-4">
            <Button
              className="h-full"
              color="danger"
              variant="flat"
              // onClick={() => setAnswer(0)}
            >
              <Snippet hideSymbol hideCopyButton color="danger" size="lg">
                {prompt.answers[0]}
              </Snippet>
            </Button>
            <Button
              className="h-full"
              color="secondary"
              // onClick={() => setAnswer(1)}
            >
              {prompt.answers[1]}
            </Button>
            <Button
              className="h-full"
              color="warning"
              // onClick={() => setAnswer(2)}
            >
              {prompt.answers[2]}
            </Button>
            <Button
              className="h-full"
              color="success"
              // onClick={() => setAnswer(3)}
            >
              {prompt.answers[3]}
            </Button>
          </div>
        )}
      </CardBody>
      <CardFooter className="flex flex-col gap-2">
        {/* <p className="text-sm font-semibold">{prompt.points} points</p>
        <p className="text-sm font-semibold">{prompt.time} seconds</p> */}
      </CardFooter>
    </Card>
  );
}
