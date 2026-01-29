import { ZonedDateTime, fromAbsolute, isSameDay, now } from "@internationalized/date";

import { Doc, Id } from "@/convex/_generated/dataModel";

export type EventDoc = Doc<"events">;

export interface SerializedEvent extends Omit<
  Doc<"events">,
  "_id" | "_creationTime" | "start" | "end"
> {
  id: Id<"events">;
  start: ZonedDateTime | null;
  end: ZonedDateTime | null;
}

export interface DeserializedEvent extends Omit<Doc<"events">, "_id" | "_creationTime"> {
  start: number | undefined;
  end: number | undefined;
}

export const eventKindColorMap = {
  hackathon: "danger",
  informationSession: "success",
  meeting: "secondary",
  workshop: "primary",
  projectBuilding: "warning",
} as const;

export const eventKindTextMap = {
  hackathon: "Hackathon",
  informationSession: "Information Session",
  meeting: "Meeting",
  workshop: "Workshop",
  projectBuilding: "Project Building",
};

export function serializeEvent(event: Doc<"events">) {
  // const timeZone = getLocalTimeZone();
  const timeZone = "America/New_York";

  return {
    description: event.description,
    end: event.end ? fromAbsolute(event.end, timeZone) : null,
    external: event.external,
    virtual: event.virtual,
    host: event.host,
    id: event._id,
    kind: event.kind,
    location: event.location,
    public: event.public,
    rsvp: event.rsvp,
    start: event.start ? fromAbsolute(event.start, timeZone) : null,
    title: event.title,
  };
}

export function deserializeEvent(event: SerializedEvent): DeserializedEvent {
  return {
    description: event.description,
    end: event.end ? event.end.toDate().getTime() : undefined,
    external: event.external,
    virtual: event.virtual,
    host: event.host,
    kind: event.kind,
    location: event.location,
    public: event.public,
    rsvp: event.rsvp,
    start: event.start ? event.start.toDate().getTime() : undefined,
    title: event.title,
  };
}

export function parseEvents(events: SerializedEvent[]) {
  // const timeZone = getLocalTimeZone();
  const timeZone = "America/New_York";
  const localNow = now(timeZone);

  const [happeningToday, upcomingEvents, pastEvents] = events.reduce<
    [SerializedEvent[], SerializedEvent[], SerializedEvent[]]
  >(
    (acc, event) => {
      const [happeningToday, upcomingEvents, pastEvents] = acc;

      if (!event.start || !event.end) {
        pastEvents.push(event);

        return [happeningToday, upcomingEvents, pastEvents];
      }

      if (isSameDay(event.start, localNow) || isSameDay(event.end, localNow)) {
        happeningToday.push(event);
      } else if (event.end.compare(localNow) < 0) {
        pastEvents.push(event);
      } else {
        upcomingEvents.push(event);
      }

      return [happeningToday, upcomingEvents, pastEvents];
    },
    [[], [], []],
  );

  const areHappeningToday = happeningToday.length > 0;
  const areUpcomingEvents = upcomingEvents.length > 0;

  return {
    areHappeningToday,
    areUpcomingEvents,
    happeningToday,
    pastEvents,
    upcomingEvents,
  };
}
