"use client";

import type { ReactNode } from "react";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  type CardProps,
  Chip,
  cn,
  Link,
  Skeleton,
} from "@heroui/react";
import {
  ArrowTopRightOnSquareIcon,
  CalendarDaysIcon,
  MapPinIcon,
} from "@heroicons/react/16/solid";

import {
  getLocalTimeZone,
  DateFormatter,
  parseDateTime,
  fromAbsolute,
} from "@internationalized/date";
import {
  eventKindColorMap,
  eventKindTextMap,
  SerializedEvent,
} from "@/lib/events";
import MarkdownRenderer from "./markdown-renderer";

// const timeZone = getLocalTimeZone();
const timeZone = "America/New_York";

const dateFormatter = new DateFormatter("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
  hour: "numeric",
  minute: "numeric",
  timeZoneName: "short",
  timeZone,
});

export interface EventCardProps extends CardProps {
  event: SerializedEvent;
  rsvpIsDisabled?: boolean;
  footer?: ReactNode;
  className?: string;
}

export default function EventCard(props: EventCardProps) {
  const { event, rsvpIsDisabled, footer, className } = props;

  return (
    <Card
      isBlurred
      shadow="sm"
      className={cn("diagonal-lines !bg-default/20 p-2", className)}
      {...props}
    >
      <CardHeader className="flex flex-col items-start pb-0">
        <div className="mb-2 flex h-8 w-full items-center justify-between gap-4">
          <div className="flex flex-1 items-center gap-4">
            {event.public || <Chip color="default">Unpublished</Chip>}

            {event.kind && (
              <Chip color={eventKindColorMap[event.kind]}>
                {eventKindTextMap[event.kind]}
              </Chip>
            )}
          </div>

          {event.rsvp && (
            <Button
              as={Link}
              href={event.rsvp}
              isExternal
              showAnchorIcon
              size="sm"
              isDisabled={rsvpIsDisabled}
              anchorIcon={<ArrowTopRightOnSquareIcon className="size-4" />}
              variant="flat"
            >
              RSVP
            </Button>
          )}
        </div>

        <h3 className="text-2xl font-bold">{event.title}</h3>

        <span className="flex flex-col">
          {event.location && (
            <div className="text-md text-foreground-500 flex items-center gap-2">
              <MapPinIcon className="h-4 w-4" />
              <span className="flex-1">{event.location}</span>
            </div>
          )}

          {event.start && (
            <div className="text-md text-foreground-500 flex items-center gap-2">
              <CalendarDaysIcon className="h-4 w-4" />
              <span className="flex-1" suppressHydrationWarning>
                {event.end
                  ? dateFormatter.formatRange(
                      event.start.toDate(),
                      event.end.toDate(),
                    )
                  : dateFormatter.format(event.start.toDate())}
              </span>
            </div>
          )}
        </span>
      </CardHeader>

      <CardBody>
        <MarkdownRenderer>{event.description}</MarkdownRenderer>
      </CardBody>

      {footer && <CardFooter className="flex justify-end">{footer}</CardFooter>}
    </Card>
  );
}
