"use client";

import { ArrowDownIcon, ArrowUpIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Button, Card, CardBody, Input, Radio, RadioGroup, Textarea } from "@heroui/react";
import { useMutation, useQuery } from "convex/react";
import { use, useState } from "react";

import { api } from "@/convex/_generated/api";

import AdminWorkshopQuicktimePromptCard from "./quicktime-card";

export interface AdminWorkshopPresentPageProps {
  params: Promise<{ slug: string }>;
}

export default function AdminWorkshopPresentPage(props: AdminWorkshopPresentPageProps) {
  const params = use(props.params);
  const slug = decodeURIComponent(params.slug);
  const workshop = useQuery(api.workshops.getBySlug, { slug });
  const setWorkshopSlideSegments = useMutation(api.workshops.setSlideSegments);

  const [newSegmentKind, setSegmentKind] = useState("markdown");

  if (!workshop) {
    return <span>Workshop not found</span>;
  }

  return (
    <div className="m-4 flex flex-col gap-4">
      {workshop.slideSegments.map((segment, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex-1">
            {segment.kind === "markdown" ? (
              <Textarea
                defaultValue={segment.content}
                className="w-full"
                onValueChange={(content) =>
                  setWorkshopSlideSegments({
                    slideSegments: workshop.slideSegments.map((s, j) =>
                      i === j ? { kind: "markdown", content } : s,
                    ),
                    workshopId: workshop._id,
                  })
                }
              />
            ) : (
              <AdminWorkshopQuicktimePromptCard
                prompt={segment}
                onChange={(prompt) =>
                  setWorkshopSlideSegments({
                    slideSegments: workshop.slideSegments.map((s, j) => (i === j ? prompt : s)),
                    workshopId: workshop._id,
                  })
                }
              />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-1 flex-col gap-2">
              <Button
                color="primary"
                variant="flat"
                onPress={() => {
                  const segments = [...workshop.slideSegments];
                  const temp = segments[i];
                  segments[i] = segments[i - 1];
                  segments[i - 1] = temp;

                  setWorkshopSlideSegments({
                    slideSegments: segments,
                    workshopId: workshop._id,
                  });
                }}
                isIconOnly
                startContent={<ArrowUpIcon className="h-5 w-5" />}
              />

              <Button
                color="primary"
                variant="flat"
                onPress={() => {
                  const segments = [...workshop.slideSegments];
                  const temp = segments[i];
                  segments[i] = segments[i + 1];
                  segments[i + 1] = temp;

                  setWorkshopSlideSegments({
                    slideSegments: segments,
                    workshopId: workshop._id,
                  });
                }}
                isIconOnly
                startContent={<ArrowDownIcon className="h-5 w-5" />}
              />
            </div>

            <Button
              className="self-end"
              color="danger"
              variant="flat"
              onPress={() =>
                setWorkshopSlideSegments({
                  slideSegments: workshop.slideSegments.filter((_, j) => i !== j),
                  workshopId: workshop._id,
                })
              }
              isIconOnly
              startContent={<TrashIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      ))}

      <Card>
        <CardBody className="flex flex-row items-center gap-4">
          <RadioGroup
            orientation="horizontal"
            value={newSegmentKind}
            onValueChange={(value) => setSegmentKind(value)}
          >
            <Radio value="markdown">Markdown</Radio>
            <Radio value="quicktime">Quicktime</Radio>
          </RadioGroup>

          <Button
            color="primary"
            variant="shadow"
            onPress={() =>
              setWorkshopSlideSegments({
                slideSegments: [
                  ...workshop.slideSegments,
                  newSegmentKind === "markdown"
                    ? { kind: "markdown", content: "" }
                    : {
                        kind: "quicktime",
                        question: "",
                        answers: ["", "", "", ""],
                        correctAnswer: "",
                        points: 10,
                        time: 10,
                      },
                ],
                workshopId: workshop._id,
              })
            }
          >
            Add
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
