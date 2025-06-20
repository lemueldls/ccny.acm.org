import { SimpleIconsDiscord } from "@/components/icons/discord";

import { ppNeueMachinaPlain } from "@/styles/fonts";
import { Button, Link, ScrollShadow } from "@heroui/react";
import EventChip from "@/components/event-chip";
// import HyperText from "@/components/ui/hyper-text";
import HomePageTeam from "./team";
import HomePageEvents from "./events";
import HomePageAbout from "./about";
import { useTheme } from "next-themes";
import HomePageHeader from "./header";
// import HomePageBulletin from "./bulletin";

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

export default function HomePage() {

  return (
    <div className="flex min-h-screen flex-col">
      <HomePageHeader />

      <ScrollShadow visibility="both" className="circuit-board mb-8 px-4 py-8">
        <div className="container mx-auto flex flex-col items-center gap-8">
          <div className="mb-32 mt-16 flex flex-col items-center gap-8 sm:mb-32 sm:mt-20">
            <div className="mb-8 min-h-12">
              <EventChip />
            </div>

            <span className="text-xl lg:text-3xl">Welcome to</span>

            <div className="mb-4 text-center">
              <h1
                className={`text-6xl font-extrabold lg:text-8xl ${ppNeueMachinaPlain.className}`}
              >
                BEAVERS CODE
                {/* <HyperText text="BEAVERS CODE" /> */}
              </h1>

              <span className="text-3xl font-bold lg:text-5xl">
                (<span className="text-shadow-sm shadow-secondary">ACM</span> @ <span className="text-shadow-sm shadow-primary">CCNY</span>)
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

          <HomePageAbout />
        </div>
      </ScrollShadow>

      {/* <HomePageBulletin /> */}

      <HomePageTeam />

      <HomePageEvents />


      <footer className="flex flex-col items-center justify-center gap-8 py-8">
        &copy; 2025 Beavers Code (ACM @ CCNY)
      </footer>
    </div>
  );
}
