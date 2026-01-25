import { Button, Card, CardBody, CardHeader, Link } from "@heroui/react";

import EventsAccordion from "@/components/events-accordion";

import AdminEventsPageCreateEventButton from "./create-event";

export default function AdminEventsPage() {
  return (
    <Card isBlurred>
      <CardHeader className="justify-between">
        <h2 className="text-3xl font-bold">Events</h2>

        <AdminEventsPageCreateEventButton />
      </CardHeader>

      <CardBody>
        <EventsAccordion showEditLink />
      </CardBody>
    </Card>
  );
}
