import EventsAccordion from "@/components/events-accordion";

export default function HomePageEvents() {
  return (
    <div className="container mx-auto my-8 flex flex-col gap-8 p-4">
      <h2 id="events" className="text-3xl font-bold">
        Events
      </h2>

      <EventsAccordion />
    </div>
  );
}
