"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { Button, Card, CardBody, CardHeader, Link } from "@nextui-org/react";
import { PlusIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import EventsAccordion from "@/components/events-accordion";

import {
  getLocalTimeZone,
  now,
  toCalendarDateTime,
} from "@internationalized/date";
import { toast } from "sonner";

// const timeZone = getLocalTimeZone();
const timeZone = "America/New_York";

const templateEvent = {
  title: "Event Title",
  kind: undefined,
  location: undefined,
  start: toCalendarDateTime(now(timeZone)).toString(),
  end: undefined,
  description: "A brief description.",
  rsvp: undefined,
};

// interface AdminEventsPageProps {
//   events: Event[];
// }

// export default function AdminEventsPage({ events }: AdminEventsPageProps) {
export default function AdminEventsPage() {
  const router = useRouter();

  const createEvent = useCallback(async () => {
    const response = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(templateEvent),
    });

    if (response.status === 200) {
      toast.success("Event created!");

      const { id } = await response.json();
      router.push(`/admin/events/${id}`);
    }
  }, [router]);

  return (
    <Card isBlurred>
      <CardHeader className="justify-between">
        <h2 className="text-3xl font-bold">Events</h2>

        <Button
          color="primary"
          variant="shadow"
          onClick={createEvent}
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
