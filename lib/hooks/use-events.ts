"use client";

import { useState, useEffect } from "react";

import type { SerializedEvent } from "@/lib/events";

import { toast } from "sonner";

export default function useEvents() {
  const [events, setEvents] = useState<SerializedEvent[]>();

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then(setEvents)
      .catch((err) => toast.error(err.message));
  }, []);

  return events;
}
