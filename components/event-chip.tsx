import { preloadQuery } from "convex/nextjs";

import { api } from "@/convex/_generated/api";

import EventChipClient from "./event-chip.client";

export default async function EventChip() {
  const events = await preloadQuery(api.events.getAllEvents);

  return <EventChipClient preloadedEvents={events} />;
}
