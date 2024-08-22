"use client";
import { SimpleIconsDiscord } from "@/components/icons/discord";
import { SimpleIconsInstagram } from "@/components/icons/instagram";
import { MaterialSymbolsMailOutline } from "@/components/icons/mail";
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
  ScrollShadow,
} from "@nextui-org/react";
import { Carousel } from "primereact/carousel";
import { Event, Events } from "./page";

export default function HomePage() {
  const events: Event[] = [
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
        "Dive into design fundamentals in this interactive session where you'll use Figma to craft your own designs! Please bring your laptop and create a Figma account prior to attending. <a href=\"https://www.youtube.com/watch?v=uzYMWKd6OP4&ab_channel=Pixel%26Bracket\">Here's a tutorial!</a>",
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

  const now = new Date();
  const utcNow = new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    now.getUTCMinutes(),
    now.getUTCSeconds(),
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

      if (event.end < endOfToday) {
        pastEvents.push(event);
      } else if (event.start < endOfToday && event.end > endOfToday) {
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
    <div className="flex min-h-screen flex-col ">
      <Navbar className="texture">
        <NavbarBrand>
          {/* <AcmeLogo /> */}
          {/* <h1
              className={`mb-4 font-bold text-inherit ${majorMonoDisplay.className}`}
            >
              Beavers Code
            </h1> */}
        </NavbarBrand>
        <NavbarContent className="hidden gap-4 sm:flex" justify="center">
          <NavbarItem>
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
          </NavbarItem>
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
              href="https://www.instagram.com/beaverscode/"
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
              href="mailto:support@beaverscode.club"
              isExternal
              variant="light"
              isIconOnly
            >
              <MaterialSymbolsMailOutline className="h-5 w-5" />
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <ScrollShadow visibility="both" className="circuit-board mb-8 py-8">
        <div className="container mx-auto flex flex-col items-center gap-8 px-24">
          <div className="my-32 flex flex-col items-center gap-8">
            {happeningToday.length > 0 && (
              <Chip
                color="danger"
                size="lg"
                variant="flat"
                className="diagonal-lines flex gap-2 px-2 py-6"
                as={Link}
                href="#happening-today"
                startContent={
                  <Chip color="danger" size="lg" variant="shadow">
                    Happening Today
                  </Chip>
                }
              >
                {happeningToday[0].title}
              </Chip>
            )}

            {upcomingEvents.length > 0 && (
              <Chip
                color="secondary"
                size="lg"
                variant="flat"
                className="diagonal-lines flex gap-2 px-2 py-6"
                as={Link}
                href="#upcoming-events"
                startContent={
                  <Chip color="secondary" size="lg" variant="shadow">
                    Upcoming Event
                  </Chip>
                }
              >
                {upcomingEvents[0].title}
              </Chip>
            )}

            <h1
              className={`mb-4 text-8xl font-bold ${ppNeueMachinaInktrack.className}`}
            >
              Beavers Code
            </h1>

            <div className="flex flex-col items-stretch gap-4">
              <Button
                color="primary"
                variant="shadow"
                size="lg"
                as={Link}
                href="https://forms.gle/ntqFUAX7TERrq3oe8"
                isExternal
              >
                Interest Form
              </Button>
            </div>
          </div>

          <Card
            isBlurred
            className="max-w-[75rem] border-none bg-background/60 p-8 dark:bg-default/10"
            shadow="sm"
          >
            <CardHeader className="grid grid-cols-8 place-items-center gap-8 ">
              <img
                src="/ccny-collab.svg"
                className="col-span-5"
                alt="CCNY Collab"
              />
              <Divider orientation="vertical" className="col-span-1 ml-8" />
              <Carousel
                className="col-span-2"
                value={[
                  { name: "ACM", image: "/acm.svg" },
                  { name: "GDSC", image: "/gdsc.svg" },
                  // { name: "GitHub", image: "/github.svg" },
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
              <p className="text-2xl">
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
                science neue machina at the City College of New York.
              </p>
            </CardBody>
          </Card>
        </div>
      </ScrollShadow>

      <div className="container mx-auto flex w-full flex-col gap-8">
        {happeningToday.length > 0 && (
          <div id="happening-today" className="flex flex-col gap-8">
            <h2 className="text-4xl font-bold">Happening Today</h2>
            <Events events={happeningToday} />
          </div>
        )}

        {upcomingEvents.length > 0 && (
          <div className="flex flex-col gap-8">
            <h2 id="upcoming-events" className="text-4xl font-bold">
              Upcoming Events
            </h2>
            <Events events={upcomingEvents} />
          </div>
        )}

        <h2 className="text-4xl font-bold">Past Events</h2>
        <Events events={pastEvents} />
      </div>
    </div>
  );
}
