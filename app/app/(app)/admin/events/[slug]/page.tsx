"use client";

import { CalendarDaysIcon, MapPinIcon, UserIcon } from "@heroicons/react/20/solid";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Textarea,
  addToast,
  useDisclosure,
} from "@heroui/react";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { use, useCallback, useEffect, useState } from "react";

import EventCard from "@/components/event-card";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { SerializedEvent, deserializeEvent, eventKindTextMap, serializeEvent } from "@/lib/events";

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
    if (rawEvent) {
      setEvent(serializeEvent(rawEvent));
    }
  }, [rawEvent]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const updateEvent = useCallback(
    <T extends keyof SerializedEvent>(key: T, value: SerializedEvent[T]) => {
      setEvent({ ...event!, [key]: value });
    },
    [event],
  );

  const saveEvent = useCallback(async () => {
    if (!event) {
      throw new Error("Event not found");
    }

    const deserializedEvent = deserializeEvent(Object.assign(event, { end: eventEnd }));
    deserializedEvent.public = true;

    await setRawEvent({ event: deserializedEvent, id });

    const eventKind = event?.kind;
    addToast({
      color: "success",
      title: `${eventKind ? eventKindTextMap[eventKind] : "Event"} ${published ? "published" : "saved"}!`,
    });
  }, [event, eventEnd, id, published, setRawEvent]);

  const handleDeleteEvent = useCallback(async () => {
    onOpen();

    await deleteEvent({ id });

    addToast({ color: "danger", title: "Event deleted!" });
    router.push("/admin/events");
  }, [deleteEvent, id, onOpen, router]);

  const eventFlags: (keyof SerializedEvent)[] = ["public", "external", "virtual"];

  const selectedFlags = eventFlags.filter((flag) => (event ? event[flag] : false));

  const handleFlagChange = useCallback(
    (values: string[]) => {
      for (const flag of eventFlags) {
        const isSelected = values.includes(flag);
        // Only update if the flag's state has actually changed
        if (event && event[flag] !== isSelected) {
          updateEvent(flag, isSelected);
        }
      }
    },
    [event, eventFlags, updateEvent],
  );

  return (
    <>
      <Card isBlurred>
        <CardBody className="flex flex-col gap-4 xl:flex-row">
          <div className="flex flex-1 flex-col gap-2">
            <RadioGroup
              label="Event Type"
              orientation="horizontal"
              isDisabled={!event}
              value={event?.kind}
              onValueChange={(value) => updateEvent("kind", value as SerializedEvent["kind"])}
              classNames={{ wrapper: "gap-4" }}
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
              <Radio value="projectBuilding" color="warning">
                Project Building
              </Radio>
            </RadioGroup>

            <CheckboxGroup
              label="Event Flags"
              orientation="horizontal"
              isDisabled={!event}
              value={selectedFlags}
              onValueChange={handleFlagChange}
              classNames={{ wrapper: "gap-4" }}
            >
              <Checkbox value="public">Public</Checkbox>
              <Checkbox value="external">External</Checkbox>
              <Checkbox value="virtual">Virtual</Checkbox>
            </CheckboxGroup>

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
              startContent={<MapPinIcon className="text-foreground-400 h-5 w-5" />}
            />

            <Input
              label="Host"
              labelPlacement="outside"
              isDisabled={!event}
              value={event?.host || ""}
              onValueChange={(value) => updateEvent("host", value)}
              startContent={<UserIcon className="text-foreground-400 h-5 w-5" />}
            />

            <div className="flex flex-col items-center gap-2 sm:flex-row">
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

          <div className="flex w-full max-w-md flex-col gap-4">
            <div className="flex-1">{event ? <EventCard event={event} /> : null}</div>

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

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete Event</ModalHeader>
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
