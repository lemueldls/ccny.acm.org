import type { ReactNode } from "react";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  type CardProps,
  Chip,
  Link,
  Skeleton,
} from "@nextui-org/react";
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
import { SerializedEvent } from "@/lib/events";
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

  const chipColors = {
    workshop: "primary",
    meeting: "secondary",
    informationSession: "success",
    hackathon: "danger",
  } as const;
  const chipText = {
    workshop: "workshop",
    meeting: "meeting",
    informationSession: "information session",
    hackathon: "hackathon",
  };

  return (
    <Card isBlurred className={`${className} !bg-default/20 p-2`} {...props}>
      <CardHeader className="flex flex-col items-start">
        <div className="mb-2 flex h-8 w-full items-center justify-between gap-4">
          <div className="flex-1">
            {event.kind && (
              <Chip className="font-bold" color={chipColors[event.kind]}>
                {chipText[event.kind]}
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
              anchorIcon={<ArrowTopRightOnSquareIcon className="h-4 w-4" />}
              variant="bordered"
            >
              RSVP
            </Button>
          )}
        </div>

        <h3 className="text-2xl font-bold">{event.title}</h3>

        <span className="flex flex-col">
          {event.location && (
            <div className="text-md flex items-center gap-2 text-foreground-500">
              <MapPinIcon className="h-4 w-4" />
              <span className="flex-1">{event.location}</span>
            </div>
          )}

          {event.start && (
            <div className="text-md flex items-center gap-2 text-foreground-500">
              <CalendarDaysIcon className="h-4 w-4" />
              <span className="flex-1">
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

export interface EventCardSkeletonProps extends CardProps {}

export function EventCardSkeleton(props: EventCardSkeletonProps) {
  const { className } = props;

  return (
    <Card isBlurred className={`${className} p-2`} {...props}>
      <CardHeader className="flex flex-col items-start">
        <Skeleton className="h-7 w-24 rounded-full" />

        <Skeleton className="mt-4 h-6 w-full rounded-lg" />

        <Skeleton className="mt-2 h-4 w-full rounded-lg" />
        <Skeleton className="mt-2 h-4 w-full rounded-lg" />
      </CardHeader>

      <CardBody>
        <Skeleton className="h-36 w-full rounded-lg" />
      </CardBody>
    </Card>
  );
}
