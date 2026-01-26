"use client";

import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { Button, Card, CardBody, Image, Link } from "@heroui/react";
import NextImage from "next/image";
import Tilt from "react-parallax-tilt";
import { Graph, Person, Product, WithContext } from "schema-dts";

import { SimpleIconsGithub } from "@/components/icons/github";
import { SimpleIconsLinkedin } from "@/components/icons/linkedin";
// Import { useTheme } from "next-themes";

export interface TeamMember {
  name: string;
  position: string;
  image?: string;
  email?: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export const executiveBoard: TeamMember[] = [
  {
    email: "smondal002@citymail.cuny.edu",
    image: "/team/srewashi-mondal.webp",
    linkedin: "srewashi-mondal",
    name: "Srewashi Mondal",
    position: "President",
  },
  {
    email: "ehaque002@citymail.cuny.edu",
    image: "/team/evan-haque.webp",
    linkedin: "evanhaque1",
    name: "Evan Haque",
    position: "Vice President",
  },
  {
    email: "ldeloss002@citymail.cuny.edu",
    github: "lemueldls",
    image: "/team/lemuel-de-los-santos.webp",
    linkedin: "lemueldls",
    name: "Lemuel De Los Santos",
    position: "Secretary",
    website: "https://lemueldls.dev",
  },
  {
    email: "afredri000@citymail.cuny.edu",
    image: "/team/axyl-fredrick.webp",
    linkedin: "axyl-fredrick",
    name: "Axyl Fredrick",
    position: "Treasurer",
  },
];

export const extendedBoard: TeamMember[] = [
  {
    email: "dlucero000@citymail.cuny.edu",
    image: "/team/diana-lucero.webp",
    linkedin: "dlucero0715",
    name: "Diana Lucero",
    position: "Social Media Chair",
  },
  {
    email: "dsen000@citymail.cuny.edu",
    image: "/team/debasree-sen.webp",
    linkedin: "debasree-sen",
    name: "Debasree Sen",
    position: "Social Media Chair",
  },
  {
    email: "ycheng004@citymail.cuny.edu",
    image: "/team/yumi-cheng.webp",
    linkedin: "yumicheng",
    name: "Yumi Cheng",
    position: "Marketing Chair",
  },
  {
    email: "arahama003@citymail.cuny.edu",
    image: "/team/addina-rahaman.webp",
    linkedin: "addina-rahaman-00049a2a2",
    name: "Addina Rahaman",
    position: "Sponsoring Chair",
  },
  {
    email: "ttan001@citymail.cuny.edu",
    image: "/team/timson-tan.webp",
    linkedin: "timsontan",
    name: "Timson Tan",
    position: "Community Manager",
  },
  {
    email: "adeepaw000@citymail.cuny.edu",
    image: "/team/arnav-deepaware.webp",
    linkedin: "arnavdeepaware",
    name: "Arnav Deepaware",
    position: "Workshop Manager\nClass Representative 2027",
  },
  {
    email: "ksingh020@citymail.cuny.edu",
    image: "/team/krista-singh.webp",
    linkedin: "kristausingh",
    name: "Krista Singh",
    position: "Graphics Chair",
  },
  {
    email: "milyas001@citymail.cuny.edu",
    image: "/team/maryam-ilyas.webp",
    linkedin: "maryamilyas",
    name: "Maryam Ilyas",
    position: "Newsletter Chair",
  },
  {
    email: "ajha001@citymail.cuny.edu",
    image: "/team/aditya-jha.webp",
    linkedin: "aditya-jha777",
    name: "Aditya Jha",
    position: "Outreach Chair",
  },
  {
    email: "aali064@citymail.cuny.edu",
    image: "/team/areeba-ali.webp",
    name: "Areeba Ali",
    position: "Class Representative 2028",
  },
  {
    email: "ailyas000@citymail.cuny.edu",
    image: "/team/ayesha-ilyas.webp",
    linkedin: "a-ilyas",
    name: "Ayesha Ilyas",
    position: "Class Representative 2028",
  },
  // {
  //   Name: "Jawad Chowdhury",
  //   Position: "Treasurer",
  //   Image: "/team/jawad-chowdhury.webp",
  //   Email: "jchowdh002@citymail.cuny.edu",
  //   Linkedin: "jawad-chy",
  // },
  // {
  //   Name: "Lily Minchala",
  //   Position: "Marketing Designer",
  //   // image: "/team/lily-minchala.webp",
  //   Email: "lmincha000@citymail.cuny.edu",
  //   Linkedin: "lilyminchala",
  // },
  {
    email: "sabrar000@citymail.cuny.edu",
    image: "/team/sehr-abrar.webp",
    linkedin: "sehr-abrar",
    name: "Sehr Abrar",
    position: "Student Advisor",
  },
  // {
  //   Name: "Daniel Chen",
  //   Position: "Student Advisor",
  //   Image: "/team/daniel-chen.webp",
  //   Email: "dchen024@citymail.cuny.edu",
  //   Linkedin: "daniel-chen297",
  // },
];

export const staff: TeamMember[] = [
  {
    email: "fenster@ccny.cuny.edu",
    image: "/team/sam-fenster.webp",
    linkedin: "samfenster",
    name: "Sam Fenster",
    position: "ACM Club Advisor",
  },
];

export default function HomePageTeam() {
  const allTeamMembers = [...executiveBoard, ...extendedBoard, ...staff];

  const teamJsonLd = allTeamMembers.map(
    (member) =>
      ({
        "@type": "Person",
        email: member.email,
        image: member.image ? `${process.env.NEXT_PUBLIC_ROOT_URL}${member.image}` : undefined,
        jobTitle: member.position,
        name: member.name,
        sameAs: [
          member.linkedin ? `https://www.linkedin.com/in/${member.linkedin}` : undefined,
          member.github ? `https://github.com/${member.github}` : undefined,
          member.website,
        ].filter(Boolean) as string[],
        worksFor: {
          "@type": "Organization",
          name: "ACM @ CCNY",
        },
      }) satisfies Person,
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": teamJsonLd,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
    </>
  );
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  const zoom = 1.1;

  // Const { resolvedTheme } = useTheme();

  return (
    <Tilt className="flex-1 shrink basis-full md:basis-106 lg:max-w-120">
      <Card isBlurred className="brick-wall !bg-default/15 border-none p-2" shadow="md">
        <CardBody className="grid grid-cols-[fit-content(8rem)_1fr] grid-rows-[fit-content(8rem)_1fr] gap-x-5 overflow-visible">
          <Image
            as={NextImage}
            isZoomed
            width={128 * zoom}
            height={128 * zoom}
            src={member.image || "/icon-on-dark.webp"}
            fallbackSrc="/icon-on-dark.webp"
            alt={member.name}
            classNames={{
              img: "object-cover object-center size-32! hover:scale-110 transition-transform hover:translate-y-1.5",
              wrapper: "row-span-1 sm:row-span-2",
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
