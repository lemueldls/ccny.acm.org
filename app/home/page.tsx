import { EnvelopeIcon as EnvelopeIcon24 } from "@heroicons/react/24/solid";
import { Button, Divider, Link, ScrollShadow, cn } from "@heroui/react";

import EventChip from "@/components/event-chip";
import { SimpleIconsDiscord } from "@/components/icons/discord";
import { SimpleIconsInstagram } from "@/components/icons/instagram";
import { SimpleIconsLinkedin } from "@/components/icons/linkedin";
import { SimpleIconsLinktree } from "@/components/icons/linktree";
import { LineShadowText } from "@/components/line-shadow";
// import HomePageBulletin from "./bulletin";
import { brand } from "@/lib/fonts";

import HomePageAbout from "./about";
import HomePageEvents from "./events";
import HomePageFooter from "./footer";
import HomePageHeader from "./header";
import HomePageTeam from "./team";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <HomePageHeader />

      <ScrollShadow visibility="both" className="circuit-board mb-8 p-4 pb-8">
        <div className="container mx-auto flex flex-col items-center gap-44">
          <div className="text-default-foreground mt-8 flex flex-col items-center gap-4 sm:mt-20">
            <div className="mb-4 min-h-26 sm:min-h-12">
              <EventChip />
            </div>

            <span className="text-xl lg:text-3xl">Welcome to</span>

            <h1 className={cn("mb-8 text-center font-bold text-8xl lg:text-9xl", brand.className)}>
              <LineShadowText
                as={"a"}
                href="https://www.acm.org/"
                target="_blank"
                rel="noopener noreferrer"
                shadowColor="#0085ca"
                title="Association for Computing Machinery"
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
                title="The City College of New York"
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

              <Divider orientation="vertical" className="hidden h-12 sm:block" />
              <Divider orientation="horizontal" className="block sm:hidden" />

              <div className="flex justify-center gap-4">
                <Button
                  as={Link}
                  size="lg"
                  title="Discord"
                  className="text-default-foreground hover:text-[#5865f2]"
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
                  className="text-default-foreground hover:text-[#e4405f]"
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
                  className="text-default-foreground hover:text-[#0a66c2]"
                  color="default"
                  href="https://www.linkedin.com/in/ccnyacm/"
                  isExternal
                  variant="flat"
                  isIconOnly
                >
                  <SimpleIconsLinkedin className="size-6" />
                </Button>
                {/* <Button
                  as={Link}
                  size="lg"
                  title="Linktree"
                  className="text-default-foreground hover:text-[#43e55e]"
                  color="default"
                  href="https://linktr.ee/acm.ccny"
                  isExternal
                  variant="flat"
                  isIconOnly
                >
                  <SimpleIconsLinktree className="size-6" />
                </Button> */}
                <Button
                  as={Link}
                  size="lg"
                  title="Email"
                  className="text-default-foreground hover:text-[#7d55c7]"
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

      <HomePageFooter />
    </div>
  );
}
