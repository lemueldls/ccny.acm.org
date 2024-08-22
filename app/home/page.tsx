"use client";

import { SimpleIconsDiscord } from "@/components/icons/discord";
import { SimpleIconsGoogleforms } from "@/components/icons/google-forms";
import { SimpleIconsInstagram } from "@/components/icons/instagram";
import { SimpleIconsGithub } from "@/components/icons/github";
import { EnvelopeIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import {
  majorMonoDisplay,
  ppNeueMachinaInktrack,
  ppNeueMachinaPlain,
} from "@/styles/fonts";
import {
  Accordion,
  AccordionItem,
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Button,
  Divider,
  Chip,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  Image,
  NavbarMenuItem,
  ScrollShadow,
} from "@nextui-org/react";
import { Carousel } from "primereact/carousel";
import Tilt from "react-parallax-tilt";
import { SimpleIconsLinkedin } from "@/components/icons/linkedin";

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

interface Event {
  title: string;
  start: Date;
  end: Date;
  description: string;
  location: string;
  kind: "workshop" | "hackathon" | "meeting";
}

const events: Event[] = [
  {
    title: "TD Bank",
    start: new Date(Date.UTC(2024, 9, 1, 17, 30)),
    end: new Date(Date.UTC(2024, 9, 1, 18, 45)),
    description: "its bankin' time ‼️",
    location: "NAC Ballroom",
    kind: "workshop",
  },
  {
    title: "Codédex",
    start: new Date(Date.UTC(2024, 8, 26, 17, 30)),
    end: new Date(Date.UTC(2024, 8, 26, 18, 45)),
    description: "its codixn' time ‼️",
    location: "NAC Ballroom",
    kind: "workshop",
  },
  {
    title: "IEEE × ACM Intro to C++ Workshop",
    start: new Date(Date.UTC(2024, 2, 21, 17, 30)),
    end: new Date(Date.UTC(2024, 2, 21, 18, 45)),
    description:
      "Unsure how to start your journey in learning C++ or need a refresher? Join this collaboration with the Institute of Electrical and Electronics Engineers where we take your coding skills to the next level!",
    location: "NAC 4/222",
    kind: "workshop",
  },
  {
    title: "Intro to UI/UX with Figma Workshop",
    start: new Date(Date.UTC(2024, 2, 14, 17, 30)),
    end: new Date(Date.UTC(2024, 2, 14, 18, 45)),
    description:
      "Dive into design fundamentals in this interactive session where you'll use Figma to craft your own designs! Please bring your laptop and create a Figma account prior to attending.",
    location: "NAC 4/222",
    kind: "workshop",
  },
  {
    title: "Data Structures Workshop",
    start: new Date(Date.UTC(2024, 1, 29, 17, 30)),
    end: new Date(Date.UTC(2024, 1, 29, 18, 45)),
    description:
      "Dive into data structures fundamentals and gain essential skills to tackle programming challenges with confidence in this beginner-friendly workshop!",
    location: "NAC 4/222",
    kind: "workshop",
  },
  {
    title: "Git/GitHub Workshop",
    start: new Date(Date.UTC(2024, 1, 27, 17, 30)),
    end: new Date(Date.UTC(2024, 1, 27, 18, 45)),
    description:
      "Unleash your coding potential with Git and GitHub, mastering version control, collaboration, and streamlined workflows!",
    location: "NAC 4/222",
    kind: "workshop",
  },
  {
    title: "Hackathon Guide Workshop",
    start: new Date(Date.UTC(2024, 1, 20, 17, 30)),
    end: new Date(Date.UTC(2024, 1, 20, 18, 45)),
    description:
      "Join us for a hackathon guide workshop where we'll provide you with the tools and tips to make the most of your hackathon experience!",
    location: "NAC 4/222",
    kind: "workshop",
  },
  {
    title: "GWC × ACM Intro to Web Development Workshop",
    start: new Date(Date.UTC(2024, 1, 15, 17, 30)),
    end: new Date(Date.UTC(2024, 1, 15, 18, 45)),
    description: "Join us for an introduction to web development!",
    location: "NAC 6/313",
    kind: "workshop",
  },
  {
    title: "Machine Learning Retrieval Augmented Generation Workshop",
    start: new Date(Date.UTC(2024, 1, 1, 17, 30)),
    end: new Date(Date.UTC(2024, 1, 1, 18, 45)),
    description:
      "Our first workshop will teach you how to use PDFs and text files to extract key information to answer your questions, just like Chat GPT-4.0!",
    location: "NAC 7/118",
    kind: "workshop",
  },
];

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
    image:
      "https://media.licdn.com/dms/image/v2/D4E03AQH1wqWN1yx14Q/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1682277132785?e=1729728000&v=beta&t=l40JyNHtTQPz04n128zmJmy9KjYW2qJI-x1iBGtuRD0",
    email: "sabrar000@citymail.cuny.edu",
    linkedin: "sehr-abrar",
  },
  {
    name: "Evan Haque",
    position: "Vice President",
    image:
      "https://cdn.discordapp.com/attachments/1201990908095250492/1275939446650437826/IMG_6915.jpg?ex=66c7b6b5&is=66c66535&hm=4c42243b1997748f9f578661f73a9b73c8f3a0561865d4e61781fa9bfce5651a&",
    email: "ehaque002@citymail.cuny.edu",
    linkedin: "evanhaque1738",
  },
  {
    name: "Jawad Chowdhury",
    position: "Treasury",
    image: "",
    email: "jchowdh002@citymail.cuny.edu",
    linkedin: "jawad-chy",
  },
  {
    name: "Srewashi Mondal",
    position: "Secretary",
    image: "",
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
    image:
      "https://media.licdn.com/dms/image/v2/D4E03AQF9fN9rKnJv3A/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1704600989600?e=1729728000&v=beta&t=8P2dyrmTeYzgEpCrt4S77ZNKOhZt749fkhbVI3ZsX6g",
    email: "ttan001@citymail.cuny.edu",
    linkedin: "timsontan",
  },
  {
    name: "Lemuel De Los Santos",
    position: "Web Designer",
    image:
      "https://media.licdn.com/dms/image/v2/C4D03AQFkAWQZ7ZrP1w/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1655841037728?e=1729728000&v=beta&t=Y37GCuBqa8SyuKsl4n0aqLUA_kpnY2rfdYKZdLYEBRE",
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

export default function HomePage() {
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
    (acc, event) => {
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

  const router = useRouter();

  interface Brand {
    name: string;
    image: string;
  }

  function BrandTemplate(brand: Brand) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <img src={brand.image} className="w-2/3" alt={brand.name} />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col ">
      <Navbar className="texture">
        <NavbarBrand>
          <Link href="/">
            <Image
              src="/logo.png"
              width={44}
              height={44}
              alt="Logo"
              className="rounded-full"
            />
          </Link>
          {/* <AcmeLogo /> */}
          {/* <h1
            className={`mb-4 font-bold text-inherit ${majorMonoDisplay.className}`}
          >
            Beavers Code
          </h1> */}
        </NavbarBrand>
        <NavbarContent className="hidden gap-4 sm:flex">
          <NavbarItem>
            <Link color="foreground" href="#team">
              Team
            </Link>
          </NavbarItem>

          <NavbarItem>
            <Link color="foreground" href="#events">
              Events
            </Link>
          </NavbarItem>
          {/* <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page">
              Customers
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem> */}
        </NavbarContent>
        <NavbarContent justify="end">
          {/* <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem> */}
          <NavbarItem>
            <Button
              as={Link}
              color="default"
              href="https://discord.gg/asZTkKZK5j"
              isExternal
              variant="light"
              isIconOnly
            >
              <SimpleIconsDiscord className="h-5 w-5" />
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              color="default"
              href="https://www.instagram.com/acm.ccny/"
              isExternal
              variant="light"
              isIconOnly
            >
              <SimpleIconsInstagram className="h-5 w-5" />
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              color="default"
              href="https://www.linkedin.com/in/ccnyacm/"
              isExternal
              variant="light"
              isIconOnly
            >
              <SimpleIconsLinkedin className="h-5 w-5" />
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              color="default"
              href="mailto:ccnyacm@gmail.com"
              isExternal
              variant="light"
              isIconOnly
            >
              <EnvelopeIcon className="h-5 w-5" />
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <ScrollShadow visibility="both" className="circuit-board mb-8 px-4 py-8">
        <div className="container mx-auto flex flex-col items-center gap-8">
          <div className="my-32 flex flex-col items-center gap-8">
            {happeningToday.length > 0 && (
              <Chip
                color="danger"
                size="lg"
                variant="flat"
                className="diagonal-lines mb-8 flex gap-2 px-2 py-6"
                as={Link}
                href="#happening-today"
                startContent={
                  <Chip color="danger" size="lg" variant="shadow">
                    Happening Today
                  </Chip>
                }
              >
                {happeningToday[happeningToday.length - 1].title}
              </Chip>
            )}

            {upcomingEvents.length > 0 && (
              <Chip
                color="secondary"
                size="lg"
                variant="flat"
                className="diagonal-lines mb-8 flex gap-2 px-2 py-6"
                as={Link}
                href="#upcoming-events"
                startContent={
                  <Chip color="secondary" size="lg" variant="shadow">
                    Upcoming Event
                  </Chip>
                }
              >
                {upcomingEvents[upcomingEvents.length - 1].title}
              </Chip>
            )}

            <span className="text-xl lg:text-3xl">Welcome to</span>

            <h1
              className={`mb-4 text-center text-6xl font-bold shadow-primary text-shadow lg:text-8xl ${ppNeueMachinaPlain.className}`}
            >
              BEAVERS CODE
            </h1>

            <div className="flex flex-col items-stretch gap-4 sm:flex-row">
              <Button
                color="primary"
                variant="shadow"
                size="lg"
                // startContent={<SimpleIconsGoogleforms className="h-5 w-5" />}
                as={Link}
                href="https://groups.ccny.cuny.edu/ACM/club_signup"
                isExternal
              >
                Join Us on Campus Groups!
              </Button>
              <Button
                variant="flat"
                size="lg"
                startContent={<SimpleIconsDiscord className="h-5 w-5" />}
                as={Link}
                href="https://discord.gg/asZTkKZK5j"
                isExternal
              >
                Join the Discord
              </Button>
            </div>
          </div>

          {/* <iframe
            src="https://discord.com/widget?id=1153359326828838982&theme=dark"
            width="350"
            height="500"
            allowtransparency="true"
            frameborder="0"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          ></iframe> */}

          <Card
            isBlurred
            className="w-full max-w-[75rem] bg-background/60 p-8 dark:bg-default/10"
            shadow="sm"
          >
            <CardHeader className="grid place-items-center lg:grid-cols-8">
              <img
                src="/ccny-collab.svg"
                className="lg:col-span-5"
                alt="CCNY Collab"
              />
              <Divider
                orientation="vertical"
                className="col-span-1 hidden lg:block"
              />
              <Divider
                orientation="horizontal"
                className="mt-4 block lg:hidden"
              />
              <Carousel
                className="lg:col-span-2"
                value={[
                  { name: "ACM", image: "/acm.svg" },
                  { name: "GDSC", image: "/gdsc.svg" },
                  // { name: "GitHub", image: "/github-light.svg" },
                ]}
                showIndicators={false}
                showNavigators={false}
                orientation="vertical"
                autoplayInterval={3000}
                itemTemplate={BrandTemplate}
                pt={{
                  item: { className: "h-full items-center justify-center" },
                  itemCloned: {
                    className:
                      "flex shrink-0 grow w-full h-full items-center justify-center",
                  },
                }}
              />
            </CardHeader>

            <CardBody>
              <p className="m-auto w-full max-w-[50rem] text-center text-2xl">
                In collaboration with{" "}
                <Link
                  href="https://www.acm.org/"
                  isExternal
                  showAnchorIcon
                  className="text-2xl"
                >
                  ACM
                </Link>
                and{" "}
                <Link
                  href="https://developers.google.com/community/gdsc"
                  isExternal
                  showAnchorIcon
                  className="text-2xl"
                >
                  GDSC
                </Link>
                , we are proud to present Beavers Code, a student-led computer
                science club at the City College of New York.
              </p>
            </CardBody>
          </Card>
        </div>
      </ScrollShadow>

      <div className="container mx-auto my-8 flex flex-col gap-12 px-4 py-8">
        <h2 id="team" className="text-3xl font-bold">
          Meet the Team
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {theTeam.map((member, index) => (
            <Card
              key={index}
              isBlurred
              className="border-none bg-background/60 p-2 dark:bg-default/10"
              shadow="sm"
            >
              <CardBody className="grid grid-cols-[fit-content(8rem)_1fr] grid-rows-[fit-content(8rem)_1fr] gap-4 overflow-visible">
                <Image
                  isBlurred
                  width={128}
                  height={128}
                  src={member.image}
                  fallbackSrc="https://via.placeholder.com/128x128"
                  alt={member.name}
                  classNames={{
                    wrapper: "row-span-1 lg:row-span-2",
                    img: "object-cover",
                  }}
                />

                <div className="flex flex-1 flex-col items-start justify-start">
                  <h3 className="text-3xl font-semibold leading-none text-default-600">
                    {member.name}
                  </h3>
                  <span className="text-xl text-default-500">
                    {member.position}
                  </span>
                </div>

                <div className="col-span-2 flex items-end justify-end gap-2 lg:col-span-1">
                  {member.website && (
                    <Button
                      as={Link}
                      href={member.website}
                      variant="light"
                      isExternal
                      isIconOnly
                    >
                      <GlobeAltIcon className="h-5 w-5" />
                    </Button>
                  )}

                  {member.github && (
                    <Button
                      as={Link}
                      href={`https://github.com/${member.github}`}
                      variant="light"
                      isExternal
                      isIconOnly
                    >
                      <SimpleIconsGithub className="h-5 w-5" />
                    </Button>
                  )}

                  {member.linkedin && (
                    <Button
                      as={Link}
                      href={`https://linkedin.com/in/${member.linkedin}`}
                      variant="light"
                      isExternal
                      isIconOnly
                    >
                      <SimpleIconsLinkedin className="h-5 w-5" />
                    </Button>
                  )}

                  <Button
                    as={Link}
                    href={`mailto:${member.email}`}
                    color="primary"
                    variant="flat"
                    isExternal
                    startContent={<EnvelopeIcon className="h-5 w-5" />}
                  >
                    Email
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      <div className="container mx-auto my-8 flex flex-col gap-8 px-8">
        <h2 id="events" className="text-3xl font-bold">
          Events
        </h2>

        <Accordion
          selectionMode="multiple"
          disabledKeys={[
            ...(happeningToday.length < 1 ? ["1"] : []),
            ...(upcomingEvents.length < 1 ? ["2"] : []),
          ]}
          defaultExpandedKeys={[
            ...(happeningToday.length > 0 ? ["1"] : []),
            ...(upcomingEvents.length > 0 ? ["2"] : []),
          ]}
          className="flex flex-col gap-8"
        >
          <AccordionItem
            key="1"
            aria-label="Happening Today"
            title="Happening Today"
            id="happening-today"
            onPress={() => router.push("#happening-today")}
            className="flex flex-col gap-8"
            classNames={{ title: "text-4xl font-bold" }}
          >
            <Events events={happeningToday} />
          </AccordionItem>

          <AccordionItem
            key="2"
            aria-label="Upcoming Events"
            title="Upcoming Events"
            id="upcoming-events"
            onPress={() => router.push("#upcoming-events")}
            className="flex flex-col gap-8"
            classNames={{ title: "text-4xl font-bold" }}
          >
            <Events events={upcomingEvents} />
          </AccordionItem>

          <AccordionItem
            key="3"
            aria-label="Past Events"
            title="Past Events"
            id="past-events"
            onPress={() => router.push("#past-events")}
            classNames={{ title: "text-4xl font-bold" }}
          >
            <Events events={pastEvents} />
          </AccordionItem>
        </Accordion>
      </div>

      <footer className="flex flex-col items-center justify-center gap-8 py-8">
        &copy; 2024 Beavers Code
      </footer>
    </div>
  );
}

interface EventsProps {
  events: Event[];
}

function Events({ events }: EventsProps) {
  const chipColors = {
    workshop: "primary",
    hackathon: "danger",
    meeting: "success",
  } as const;

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-[repeat(auto-fill,minmax(24rem,1fr))]">
      {events.map((event, index) => (
        <Tilt key={index}>
          <Card
            isBlurred
            className="border-none bg-background/60 p-2 dark:bg-default/10"
            shadow="sm"
          >
            <CardHeader className="flex flex-col items-start gap-2">
              <h3 className="flex w-full flex-col justify-between gap-4 text-2xl font-bold lg:flex-row">
                {event.title}
                <Chip color={chipColors[event.kind]}>{event.kind}</Chip>
              </h3>

              <span className="flex flex-col">
                <span className="text-md text-foreground-500">
                  {event.location}
                </span>
                <span className="text-md font-bold text-foreground-500">
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
          </Card>
        </Tilt>
      ))}
    </div>
  );
}
