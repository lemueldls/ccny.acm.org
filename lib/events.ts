import { Doc, Id } from "@/convex/_generated/dataModel";
import {
  isSameDay,
  now,
  fromAbsolute,
  toCalendarDateTime,
  getLocalTimeZone,
  parseDateTime,
  fromDate,
  ZonedDateTime,
} from "@internationalized/date";

export type EventDoc = Doc<"events">;

export interface SerializedEvent
  extends Omit<Doc<"events">, "_id" | "_creationTime" | "start" | "end"> {
  id: Id<"events">;
  start: ZonedDateTime | null;
  end: ZonedDateTime | null;
}

export interface DeserializedEvent
  extends Omit<Doc<"events">, "_id" | "_creationTime"> {
  start: number | undefined;
  end: number | undefined;
}

export const eventKindColorMap = {
  workshop: "primary",
  meeting: "secondary",
  informationSession: "success",
  hackathon: "danger",
} as const;

export const eventKindTextMap = {
  workshop: "Workshop",
  meeting: "Meeting",
  informationSession: "Information Session",
  hackathon: "Hackathon",
};

export function serializeEvent(event: Doc<"events">) {
  // const timeZone = getLocalTimeZone();
  const timeZone = "America/New_York";

  return {
    id: event._id,
    title: event.title,
    kind: event.kind,
    location: event.location,
    start: event.start ? fromAbsolute(event.start, timeZone) : null,
    end: event.end ? fromAbsolute(event.end, timeZone) : null,
    description: event.description,
    rsvp: event.rsvp,
    public: event.public,
  };
}

export function deserializeEvent(event: SerializedEvent): DeserializedEvent {
  return {
    title: event.title,
    kind: event.kind,
    location: event.location,
    start: event.start ? event.start.toDate().getTime() : undefined,
    end: event.end ? event.end.toDate().getTime() : undefined,
    description: event.description,
    rsvp: event.rsvp,
    public: event.public,
  };
}

export function parseEvents(events: SerializedEvent[]) {
  // const timeZone = getLocalTimeZone();
  const timeZone = "America/New_York";
  const localNow = now(timeZone);

  const [happeningToday, upcomingEvents, pastEvents] = events.reduce<
    [SerializedEvent[], SerializedEvent[], SerializedEvent[]]
  >(
    (acc, event, _i) => {
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

      // upcomingEvents.push(
      //   // pastEvents.reduce(
      //   //   (a, b) => (a.title.length > b.title.length ? a : b),
      //   pastEvents[0],
      //   // ),
      // );

      return [happeningToday, upcomingEvents, pastEvents];
    },
    [[], [], []],
  );

  const areHappeningToday = happeningToday.length > 0;
  const areUpcomingEvents = upcomingEvents.length > 0;

  return {
    happeningToday,
    upcomingEvents,
    pastEvents,
    areHappeningToday,
    areUpcomingEvents,
  };
}
