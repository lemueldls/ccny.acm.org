"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { Button, Card, CardBody, CardHeader, Link } from "@heroui/react";
import { PlusIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import EventsAccordion from "@/components/events-accordion";

import {
  getLocalTimeZone,
  now,
  toCalendarDateTime,
} from "@internationalized/date";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

// const timeZone = getLocalTimeZone();
const timeZone = "America/New_York";

const templateEvent = {
  title: "Event Title",
  kind: undefined,
  location: undefined,
  start: Date.now(),
  end: undefined,
  description: "A not so brief description.",
  rsvp: undefined,
};

// interface AdminEventsPageProps {
//   events: Event[];
// }

// export default function AdminEventsPage({ events }: AdminEventsPageProps) {
export default function AdminEventsPage() {
  const router = useRouter();

  const createEvent = useMutation(api.events.createEvent);

  // const createEvent = useCallback(async () => {
  //   const response = await fetch("/api/events", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(templateEvent),
  //   });

  //   if (response.status === 200) {
  //     toast.success("Event created!");

  //     const { id } = await response.json();
  //     router.push(`/admin/events/${id}`);
  //   }
  // }, [router]);

  const handleCreateEvent = useCallback(async () => {
    const id = await createEvent({ event: templateEvent });

    toast.success("Event created!");
    router.push(`/admin/events/${id}`);
  }, [createEvent, router]);

  return (
    <Card isBlurred>
      <CardHeader className="justify-between">
        <h2 className="text-3xl font-bold">Events</h2>

        <Button
          color="primary"
          variant="shadow"
          onClick={handleCreateEvent}
          startContent={<PlusIcon className="h-5 w-5" />}
        >
          Create Event
        </Button>
      </CardHeader>

      <CardBody>
        <EventsAccordion
          renderFooter={(event) => (
            <Button
              as={Link}
              href={`/admin/events/${event.id}`}
              variant="ghost"
              color="primary"
              startContent={<PencilSquareIcon className="h-5 w-5" />}
            >
              Edit
            </Button>
          )}
        />
      </CardBody>
    </Card>
  );
}
