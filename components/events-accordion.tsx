import { Accordion, AccordionItem } from "@nextui-org/react";
import { events, type Event } from "@/lib/events";
import EventsCard from "./events-card";

interface TeamMember {
  name: string;
  position: string;
  image: string;
  email: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

const theTeam: TeamMember[] = [
  {
    name: "Sehr Abrar",
    position: "President",
    image: "/sehr-abrar.jpg",
    email: "sabrar000@citymail.cuny.edu",
    linkedin: "sehr-abrar",
  },
  {
    name: "Evan Haque",
    position: "Vice President",
    image: "/evan-haque.jpg",
    email: "ehaque002@citymail.cuny.edu",
    linkedin: "evanhaque1738",
  },
  {
    name: "Jawad Chowdhury",
    position: "Treasury",
    image: "/jawad-chowdhury.jpg",
    email: "jchowdh002@citymail.cuny.edu",
    linkedin: "jawad-chy",
  },
  {
    name: "Srewashi Mondal",
    position: "Secretary",
    image: "/srewashi-mondal.jpg",
    email: "smondal002@citymail.cuny.edu",
    linkedin: "srewashi-mondal",
  },
  {
    name: "Axyl Fredrick",
    position: "Social Media Manager",
    image: "",
    email: "afredri000@citymail.cuny.edu",
    linkedin: "axyl-fredrick",
  },
  {
    name: "Timson Tan",
    position: "Social Media Manager",
    image: "/timson-tan.jpg",
    email: "ttan001@citymail.cuny.edu",
    linkedin: "timsontan",
  },
  {
    name: "Lemuel De Los Santos",
    position: "Web Designer",
    image: "/lemuel-de-los-santos.jpg",
    email: "ldeloss002@citymail.cuny.edu",
    linkedin: "lemueldls",
    github: "lemueldls",
    website: "https://lemueldls.dev",
  },
  {
    name: "Lilly Minchala",
    position: "Marketing Designer",
    image: "",
    email: "lmincha000@citymail.cuny.edu",
    linkedin: "",
  },
  {
    name: "Samin Chowdhury",
    position: "Opportunities Coordinator",
    image: "",
    email: "schowdh047@citymail.cuny.edu",
    linkedin: "saminfchowdhury",
  },
  {
    name: "Daniel Chen",
    position: "Student Advisor",
    image: "/daniel-chen.jpg",
    email: "dchen024@citymail.cuny.edu",
    linkedin: "daniel-chen297",
  },
];

export default function EventsAccordion() {
  const now = new Date();
  const utcNow = new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds(),
  );

  const startOfToday = new Date(
    utcNow.getFullYear(),
    utcNow.getMonth(),
    utcNow.getDate(),
    0,
    0,
    0,
  );

  const endOfToday = new Date(
    utcNow.getFullYear(),
    utcNow.getMonth(),
    utcNow.getDate(),
    23,
    59,
    59,
  );

  const [happeningToday, upcomingEvents, pastEvents] = events.reduce<
    [Event[], Event[], Event[]]
  >(
    (acc, event, _i) => {
      const [happeningToday, upcomingEvents, pastEvents] = acc;

      if (event.end < startOfToday) {
        pastEvents.push(event);
      } else if (event.end < endOfToday) {
        happeningToday.push(event);
      } else {
        upcomingEvents.push(event);
      }

      return [happeningToday, upcomingEvents, pastEvents];
    },
    [[], [], []],
  );

  return (
    <Accordion
      variant="bordered"
      selectionMode="multiple"
      disabledKeys={[
        ...(happeningToday.length < 1 ? ["1"] : []),
        ...(upcomingEvents.length < 1 ? ["2"] : []),
      ]}
      defaultExpandedKeys={[
        ...(happeningToday.length > 0 ? ["1"] : []),
        ...(upcomingEvents.length > 0 ? ["2"] : []),
      ]}
    >
      <AccordionItem
        key="1"
        aria-label="Happening Today"
        title="Happening Today"
        id="happening-today"
        // onPress={() => router.push("#happening-today")}
        className="flex flex-col gap-8"
        classNames={{ title: "text-4xl font-bold" }}
      >
        <EventsCard events={happeningToday} />
      </AccordionItem>

      <AccordionItem
        key="2"
        aria-label="Upcoming Events"
        title="Upcoming Events"
        id="upcoming-events"
        // onPress={() => router.push("#upcoming-events")}
        className="flex flex-col gap-8"
        classNames={{ title: "text-4xl font-bold" }}
      >
        <EventsCard events={upcomingEvents} />
      </AccordionItem>

      <AccordionItem
        key="3"
        aria-label="Past Events"
        title="Past Events"
        id="past-events"
        // onPress={() => router.push("#past-events")}
        classNames={{ title: "text-4xl font-bold" }}
      >
        <EventsCard events={pastEvents} />
      </AccordionItem>
    </Accordion>
  );
}
