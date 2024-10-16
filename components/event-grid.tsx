import { ReactNode } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardProps,
  Chip,
  Link,
  Skeleton,
} from "@nextui-org/react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";
import EventCard, { EventCardSkeleton } from "./event-card";
import { SerializedEvent } from "@/lib/events";

export interface EventGridProps {
  events: SerializedEvent[];
  rsvpIsDisabled?: boolean;
  renderFooter?: (event: SerializedEvent) => ReactNode;
}

export default function EventGrid({
  events,
  rsvpIsDisabled,
  renderFooter,
}: EventGridProps) {
  return (
    <div className="mb-2 grid grid-cols-1 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(28rem,1fr))]">
      {events.map((event, index) => (
        <EventCard
          key={index}
          event={event}
          rsvpIsDisabled={rsvpIsDisabled}
          footer={renderFooter?.(event)}
        />
      ))}
    </div>
  );
}

export interface EventGridSkeletonProps extends CardProps {}

export function EventGridSkeleton(props: EventGridSkeletonProps) {
  return (
    <div className="mb-2 grid grid-cols-1 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(28rem,1fr))]">
      {Array.from({ length: 3 }).map((_, i) => (
        <EventCardSkeleton key={i} {...props} />
      ))}
    </div>
  );
}
