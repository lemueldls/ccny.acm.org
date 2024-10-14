"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import {
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
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import EventCard, { EventCardSkeleton } from "@/components/event-card";
import type { Event, SerializedEvent } from "@/lib/events";
import { parseDateTime } from "@internationalized/date";
import {
  CalendarDaysIcon,
  CalendarIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/16/solid";

export default function EditEventPage({
  params,
}: {
  params: { slug: string };
}) {
  const id = decodeURIComponent(params.slug);
  const [event, setEvent] = useState<SerializedEvent>();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then((res) => res.json())
      .then(setEvent);
  }, [id]);

  async function updateEvent<T extends keyof SerializedEvent>(
    key: T,
    value: SerializedEvent[T],
  ) {
    setEvent({ ...event!, [key]: value });
  }

  async function saveEvent() {
    await fetch(`/api/events/${event!.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event!),
    }).then((res) => res.json());
  }

  async function deleteEvent() {
    onOpen();

    await fetch(`/api/events/${event!.id}`, { method: "DELETE" }).then((res) =>
      res.json(),
    );
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
                  updateEvent("kind", value as Event["kind"])
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
                  <MapPinIcon className="h-5 w-5 text-default-400" />
                }
              />

              <div className="flex items-center gap-2">
                <DatePicker
                  label="Start"
                  labelPlacement="outside"
                  isDisabled={!event}
                  value={event?.start ? parseDateTime(event.start) : null}
                  onChange={(value) => updateEvent("start", value.toString())}
                  selectorIcon={
                    <>
                      <CalendarDaysIcon className="h-5 w-5" />
                    </>
                  }
                />

                <DatePicker
                  label="End"
                  labelPlacement="outside"
                  isDisabled={!event}
                  value={event?.end ? parseDateTime(event.end) : null}
                  onChange={(value) => updateEvent("end", value.toString())}
                  selectorIcon={
                    <>
                      <CalendarDaysIcon className="h-5 w-5" />
                    </>
                  }
                />
              </div>

              <Textarea
                label="Description"
                labelPlacement="outside"
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

            <div className="flex w-full flex-col gap-4 lg:w-[26rem]">
              {event ? (
                <EventCard className="flex-1" event={event} />
              ) : (
                <EventCardSkeleton className="flex-1" />
              )}

              <div className="flex justify-end gap-4">
                <Button
                  variant="flat"
                  color="danger"
                  isDisabled={!event}
                  startContent={<TrashIcon className="h-4 w-4" />}
                  onClick={onOpen}
                >
                  Delete
                </Button>

                <Button
                  variant="shadow"
                  color="primary"
                  className="flex-1"
                  isDisabled={!event}
                  startContent={<PencilSquareIcon className="h-4 w-4" />}
                  onClick={saveEvent}
                >
                  Save
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
                  startContent={<TrashIcon className="h-4 w-4" />}
                  onClick={deleteEvent}
                >
                  Delete
                </Button>
                <Button variant="ghost" color="primary" onClick={onClose}>
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
