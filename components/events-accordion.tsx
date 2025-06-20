import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

import EventsAccordionClient, {
  type EventsAccordionClientProps,
} from "./events-accordion.client";

interface EventAccordionProps
  extends Omit<EventsAccordionClientProps, "preloadedEvents"> {}

export default async function EventsAccordion(props: EventAccordionProps) {
  const events = await preloadQuery(api.events.getAllEvents);

  return <EventsAccordionClient {...props} preloadedEvents={events} />;
}
