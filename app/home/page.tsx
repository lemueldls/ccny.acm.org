"use client";

import { SimpleIconsDiscord } from "@/components/icons/discord";
import { SimpleIconsInstagram } from "@/components/icons/instagram";
import { SimpleIconsGithub } from "@/components/icons/github";
import {
  EnvelopeIcon as EnvelopeIcon20,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/20/solid";
import { EnvelopeIcon as EnvelopeIcon16 } from "@heroicons/react/16/solid";

import {
  majorMonoDisplay,
  ppNeueMachinaInktrack,
  ppNeueMachinaPlain,
  calTitle,
} from "@/styles/fonts";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Divider,
  Chip,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Image,
  ScrollShadow,
} from "@nextui-org/react";
import { Carousel } from "primereact/carousel";
import Tilt from "react-parallax-tilt";
import { SimpleIconsLinkedin } from "@/components/icons/linkedin";
import { events, type Event } from "@/lib/events";
import EventsAccordion from "@/components/events-accordion";

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
    <div className="flex min-h-screen flex-col">
      <Navbar className="texture">
        <NavbarContent justify="start">
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
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="flex gap-8" justify="center">
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
        </NavbarContent>
        <NavbarContent className="hidden sm:flex" justify="end">
          <NavbarItem>
            <Button
              as={Link}
              color="default"
              href="https://discord.com/invite/CsntEuGJe5"
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
              <EnvelopeIcon20 className="h-5 w-5" />
            </Button>
          </NavbarItem>

          {/* <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem> */}
        </NavbarContent>
      </Navbar>

      <ScrollShadow visibility="both" className="circuit-board mb-8 px-4 py-8">
        <div className="container mx-auto flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-8 sm:my-32">
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

            <div className="mb-4 text-center">
              <h1
                className={`text-6xl font-bold shadow-primary text-shadow lg:text-8xl ${ppNeueMachinaPlain.className}`}
              >
                BEAVERS CODE
              </h1>

              <span className="text-3xl font-bold lg:text-4xl">
                (ACM @ CCNY)
              </span>
            </div>

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
                href="https://discord.com/invite/CsntEuGJe5"
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
            className="block w-full max-w-[75rem] bg-background/60 p-8 dark:bg-default/10"
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
                  size="lg"
                  isExternal
                  showAnchorIcon
                  anchorIcon={
                    <ArrowTopRightOnSquareIcon className="mx-1 h-5 w-5" />
                  }
                  className="text-2xl"
                >
                  ACM
                </Link>{" "}
                and{" "}
                <Link
                  href="https://developers.google.com/community/gdsc"
                  size="md"
                  isExternal
                  showAnchorIcon
                  anchorIcon={
                    <ArrowTopRightOnSquareIcon className="mx-1 h-5 w-5" />
                  }
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

      <div className="container mx-auto my-8 flex flex-col gap-12 p-4">
        <h2 id="team" className="text-3xl font-bold">
          Meet the Team
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {theTeam.map((member, index) => (
            <Tilt key={index}>
              <Card
                isBlurred
                className="border-none bg-background/60 p-2 dark:bg-default/10"
                shadow="sm"
              >
                <CardBody className="grid grid-cols-[fit-content(8rem)_1fr] grid-rows-[fit-content(8rem)_1fr] gap-4 overflow-visible">
                  <Image
                    isZoomed
                    // isBlurred
                    // as={NextImage}
                    width={128}
                    height={128}
                    src={member.image || "/logo.png"}
                    // fallbackSrc="/logo.png"
                    alt={member.name}
                    classNames={{
                      wrapper: "row-span-1 lg:row-span-2",
                      img: "object-cover object-center w-32 h-32 hover:scale-110 hover:translate-y-1.5",
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
                    {/* {member.website && (
                        <Button
                          as={Link}
                          href={member.website}
                          variant="light"
                          isExternal
                          isIconOnly
                        >
                          <GlobeAltIcon className="h-5 w-5" />
                        </Button>
                      )} */}

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
                      startContent={<EnvelopeIcon16 className="h-4 w-4" />}
                    >
                      Email
                    </Button>
                  </div>
                </CardBody>
              </Card>
            </Tilt>
          ))}
        </div>
      </div>

      <div className="container mx-auto my-8 flex flex-col gap-8 p-4">
        <h2 id="events" className="text-3xl font-bold">
          Events
        </h2>

        <EventsAccordion />
      </div>

      <footer className="flex flex-col items-center justify-center gap-8 py-8">
        &copy; 2024 Beavers Code
      </footer>
    </div>
  );
}
