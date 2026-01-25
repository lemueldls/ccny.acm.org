"use client";

import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";

import { serializeEvent } from "../events";

export default function useEvents() {
  const events = useQuery(api.events.getAllEvents);

  return events?.map(serializeEvent);
}
