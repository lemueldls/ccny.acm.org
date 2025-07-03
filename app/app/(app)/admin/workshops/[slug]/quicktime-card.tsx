import { useState, useCallback } from "react";
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
} from "@heroui/react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { slideSegment } from "@/convex/schema";

export type QuicktimePrompt = typeof slideSegment.type & { kind: "quicktime" };

interface AdminWorkshopQuicktimePromptCardProps {
  prompt: QuicktimePrompt;
  onChange: (prompt: QuicktimePrompt) => void;
}

export default function AdminWorkshopQuicktimePromptCard(
  props: AdminWorkshopQuicktimePromptCardProps,
) {
  const [prompt, setPrompt] = useState<QuicktimePrompt>(props.prompt);
  const [isEditing, setIsEditing] = useState(true);

  const updatePrompt = useCallback(
    (
      key: keyof QuicktimePrompt,
      value: QuicktimePrompt[keyof QuicktimePrompt],
    ) => {
      setPrompt((prev) => ({ ...prev, [key]: value }));

      props.onChange({ ...prompt, [key]: value });
    },
    [prompt, props],
  );

  const colorByIndex = ["danger", "secondary", "warning", "success"] as const;

  console.log({ prompt });

  return (
    <Card className="flex flex-col gap-4">
      <CardHeader>
        <h3 className="text-3xl font-semibold">{prompt.question}</h3>
      </CardHeader>
      <CardBody>
        {isEditing ? (
          <div className="flex flex-col gap-4">
            <Input
              label="Question"
              defaultValue={prompt.question}
              fullWidth
              onValueChange={(value) => updatePrompt("question", value)}
            />

            <Input
              label="Points"
              type="number"
              defaultValue={prompt.points.toString()}
              fullWidth
              onValueChange={(value) => updatePrompt("points", parseInt(value))}
            />

            <RadioGroup
              defaultValue={prompt.correctAnswer}
              onValueChange={(value) => updatePrompt("correctAnswer", value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  e.stopPropagation();
                  updatePrompt("correctAnswer", prompt.answers[0]);
                }
              }}
            >
              {prompt.answers.map((answer, index) => (
                <div key={index} className="flex gap-2">
                  <Radio value={answer} color={colorByIndex[index]}></Radio>

                  <Input
                    className="w-full"
                    defaultValue={answer}
                    onValueChange={(value) => {
                      const { answers } = prompt;
                      answers[index] = value;
                      updatePrompt("answers", answers);
                    }}
                  />
                </div>
              ))}
            </RadioGroup>
          </div>
        ) : (
          <div className="grid h-80 grid-cols-2 gap-4">
            <Button
              className="h-full"
              color="danger"
              variant="flat"
            // onPress={() => setAnswer(0)}
            >
              <Snippet hideSymbol hideCopyButton color="danger" size="lg">
                {prompt.answers[0]}
              </Snippet>
            </Button>
            <Button
              className="h-full"
              color="secondary"
            // onPress={() => setAnswer(1)}
            >
              {prompt.answers[1]}
            </Button>
            <Button
              className="h-full"
              color="warning"
            // onPress={() => setAnswer(2)}
            >
              {prompt.answers[2]}
            </Button>
            <Button
              className="h-full"
              color="success"
            // onPress={() => setAnswer(3)}
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
