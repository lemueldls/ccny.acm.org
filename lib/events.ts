import * as schema from "@/lib/schema";
import {
  isSameDay,
  now,
  fromDate,
  toCalendarDateTime,
  getLocalTimeZone,
  parseDateTime,
} from "@internationalized/date";

export type Event = typeof schema.events.$inferSelect;
export interface SerializedEvent extends Omit<Event, "start" | "end"> {
  start: string;
  end: string;
}

export function serializeEvent(event: Event) {
  // const timeZone = getLocalTimeZone();
  const timeZone = "America/New_York";

  return Object.assign(event, {
    start: event.start
      ? toCalendarDateTime(fromDate(event.start, timeZone)).toString()
      : undefined,
    end: event.end
      ? toCalendarDateTime(fromDate(event.end, timeZone)).toString()
      : undefined,
  });
}

export function deserializeEvent(event: SerializedEvent) {
  // const timeZone = getLocalTimeZone();
  const timeZone = "America/New_York";

  return Object.assign(event, {
    start: event.start
      ? parseDateTime(event.start).toDate(timeZone)
      : undefined,
    end: event.end ? parseDateTime(event.end).toDate(timeZone) : undefined,
  });
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

      const endOfEvent = parseDateTime(event.end);

      if (isSameDay(endOfEvent, localNow)) {
        happeningToday.push(event);
      } else if (endOfEvent.compare(localNow) < 0) {
        pastEvents.push(event);
      } else {
        upcomingEvents.push(event as SerializedEvent);
      }

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
