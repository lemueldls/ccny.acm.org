import { brand } from "@/styles/fonts";
import { Button, cn, Divider, Link, ScrollShadow } from "@heroui/react";
import EventChip from "@/components/event-chip";
import HomePageHeader from "./header";

import HomePageTeam from "./team";
import HomePageEvents from "./events";
import HomePageAbout from "./about";
// import HomePageBulletin from "./bulletin";

import { SimpleIconsDiscord } from "@/components/icons/discord";
import { SimpleIconsInstagram } from "@/components/icons/instagram";
import { SimpleIconsLinkedin } from "@/components/icons/linkedin";
import { EnvelopeIcon as EnvelopeIcon24 } from "@heroicons/react/24/solid";
import { LineShadowText } from "@/components/line-shadow";

import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

import { executiveBoard, extendedBoard, staff, type TeamMember } from "./team";

export default async function HomePage() {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const events = await convex.query(api.events.getAllEvents);

  const eventsJsonLd = events
    .filter((event) => event.public)
    .map((event) => ({
      "@type": "Event",
      name: event.title,
      description: event.description,
      startDate: event.start ? new Date(event.start).toISOString() : undefined,
      endDate: event.end ? new Date(event.end).toISOString() : undefined,
      location: event.location
        ? {
            "@type": "Place",
            name: event.location,
          }
        : undefined,
      organizer: {
        "@type": "Organization",
        name: "ACM @ CCNY",
      },
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      url: event.rsvp,
    }))
    .filter((event) => event.startDate); // only include events with start date

  const allTeamMembers = [...executiveBoard, ...extendedBoard, ...staff];

  const teamJsonLd = allTeamMembers.map((member) => ({
    "@type": "Person",
    name: member.name,
    jobTitle: member.position,
    image: member.image ? `${process.env.NEXT_PUBLIC_ROOT_URL}${member.image}` : undefined,
    email: member.email,
    sameAs: [
      member.linkedin ? `https://www.linkedin.com/in/${member.linkedin}` : undefined,
      member.github ? `https://github.com/${member.github}` : undefined,
      member.website,
    ].filter(Boolean),
    worksFor: {
      "@type": "Organization",
      name: "ACM @ CCNY",
    },
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [...eventsJsonLd, ...teamJsonLd],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <div className="flex min-h-screen flex-col">
        <HomePageHeader />

        <ScrollShadow visibility="both" className="circuit-board mb-8 p-4 pb-8">
          <div className="container mx-auto flex flex-col items-center gap-44">
            <div className="mt-8 flex flex-col items-center gap-4 sm:mt-20">
              <div className="mb-4 min-h-26 sm:min-h-12">
                <EventChip />
              </div>

              <span className="text-xl lg:text-3xl">Welcome to</span>

              <h1
                className={cn(
                  "mb-8 text-center text-7xl font-bold md:text-8xl lg:text-9xl",
                  brand.className,
                )}
              >
                <LineShadowText
                  as={"a"}
                  href="https://www.acm.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  shadowColor="#3db7e4"
                >
                  ACM
                </LineShadowText>{" "}
                @{" "}
                <LineShadowText
                  as={"a"}
                  href="https://www.ccny.cuny.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  shadowColor="#7d55c7"
                >
                  CCNY
                </LineShadowText>
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
                  Join Us on Campus Groups
                </Button>

                <Divider
                  orientation="vertical"
                  className="hidden h-12 sm:block"
                />
                <Divider orientation="horizontal" className="block sm:hidden" />

                <div className="flex justify-center gap-4">
                  <Button
                    as={Link}
                    size="lg"
                    title="Discord"
                    className="text-default-foreground hover:text-[#5865F2]"
                    color="default"
                    href="https://discord.com/invite/CsntEuGJe5"
                    isExternal
                    variant="flat"
                    isIconOnly
                  >
                    <SimpleIconsDiscord className="size-6" />
                  </Button>
                  <Button
                    as={Link}
                    size="lg"
                    title="Instagram"
                    className="text-default-foreground hover:text-[#E4405F]"
                    color="default"
                    href="https://www.instagram.com/acm.ccny/"
                    isExternal
                    variant="flat"
                    isIconOnly
                  >
                    <SimpleIconsInstagram className="size-6" />
                  </Button>
                  <Button
                    as={Link}
                    size="lg"
                    title="LinkedIn"
                    className="text-default-foreground hover:text-[#0A66C2]"
                    color="default"
                    href="https://www.linkedin.com/in/ccnyacm/"
                    isExternal
                    variant="flat"
                    isIconOnly
                  >
                    <SimpleIconsLinkedin className="size-6" />
                  </Button>
                  <Button
                    as={Link}
                    size="lg"
                    title="Email"
                    className="text-default-foreground hover:text-[#7D55C7]"
                    color="default"
                    href="mailto:ccnyacm@gmail.com"
                    isExternal
                    variant="flat"
                    isIconOnly
                  >
                    <EnvelopeIcon24 className="size-6" />
                  </Button>
                </div>
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

            <HomePageAbout />
          </div>
        </ScrollShadow>

        {/* <HomePageBulletin /> */}

        <HomePageTeam />

        <HomePageEvents />

        <footer className="texture bg-background/60 dark:bg-default/10 flex flex-col gap-4 p-4">
          <div className="m-4 flex flex-col justify-center gap-4 sm:flex-row sm:gap-16">
            <div>
              <strong className="mb-2 block text-lg">Connect</strong>

              <ul>
                <li>
                  <Link
                    isExternal
                    color="foreground"
                    href="https://forms.gle/ABKCKQmQmzvZWbCo8"
                  >
                    Club Team Applications
                  </Link>
                </li>
                <li>
                  <Link
                    isExternal
                    color="foreground"
                    href="https://groups.ccny.cuny.edu/ACM/club_signup"
                  >
                    Join Us on Campus Groups
                  </Link>
                </li>
                <li>
                  <Link
                    isExternal
                    color="foreground"
                    href="https://forms.gle/ntqFUAX7TERrq3oe8"
                  >
                    Our Club Interest Form
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <strong className="mb-2 block text-lg">Socials</strong>
              <ul>
                <li>
                  <Link
                    isExternal
                    color="foreground"
                    href="https://discord.com/invite/CsntEuGJe5"
                  >
                    Discord
                  </Link>
                </li>
                <li>
                  <Link
                    isExternal
                    color="foreground"
                    href="https://www.instagram.com/acm.ccny/"
                  >
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    isExternal
                    color="foreground"
                    href="https://www.linkedin.com/in/ccnyacm/"
                  >
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <strong className="mb-2 block text-lg">Contact</strong>

              <ul>
                <li>
                  <Link
                    isExternal
                    color="foreground"
                    href="mailto:ccnyacm@gmail.com"
                  >
                    ccnyacm@gmail.com
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <span className="text-center">&copy; 2025 ACM @ CCNY</span>
        </footer>
      </div>
    </>
  );
}
