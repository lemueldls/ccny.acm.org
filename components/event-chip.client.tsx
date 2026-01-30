"use client";

import { Chip, Link } from "@heroui/react";
import { Preloaded, usePreloadedQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { parseEvents, serializeEvent } from "@/lib/events";

export interface EventChipClientProps {
  preloadedEvents: Preloaded<typeof api.events.getAllEvents>;
}

export default function EventChipClient(props: EventChipClientProps) {
  const events = usePreloadedQuery(props.preloadedEvents)?.map(serializeEvent);

  if (!events) {
    return null;
  }

  const { happeningToday, upcomingEvents, areHappeningToday, areUpcomingEvents } =
    parseEvents(events);

  return areHappeningToday ? (
    <Chip
      color="danger"
      size="lg"
      variant="flat"
      className="diagonal-lines balance flex h-auto max-w-xl flex-col gap-2 rounded-3xl p-2 text-center text-balance sm:h-8 sm:flex-row sm:py-6"
      as={Link}
      href="#happening-today"
      startContent={
        <Chip classNames={{ content: "font-semibold" }} color="danger" size="lg" variant="shadow">
          Happening Today
        </Chip>
      }
    >
      {happeningToday[happeningToday.length - 1].title}
    </Chip>
  ) : (
    areUpcomingEvents && (
      <Chip
        color="secondary"
        size="lg"
        variant="flat"
        className="diagonal-lines balance flex h-auto max-w-xl flex-col gap-2 rounded-3xl p-2 text-center text-balance sm:h-8 sm:flex-row sm:py-6"
        as={Link}
        href="#upcoming-events"
        startContent={
          <Chip
            classNames={{ content: "font-semibold leading-none tracking-tight" }}
            color="secondary"
            size="lg"
            variant="shadow"
          >
            Upcoming Event
          </Chip>
        }
      >
        {upcomingEvents[upcomingEvents.length - 1].title}
      </Chip>
    )
  );
}
