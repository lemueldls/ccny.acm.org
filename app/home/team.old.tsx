"use client";

import Tilt from "react-parallax-tilt";
import { Button, Card, CardBody, Image, Link } from "@heroui/react";

import { EnvelopeIcon } from "@heroicons/react/20/solid";

import { SimpleIconsGithub } from "@/components/icons/github";
import { SimpleIconsLinkedin } from "@/components/icons/linkedin";

import NextImage from "next/image";

interface TeamMember {
  name: string;
  position: string;
  image?: string;
  email: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

const executiveBoard = [
  {
    name: "Srewashi Mondal",
    position: "President",
    image: "/team/srewashi-mondal.jpg",
    email: "smondal002@citymail.cuny.edu",
    linkedin: "srewashi-mondal",
  },
  {
    name: "Evan Haque",
    position: "Vice President",
    image: "/team/evan-haque.jpg",
    email: "ehaque002@citymail.cuny.edu",
    linkedin: "evanhaque1738",
  },
  // {
  //   name: "Arnav Deepaware",
  //   position: "Vice President",
  //   image: "/team/arnav-deepaware.jpg",
  //   email: "adeepaw000@citymail.cuny.edu",
  //   linkedin: "arnavdeepaware",
  // },
  // {
  //   name: "Jawad Chowdhury",
  //   position: "Treasurer",
  //   image: "/team/jawad-chowdhury.jpg",
  //   email: "jchowdh002@citymail.cuny.edu",
  //   linkedin: "jawad-chy",
  // },
  {
    name: "Axyl Fredrick",
    position: "Social Media Manager",
    // image: "/team/axyl-fredrick.jpg",
    email: "afredri000@citymail.cuny.edu",
    linkedin: "axyl-fredrick",
  },
  {
    name: "Lemuel De Los Santos",
    position: "Secretary / Tech Lead",
    image: "/team/lemuel-de-los-santos.jpg",
    email: "ldeloss002@citymail.cuny.edu",
    linkedin: "lemueldls",
    github: "lemueldls",
    website: "https://lemueldls.dev",
  },
];

const extendedBoard: TeamMember[] = [
  {
    name: "Timson Tan",
    position: "Community Manager",
    image: "/team/timson-tan.jpg",
    email: "ttan001@citymail.cuny.edu",
    linkedin: "timsontan",
  },
  {
    name: "Lily Minchala",
    position: "Marketing Designer",
    // image: "/team/lily-minchala.jpg",
    email: "lmincha000@citymail.cuny.edu",
    linkedin: "lilyminchala",
  },
  {
    name: "Daniel Chen",
    position: "GDGC Campus Lead",
    image: "/team/daniel-chen.jpg",
    email: "dchen024@citymail.cuny.edu",
    linkedin: "daniel-chen297",
  },
  {
    name: "Sehr Abrar",
    position: "Notion Campus Lead",
    image: "/team/sehr-abrar.jpg",
    email: "sabrar000@citymail.cuny.edu",
    linkedin: "sehr-abrar",
  },
];

const staff: TeamMember[] = [
  {
    name: "Sam Fenster",
    position: "Club Advisor",
    image: "/team/sam-fenster.jpg",
    email: "fenster@ccny.cuny.edu",
    linkedin: "samfenster",
  },
];

export default function HomePageTeam() {
  return (
    <div className="container mx-auto my-8 flex flex-col gap-6 p-4">
      <h2 id="team" className="text-3xl font-bold">
        Meet the Team
      </h2>

      <h3 className="mt-4 text-center text-2xl font-bold">Executive Board</h3>

      <div className="mx-auto flex w-full max-w-5xl flex-wrap justify-center gap-6">
        {executiveBoard.map((member, index) => (
          <TeamMemberCard key={index} member={member} />
        ))}
      </div>

      <h3 className="mt-4 text-center text-2xl font-bold">Extended Board</h3>

      <div className="mx-auto flex w-full flex-wrap justify-center gap-6">
        {extendedBoard.map((member, index) => (
          <TeamMemberCard key={index} member={member} />
        ))}
      </div>

      <h3 className="mt-4 text-center text-2xl font-bold">Staff</h3>

      <div className="mx-auto flex w-full flex-wrap justify-center gap-6">
        {staff.map((member, index) => (
          <TeamMemberCard key={index} member={member} />
        ))}
      </div>
    </div>
  );
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  const zoom = 1.1;

  return (
    <Tilt className="max-w-[22rem] flex-1 flex-shrink basis-full lg:max-w-[30rem]">
      <Card
        isBlurred
        className="brick-wall border-none bg-background/60 p-2 dark:bg-default/10"
        shadow="sm"
      >
        <CardBody className="grid grid-cols-[fit-content(8rem)_1fr] grid-rows-[fit-content(8rem)_1fr] gap-5 overflow-visible">
          <Image
            as={NextImage}
            isZoomed
            isBlurred
            width={128 * zoom}
            height={128 * zoom}
            // src={member.image || `/logo-on-${theme || "dark"}.png`}
            src={member.image || "/logo-on-dark.png"}
            fallbackSrc="/logo-on-dark.png"
            alt={member.name}
            classNames={{
              wrapper: "row-span-1 lg:row-span-2",
              img: "object-cover object-center !size-32 hover:scale-110 hover:translate-y-1.5",
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
            title="Website"
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
                title="GitHub"
                variant="light"
                isExternal
                isIconOnly
              >
                <SimpleIconsGithub className="h-5 w-5" />
              </Button>
            )}

            {member.linkedin && (
              <Button
                href={`https://linkedin.com/in/${member.linkedin}`}
                as={Link}
                title="LinkedIn"
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
              variant="flat"
              isExternal
              startContent={<EnvelopeIcon className="h-5 w-5" />}
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
  );
}
