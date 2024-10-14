import { useState, useEffect, type ReactNode } from "react";

import {
  Accordion,
  AccordionItem,
  AccordionProps,
  Skeleton,
} from "@nextui-org/react";
import EventGrid, { EventGridSkeleton } from "./event-grid";

import { parseEvents, type SerializedEvent } from "@/lib/events";
import { EventCardSkeleton } from "./event-card";
import useEvents from "@/lib/hooks/use-events";

interface EventAccordionProps extends Omit<AccordionProps, "children"> {
  renderFooter?: (event: SerializedEvent) => ReactNode;
}

export default function EventsAccordion(props: EventAccordionProps) {
  const events = useEvents();

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
      {...props}
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
        // onPress={() => router.push("#happening-today")}
        className="flex flex-col gap-8"
        classNames={{ title: "text-4xl font-bold" }}
      >
        <EventGrid events={happeningToday} renderFooter={props.renderFooter} />
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
        // onPress={() => router.push("#upcoming-events")}
        className="flex flex-col gap-8"
        classNames={{ title: "text-4xl font-bold" }}
      >
        <EventGrid events={upcomingEvents} renderFooter={props.renderFooter} />
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
        // onPress={() => router.push("#past-events")}
        classNames={{ title: "text-4xl font-bold" }}
      >
        <EventGrid
          events={pastEvents}
          renderFooter={props.renderFooter}
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
