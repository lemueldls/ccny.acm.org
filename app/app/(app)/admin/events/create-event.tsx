"use client";

import { PencilSquareIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Button, Card, CardBody, CardHeader, Link, addToast } from "@heroui/react";
import { getLocalTimeZone, now, toCalendarDateTime } from "@internationalized/date";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import EventsAccordion from "@/components/events-accordion";
import { api } from "@/convex/_generated/api";

// const timeZone = getLocalTimeZone();
const timeZone = "America/New_York";

const templateEvent = {
  title: "Event Title",
  kind: undefined,
  location: undefined,
  // start: Date.now(),
  start: now(timeZone).set({ hour: 12, minute: 30 }).toDate().getTime(),
  end: undefined,
  // end: now(timeZone).set({ hour: 13, minute: 45 }).toDate().getTime(),
  description: "A not so brief description.",
  rsvp: undefined,
  public: false,
};

export default function AdminEventsPageCreateEventButton() {
  const router = useRouter();

  const createEvent = useMutation(api.events.createEvent);

  const handleCreateEvent = useCallback(async () => {
    const id = await createEvent({ event: templateEvent });

    addToast({ color: "success", title: "Event created!" });
    router.push(`/admin/events/${id}`);
  }, [createEvent, router]);

  return (
    <Button
      color="primary"
      variant="shadow"
      onPress={handleCreateEvent}
      startContent={<PlusIcon className="h-5 w-5" />}
    >
      Create Event
    </Button>
  );
}
