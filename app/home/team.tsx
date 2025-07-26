"use client";

import Tilt from "react-parallax-tilt";
import { Button, Card, CardBody, Image, Link } from "@heroui/react";

import { EnvelopeIcon } from "@heroicons/react/20/solid";

import { SimpleIconsGithub } from "@/components/icons/github";
import { SimpleIconsLinkedin } from "@/components/icons/linkedin";

import NextImage from "next/image";
// import { useTheme } from "next-themes";

interface TeamMember {
  name: string;
  position: string;
  image?: string;
  email?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

const executiveBoard = [
  {
    name: "Srewashi Mondal",
    position: "President",
    image: "/team/srewashi-mondal.webp",
    email: "smondal002@citymail.cuny.edu",
    linkedin: "srewashi-mondal",
  },
  {
    name: "Evan Haque",
    position: "Vice President",
    image: "/team/evan-haque.webp",
    email: "ehaque002@citymail.cuny.edu",
    linkedin: "evanhaque1738",
  },
  {
    name: "Lemuel De Los Santos",
    position: "Secretary",
    image: "/team/lemuel-de-los-santos.webp",
    email: "ldeloss002@citymail.cuny.edu",
    linkedin: "lemueldls",
    github: "lemueldls",
    website: "https://lemueldls.dev",
  },
  {
    name: "Axyl Fredrick",
    position: "Treasurer",
    image: "/team/axyl-fredrick.webp",
    email: "afredri000@citymail.cuny.edu",
    linkedin: "axyl-fredrick",
  },
];

const extendedBoard: TeamMember[] = [
  {
    name: "Diana Lucero",
    position: "Social Media Chair",
    image: "/team/diana-lucero.webp",
    email: "dlucero000@citymail.cuny.edu",
    linkedin: "dianalucero15",
  },
  {
    name: "Debasree Sen",
    position: "Social Media Chair",
    image: "/team/debasree-sen.webp",
    email: "dsen000@citymail.cuny.edu",
    linkedin: "debasree-sen",
  },
  {
    name: "Yumi Cheng",
    position: "Marketing Chair",
    image: "/team/yumi-cheng.webp",
    email: "ycheng004@citymail.cuny.edu",
    linkedin: "yumicheng",
  },
  {
    name: "Addina Rahaman",
    position: "Sponsoring Chair",
    image: "/team/addina-rahaman.webp",
    email: "arahama003@citymail.cuny.edu",
    linkedin: "addina-rahaman-00049a2a2",
  },
  {
    name: "Timson Tan",
    position: "Community Manager",
    image: "/team/timson-tan.webp",
    email: "ttan001@citymail.cuny.edu",
    linkedin: "timsontan",
  },
  {
    name: "Arnav Deepaware",
    position: "Workshop Manager\nClass Representative 2027",
    image: "/team/arnav-deepaware.webp",
    email: "adeepaw000@citymail.cuny.edu",
    linkedin: "arnavdeepaware",
  },
  {
    name: "Krista Singh",
    position: "Graphics Chair",
    image: "/team/krista-singh.webp",
    email: "ksingh020@citymail.cuny.edu",
    linkedin: "kristausingh",
  },
  {
    name: "Maryam Ilyas",
    position: "Newsletter Chair",
    image: "/team/maryam-ilyas.webp",
    email: "milyas001@citymail.cuny.edu",
    linkedin: "maryamilyas",
  },
  {
    name: "Aditya Jha",
    position: "Outreach Chair",
    image: "/team/aditya-jha.webp",
    email: "ajha001@citymail.cuny.edu",
    linkedin: "aditya-jha777",
  },
  {
    name: "Areeba Ali",
    position: "Class Representative 2028",
    email: "aali064@citymail.cuny.edu",
  },
  {
    name: "Ayesha Ilyas",
    position: "Class Representative 2028",
    email: "ailyas000@citymail.cuny.edu",
    linkedin: "a-ilyas",
  },
  // {
  //   name: "Jawad Chowdhury",
  //   position: "Treasurer",
  //   image: "/team/jawad-chowdhury.webp",
  //   email: "jchowdh002@citymail.cuny.edu",
  //   linkedin: "jawad-chy",
  // },
  // {
  //   name: "Lily Minchala",
  //   position: "Marketing Designer",
  //   // image: "/team/lily-minchala.webp",
  //   email: "lmincha000@citymail.cuny.edu",
  //   linkedin: "lilyminchala",
  // },
  {
    name: "Sehr Abrar",
    position: "Student Advisor",
    image: "/team/sehr-abrar.webp",
    email: "sabrar000@citymail.cuny.edu",
    linkedin: "sehr-abrar",
  },
  // {
  //   name: "Daniel Chen",
  //   position: "Student Advisor",
  //   image: "/team/daniel-chen.webp",
  //   email: "dchen024@citymail.cuny.edu",
  //   linkedin: "daniel-chen297",
  // },
];

const staff: TeamMember[] = [
  {
    name: "Sam Fenster",
    position: "ACM Club Advisor",
    image: "/team/sam-fenster.webp",
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

      <h3 className="mt-4 text-center text-2xl font-bold">Faculty</h3>

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

  // const { resolvedTheme } = useTheme();

  return (
    <Tilt className="flex-1 shrink basis-full md:basis-106 lg:max-w-120">
      <Card
        isBlurred
        className="brick-wall !bg-default/15 border-none p-2"
        shadow="md"
      >
        <CardBody className="grid grid-cols-[fit-content(8rem)_1fr] grid-rows-[fit-content(8rem)_1fr] gap-x-5 overflow-visible">
          <Image
            as={NextImage}
            isZoomed
            width={128 * zoom}
            height={128 * zoom}
            // src={member.image || `/logo-on-${resolvedTheme || "dark"}.webp`}
            src={member.image || "/logo-on-dark.webp"}
            fallbackSrc="/logo-on-dark.webp"
            alt={member.name}
            classNames={{
              wrapper: "row-span-1 sm:row-span-2",
              img: "object-cover object-center size-32! hover:scale-110 transition-transform hover:translate-y-1.5",
            }}
          />

          <div className="flex flex-1 flex-col items-start justify-start gap-1">
            <h3 className="text-foreground-800 text-3xl leading-none font-semibold">
              {member.name}
            </h3>
            <span className="text-foreground-500 text-xl leading-6 whitespace-pre">
              {member.position}
            </span>
          </div>

          <div className="col-span-2 flex items-end justify-end gap-2 sm:col-span-1">
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
                href={`https://linkedin.com/in/${member.linkedin}/`}
                as={Link}
                title="LinkedIn"
                variant="light"
                isExternal
                isIconOnly
              >
                <SimpleIconsLinkedin className="h-5 w-5" />
              </Button>
            )}

            {member.email && (
              <Button
                as={Link}
                href={`mailto:${member.email}`}
                variant="flat"
                className="text-default-foreground"
                isExternal
                startContent={<EnvelopeIcon className="h-5 w-5" />}
              >
                Email
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
    </Tilt>
  );
}
