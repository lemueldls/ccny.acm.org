import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Link,
} from "@nextui-org/react";
import type { Event } from "@/lib/events";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";

const dateFormatter = Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
  hour: "numeric",
  minute: "numeric",
  timeZoneName: "short",
  timeZone: "America/New_York",
});

export interface EventsCardProps {
  events: Event[];
}

export default function EventsCard({ events }: EventsCardProps) {
  const chipColors = {
    workshop: "primary",
    hackathon: "danger",
    meeting: "secondary",
  } as const;

  return (
    <div className="mb-2 grid grid-cols-1 gap-4 sm:grid-cols-[repeat(auto-fill,minmax(24rem,1fr))]">
      {events.map((event, index) => (
        <Card
          isBlurred
          key={index}
          className="border-none bg-background/60 p-2 dark:bg-default/10"
          shadow="sm"
        >
          <CardHeader className="flex flex-col items-start">
            <h3 className="flex w-full flex-col justify-between gap-4 text-2xl font-bold lg:flex-row">
              {event.title}
              <Chip color={chipColors[event.kind]}>{event.kind}</Chip>
            </h3>

            <span className="flex flex-col">
              <span className="text-md text-foreground-500">
                <strong>Location:</strong> {event.location}
              </span>
              <span className="text-md font-semibold text-foreground-500">
                {
                  dateFormatter
                    .formatRange(event.start, event.end)
                    .replaceAll(" ", " ") // U+2009 THIN SPACE
                    .replaceAll(" ", " ") // U+202F NARROW NO-BREAK SPACE
                }
              </span>
            </span>
          </CardHeader>

          <CardBody>
            {/* <p dangerouslySetInnerHTML={{ __html: event.description }} /> */}
            {event.description}
          </CardBody>

          {event.rsvp && (
            <CardFooter className="flex justify-end">
              <Button
                as={Link}
                href={event.rsvp}
                isExternal
                showAnchorIcon
                anchorIcon={<ArrowTopRightOnSquareIcon className="h-4 w-4" />}
                color="default"
                variant="flat"
              >
                RSVP
              </Button>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
}
