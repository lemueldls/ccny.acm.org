"use client";

import EventCard from "./event-card";
import { SerializedEvent } from "@/lib/events";
import { Button, Link } from "@heroui/react";

import { PencilSquareIcon } from "@heroicons/react/20/solid";

export interface EventGridProps {
  events: SerializedEvent[];
  rsvpIsDisabled?: boolean;
  showEditLink?: boolean;
}

export default function EventGrid({
  events,
  rsvpIsDisabled,
  showEditLink,
}: EventGridProps) {
  return (
    <div className="mb-2 grid grid-cols-1 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(28rem,1fr))]">
      {events.map((event, index) => (
        <EventCard
          key={index}
          event={event}
          rsvpIsDisabled={rsvpIsDisabled}
          footer={
            showEditLink && (
              <Button
                as={Link}
                href={`/admin/events/${event.id}`}
                variant="ghost"
                color="primary"
                startContent={<PencilSquareIcon className="h-5 w-5" />}
              >
                Edit
              </Button>
            )
          }
        />
      ))}
    </div>
  );
}
