"use client";

import type { ReactNode } from "react";

import {
  Accordion,
  AccordionItem,
  AccordionProps,
  Skeleton,
} from "@heroui/react";
import EventGrid from "./event-grid";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { SerializedEvent, parseEvents, serializeEvent } from "@/lib/events";

export interface EventsAccordionClientProps
  extends Omit<AccordionProps, "children"> {
  preloadedEvents: Preloaded<typeof api.events.getAllEvents>;
  showEditLink?: boolean;
}

if (![].toReversed) {
  Array.prototype.toReversed = function () {
    for (var i = this.length - 1, arr = []; i >= 0; --i) {
      arr.push(this[i]);
    }

    return arr;
  };
}

export default function EventsAccordionClient(
  props: EventsAccordionClientProps,
) {
  const events = usePreloadedQuery(props.preloadedEvents)?.map(serializeEvent);

  if (!events) return <EventsAccordionSkeleton />;

  const {
    happeningToday,
    upcomingEvents,
    areHappeningToday,
    areUpcomingEvents,
    pastEvents,
  } = parseEvents(events);

  const disabledKeys = [];
  const defaultExpandedKeys = [];

  if (areHappeningToday) defaultExpandedKeys.push("1");
  else disabledKeys.push("1");

  if (areUpcomingEvents) defaultExpandedKeys.push("2");
  else disabledKeys.push("2");

  if (!areHappeningToday && !areUpcomingEvents) defaultExpandedKeys.push("3");

  return (
    <Accordion
      variant="bordered"
      selectionMode="multiple"
      disabledKeys={disabledKeys}
      defaultExpandedKeys={defaultExpandedKeys}
    >
      <AccordionItem
        key="1"
        aria-label="Happening Today"
        title="Happening Today"
        subtitle={
          areHappeningToday ? null : (
            <span className="text-xl">There are no events happening today</span>
          )
        }
        id="happening-today"
        classNames={{ title: "text-4xl font-bold leading-none" }}
      >
        <EventGrid
          events={happeningToday.toReversed()}
          showEditLink={props.showEditLink}
        />
      </AccordionItem>

      <AccordionItem
        key="2"
        aria-label="Upcoming Events"
        title="Upcoming Events"
        subtitle={
          areUpcomingEvents ? null : (
            <span className="text-xl">There are no upcoming events</span>
          )
        }
        id="upcoming-events"
        classNames={{ title: "text-4xl font-bold leading-none" }}
      >
        <EventGrid
          events={upcomingEvents.toReversed()}
          showEditLink={props.showEditLink}
        />
      </AccordionItem>

      <AccordionItem
        key="3"
        aria-label="Past Events"
        title="Past Events"
        subtitle={
          pastEvents.length > 0 ? null : (
            <span className="text-xl">There were no events in the past</span>
          )
        }
        id="past-events"
        classNames={{ title: "text-4xl font-bold leading-none" }}
      >
        <EventGrid
          events={pastEvents}
          showEditLink={props.showEditLink}
          rsvpIsDisabled
        />
      </AccordionItem>
    </Accordion>
  );
}

export function EventsAccordionSkeleton() {
  return (
    <Accordion
      variant="bordered"
      selectionMode="multiple"
      disabledKeys={["1", "2", "3"]}
      // defaultExpandedKeys={["1", "2", "3"]}
    >
      <AccordionItem
        key="1"
        aria-label="Happening Today"
        title="Happening Today"
        subtitle={<Skeleton className="mt-2 h-5 w-64 rounded-lg" />}
        id="happening-today"
        classNames={{ title: "text-4xl font-bold" }}
      >
        {/* <EventGridSkeleton /> */}
      </AccordionItem>

      <AccordionItem
        key="2"
        aria-label="Upcoming Events"
        title="Upcoming Events"
        subtitle={<Skeleton className="mt-2 h-5 w-64 rounded-lg" />}
        id="upcoming-events"
        classNames={{ title: "text-4xl font-bold" }}
      >
        {/* <EventGridSkeleton /> */}
      </AccordionItem>

      <AccordionItem
        key="3"
        aria-label="Past Events"
        title="Past Events"
        subtitle={<Skeleton className="mt-2 h-5 w-64 rounded-lg" />}
        id="past-events"
        classNames={{ title: "text-4xl font-bold" }}
      >
        {/* <EventGridSkeleton /> */}
      </AccordionItem>
    </Accordion>
  );
}
