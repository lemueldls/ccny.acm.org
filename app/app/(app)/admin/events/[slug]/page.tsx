"use client";

import { useEffect, useState, use } from "react";
import { useRouter, notFound } from "next/navigation";
import {
  addToast,
  useDisclosure,
  Card,
  CardBody,
  CardHeader,
  DatePicker,
  Divider,
  Input,
  Radio,
  RadioGroup,
  DateValue,
  CalendarDate,
  Textarea,
  Button,
  Modal,
  DateRangePicker,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import EventCard from "@/components/event-card";
import { parseDateTime } from "@internationalized/date";
import {
  CalendarDaysIcon,
  CalendarIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";

import {
  DeserializedEvent,
  SerializedEvent,
  deserializeEvent,
  eventKindTextMap,
  serializeEvent,
} from "@/lib/events";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface EditEventPageProps {
  params: Promise<{ slug: string }>;
}

export default function EditEventPage(props: EditEventPageProps) {
  const params = use(props.params);
  const router = useRouter();
  const id = decodeURIComponent(params.slug) as Id<"events">;

  const rawEvent = useQuery(api.events.getById, { id });
  const setRawEvent = useMutation(api.events.updateById);
  const deleteEvent = useMutation(api.events.deleteById);

  const [event, setEvent] = useState<SerializedEvent>();

  const eventStart = event?.start;
  const eventEnd = event?.end || eventStart?.add({ hours: 1, minutes: 15 });
  const published = event?.public;

  useEffect(() => {
    if (rawEvent) setEvent(serializeEvent(rawEvent));
  }, [rawEvent]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  async function updateEvent<T extends keyof SerializedEvent>(
    key: T,
    value: SerializedEvent[T],
  ) {
    setEvent({ ...event!, [key]: value });
  }

  async function saveEvent() {
    if (!event) throw new Error("Event not found");

    const deserializedEvent = deserializeEvent(Object.assign(event, { end: eventEnd }));
    deserializedEvent.public = true;

    await setRawEvent({ id, event: deserializedEvent });

    const eventKind = event?.kind;
    addToast({
      title: `${eventKind ? eventKindTextMap[eventKind] : 'Event'} ${published ? "published" : "saved"}!`,
      color: "success"
    });
  }

  async function handleDeleteEvent() {
    onOpen();

    await deleteEvent({ id });

    addToast({ title: "Event deleted!", color: "danger" });
    router.push("/admin/events");
  }

  return (
    <>
      <div className="flex h-full w-full items-center justify-center">
        <Card isBlurred>
          <CardBody className="flex flex-col gap-4 lg:flex-row">
            <div className="flex flex-1 flex-col gap-2">
              <RadioGroup
                label="Event Type"
                orientation="horizontal"
                isDisabled={!event}
                value={event?.kind}
                onValueChange={(value) =>
                  updateEvent("kind", value as SerializedEvent["kind"])
                }
              >
                <Radio value="workshop" color="primary">
                  Workshop
                </Radio>
                <Radio value="meeting" color="secondary">
                  Meeting
                </Radio>
                <Radio value="informationSession" color="success">
                  Information Session
                </Radio>
                <Radio value="hackathon" color="danger">
                  Hackathon
                </Radio>
              </RadioGroup>

              <Input
                label="Title"
                labelPlacement="outside"
                isRequired
                isDisabled={!event}
                value={event?.title}
                onValueChange={(value) => updateEvent("title", value)}
              />

              <Input
                label="Location"
                labelPlacement="outside"
                isDisabled={!event}
                value={event?.location || ""}
                onValueChange={(value) => updateEvent("location", value)}
                startContent={
                  <MapPinIcon className="h-5 w-5 text-foreground-400" />
                }
              />

              <div className="flex items-center gap-2">
                <DatePicker
                  label="Start"
                  labelPlacement="outside"
                  isDisabled={!event}
                  value={eventStart}
                  onChange={(value) => updateEvent("start", value)}
                  selectorIcon={
                    <span>
                      <CalendarDaysIcon className="h-5 w-5" />
                    </span>
                  }
                />

                <DatePicker
                  label="End"
                  labelPlacement="outside"
                  isDisabled={!event}
                  value={eventEnd}
                  onChange={(value) => updateEvent("end", value)}
                  selectorIcon={
                    <span>
                      <CalendarDaysIcon className="h-5 w-5" />
                    </span>
                  }
                />

                {/* <DateRangePicker
                  fullWidth
                  label="Date"
                  labelPlacement="outside"
                  startName="Start"
                  endName="End"
                  granularity="minute"
                  allowsNonContiguousRanges
                  isDisabled={!event}
                  value={
                    event?.start
                      ? event?.end
                        ? {
                            start: parseDateTime(event.start),
                            end: parseDateTime(event.end),
                          }
                        : {
                            start: parseDateTime(event.start),
                            end: parseDateTime(event.start),
                          }
                      : undefined
                  }
                  onChange={(value) => {
                    console.log({ value });

                    updateEvent("start", value?.start?.toString());
                    updateEvent("end", value?.end?.toString());
                  }}
                  selectorIcon={
                    <>
                      <CalendarDaysIcon className="h-5 w-5" />
                    </>
                  }
                ></DateRangePicker> */}
              </div>

              <Textarea
                label="Description"
                labelPlacement="outside"
                isRequired
                isDisabled={!event}
                value={event?.description}
                onValueChange={(value) => updateEvent("description", value)}
              />

              <Input
                type="url"
                label="RSVP"
                labelPlacement="outside"
                isDisabled={!event}
                value={event?.rsvp ?? ""}
                onValueChange={(value) => updateEvent("rsvp", value)}
              />
            </div>

            <Divider orientation="vertical" />

            <div className="flex w-full flex-col gap-4 lg:w-md">
              <div className="flex-1">
                {event ? <EventCard event={event} /> : null}
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  variant="flat"
                  color="danger"
                  isDisabled={!event}
                  startContent={<TrashIcon className="h-5 w-5" />}
                  onPress={onOpen}
                >
                  Delete
                </Button>

                <Button
                  variant="shadow"
                  color="primary"
                  className="flex-1"
                  isDisabled={!event}
                  startContent={<PencilSquareIcon className="h-5 w-5" />}
                  onPress={saveEvent}
                >
                  {published ? "Save" : "Publish"}
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Event
              </ModalHeader>
              <ModalBody>Are you sure you want to delete this event?</ModalBody>
              <ModalFooter>
                <Button
                  variant="flat"
                  color="danger"
                  startContent={<TrashIcon className="h-5 w-5" />}
                  onPress={handleDeleteEvent}
                >
                  Delete
                </Button>
                <Button variant="ghost" color="primary" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
