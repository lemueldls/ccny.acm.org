"use client";

import { SimpleIconsDiscord } from "@/components/icons/discord";
import { SimpleIconsInstagram } from "@/components/icons/instagram";
import { SimpleIconsGithub } from "@/components/icons/github";
import {
  EnvelopeIcon as EnvelopeIcon20,
  ArrowTopRightOnSquareIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/20/solid";
import { useTheme } from "next-themes";

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
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Image,
  ScrollShadow,
} from "@nextui-org/react";
import NextImage from "next/image";
import { Carousel } from "primereact/carousel";
import Tilt from "react-parallax-tilt";
import { SimpleIconsLinkedin } from "@/components/icons/linkedin";
import EventsAccordion from "@/components/events-accordion";
import EventChip from "@/components/event-chips";

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
    image: "/team/sehr-abrar.jpg",
    email: "sabrar000@citymail.cuny.edu",
    linkedin: "sehr-abrar",
  },
  {
    name: "Evan Haque",
    position: "Vice President",
    image: "/team/evan-haque.jpg",
    email: "ehaque002@citymail.cuny.edu",
    linkedin: "evanhaque1738",
  },
  {
    name: "Jawad Chowdhury",
    position: "Treasury",
    image: "/team/jawad-chowdhury.jpg",
    email: "jchowdh002@citymail.cuny.edu",
    linkedin: "jawad-chy",
  },
  {
    name: "Srewashi Mondal",
    position: "Secretary",
    image: "/team/srewashi-mondal.jpg",
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
    image: "/team/timson-tan.jpg",
    email: "ttan001@citymail.cuny.edu",
    linkedin: "timsontan",
  },
  {
    name: "Lemuel De Los Santos",
    position: "Web Designer",
    image: "/team/lemuel-de-los-santos.jpg",
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
    image: "/team/daniel-chen.jpg",
    email: "dchen024@citymail.cuny.edu",
    linkedin: "daniel-chen297",
  },
  {
    name: "Sam Fenster",
    position: "Club Advisor",
    image: "/team/sam-fenster.jpg",
    email: "fenster@ccny.cuny.edu",
    linkedin: "samfenster",
  },
];

interface Brand {
  name: string;
  image: string;
}

function BrandTemplate(brand: Brand) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Image src={brand.image} className="w-2/3" alt={brand.name} />
    </div>
  );
}

export default function HomePage() {
  // const { theme, setTheme } = useTheme();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar className="texture">
        <NavbarContent justify="start">
          <NavbarBrand>
            <Link href="/">
              <Image
                as={NextImage}
                // src={`/logo-on-${theme || "dark"}.png`}
                src="/logo-on-dark.png"
                width={44}
                height={44}
                alt="Logo"
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
              className="hover:text-[#5865F2]"
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
              className="hover:text-[#E4405F]"
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
              className="hover:text-[#0A66C2]"
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
              className="hover:text-[#7D55C7]"
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
            <Button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              color="default"
              variant="light"
              isIconOnly
            >
              {theme === "dark" ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </Button>
          </NavbarItem> */}

          {/* <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem> */}
        </NavbarContent>
      </Navbar>

      <ScrollShadow visibility="both" className="circuit-board mb-8 px-4 py-8">
        <div className="container mx-auto flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-8 sm:my-32">
            <EventChip />

            <span className="text-xl lg:text-3xl">Welcome to</span>

            <div className="mb-4 text-center">
              <h1
                className={`text-6xl font-bold shadow-primary text-shadow lg:text-8xl ${ppNeueMachinaPlain.className}`}
              >
                BEAVERS CODE
              </h1>

              <span className="text-3xl font-bold shadow-secondary text-shadow lg:text-4xl">
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
                size="lg"
                className="hover:text-[#5865F2]"
                variant="flat"
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
                    // as={NextImage}
                    isZoomed
                    // isBlurred
                    width={128}
                    height={128}
                    // src={member.image || `/logo-on-${theme || "dark"}.png`}
                    src={member.image || "/logo-on-dark.png"}
                    // fallbackSrc="/logo.png"
                    alt={member.name}
                    classNames={{
                      wrapper: "row-span-1 lg:row-span-2",
                      img: "object-cover object-center w-32 h-32 hover:scale-110 hover:translate-y-1.5",
                    }}
                  />

                  <div className="flex flex-1 flex-col items-start justify-start">
                    <h3 className="text-3xl font-semibold leading-none text-foreground-600">
                      {member.name}
                    </h3>
                    <span className="text-xl text-foreground-500">
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
                      variant="ghost"
                      isExternal
                      startContent={<EnvelopeIcon20 className="h-5 w-5" />}
                    >
                      Email
                    </Button>

                    {/* <Button
                      as={Link}
                      href={`mailto:${member.email}`}
                      // color="primary"
                      variant="light"
                      isExternal
                      isIconOnly
                    >
                      <EnvelopeIcon20 className="h-5 w-5" />
                    </Button> */}
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
        &copy; 2024 Beavers Code (ACM @ CCNY)
      </footer>
    </div>
  );
}
