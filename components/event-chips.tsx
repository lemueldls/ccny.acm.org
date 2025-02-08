"use client";

import { useState, useEffect } from "react";
import { Chip, Link } from "@heroui/react";

import { parseEvents } from "@/lib/events";
import useEvents from "@/lib/hooks/use-events";

export default function EventChip() {
  const events = useEvents();

  if (!events) return null;

  const {
    happeningToday,
    upcomingEvents,
    areHappeningToday,
    areUpcomingEvents,
  } = parseEvents(events);

  return areHappeningToday ? (
    <Chip
      color="danger"
      size="lg"
      variant="flat"
      className="diagonal-lines mb-8 flex gap-2 px-2 py-6"
      as={Link}
      href="#happening-today"
      startContent={
        <Chip color="danger" size="lg" variant="shadow">
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
        className="diagonal-lines mb-8 flex gap-2 px-2 py-6"
        as={Link}
        href="#upcoming-events"
        startContent={
          <Chip color="secondary" size="lg" variant="shadow">
            Upcoming Event
          </Chip>
        }
      >
        {upcomingEvents[upcomingEvents.length - 1].title}
      </Chip>
    )
  );
}
