"use client";

import { EnvelopeIcon } from "@heroicons/react/20/solid";
import { GlobeAltIcon } from "@heroicons/react/24/solid";
import { Button, Card, CardBody, Image, Link } from "@heroui/react";
import NextImage from "next/image";
import Tilt from "react-parallax-tilt";
import { Graph, Person, Product, WithContext } from "schema-dts";

import { SimpleIconsGithub } from "@/components/icons/github";
import { SimpleIconsLinkedin } from "@/components/icons/linkedin";
// import { useTheme } from "next-themes";

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
    name: "Krista Singh",
    position: "President",
    email: "krista.singh87@stu-mail.ccny.cuny.edu",
    image: "/members/krista-singh.webp",
    linkedin: "kristausingh",
  },
  {
    name: "Lemuel De Los Santos",
    position: "Vice President",
    email: "lemuel.delossantos22@stu-mail.ccny.cuny.edu",
    image: "/members/lemuel-de-los-santos.webp",
    linkedin: "lemueldls",
    github: "lemueldls",
    website: "https://lemueldls.dev",
  },
  {
    name: "Axyl Fredrick",
    position: "Secretary",
    // email: "afredri000@citymail.cuny.edu",
    email: "axylofredrick@gmail.com",
    image: "/members/axyl-fredrick.webp",
    linkedin: "axyl-fredrick",
    github: "axylf",
  },
  {
    name: "Zhuolin Li",
    position: "Treasurer",
    email: "zhuolin.li75@stu-mail.ccny.cuny.edu",
    image: "/members/zhuolin-li.webp",
    linkedin: "zhuolin-li1",
  },
];

export const extendedBoard: TeamMember[] = [
  {
    name: "Zara Raza",
    position: "Social Media Chair",
    email: "zara.raza77@stu-mail.ccny.cuny.edu",
    image: "/members/zara-raza.webp",
    linkedin: "zara-r-",
  },
  {
    name: "Tanzina Sumona",
    position: "Social Media Chair",
    email: "tanzina.sumona77@stu-mail.ccny.cuny.edu",
    image: "/members/tanzina-sumona.webp",
    linkedin: "tanzina-sumona",
  },
  {
    name: "Kelvin Osei",
    position: "Marketing Chair",
    email: "kelvin.osei34@stu-mail.ccny.cuny.edu",
    image: "/members/kelvin-osei.webp",
    linkedin: "kelvin-osei-084737373",
  },
  {
    name: "Thanjila Thahsin",
    position: "Sponsorship Chair",
    email: "thanjila.thahsin67@stu-mail.ccny.cuny.edu",
    image: "/members/thanjila-thahsin.webp",
    linkedin: "thanjila",
    website: "https://thanjila.com",
  },
  {
    name: "Mohmed Bemat",
    position: "Sponsorship Chair",
    email: "mohmed.bemat17@stu-mail.ccny.cuny.edu",
    image: "/members/mohmed-bemat.webp",
    linkedin: "mohmedbemat",
  },
  {
    name: "Xanath Hernandez",
    position: "Graphic Design Chair",
    email: "xanath.hernandez62@stu-mail.ccny.cuny.edu",
    image: "/members/xanath-hernandez.webp",
    linkedin: "xanath-hernandez-807988318",
  },
  {
    name: "Azeez Siyanbola",
    position: "Newsletter Chair",
    email: "azeez.siyanbola39@stu-mail.ccny.cuny.edu",
    // image: "/members/azeez-siyanbola.webp",
    linkedin: "azeez-siyanbola-062b542a8",
  },
  {
    name: "Tamim Kabir",
    position: "Class Representative 2028",
    // email: "tkabir002@citymail.cuny.edu",
    image: "/members/tamim-kabir.webp",
    linkedin: "tamim-kabir",
  },
  {
    name: "Vic Chen",
    position: "Class Representative 2029",
    email: "vicchen199@gmail.com",
    image: "/members/vic-chen.webp",
    linkedin: "vic-chen-cs",
  },
  {
    name: "Areeba Ali",
    position: "Outreach Chair",
    email: "areeba.ali41@stu-mail.ccny.cuny.edu",
    image: "/members/areeba-ali.webp",
  },
];

export const staff: TeamMember[] = [
  {
    email: "fenster@ccny.cuny.edu",
    image: "/members/sam-fenster.webp",
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
        image: member.image
          ? `${process.env.NEXT_PUBLIC_ROOT_URL}${member.image}`
          : undefined,
        jobTitle: member.position,
        name: member.name,
        sameAs: [
          member.linkedin
            ? `https://www.linkedin.com/in/${member.linkedin}`
            : undefined,
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

  // const { resolvedTheme } = useTheme();

  return (
    <Tilt className="flex-1 shrink basis-full md:basis-106 lg:max-w-120">
      <Card
        isBlurred
        className="brick-wall bg-default/15! border-none p-2"
        shadow="md"
      >
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

          <div className="col-span-2 flex items-end justify-end gap-4 sm:col-span-1">
            <div className="flex items-center justify-end gap-2">
              {member.website && (
                <Button
                  as={Link}
                  href={member.website}
                  title="Website"
                  variant="light"
                  className="text-default-foreground"
                  isExternal
                  isIconOnly
                >
                  <GlobeAltIcon className="h-6 w-6" />
                </Button>
              )}

              {member.github && (
                <Button
                  as={Link}
                  href={`https://github.com/${member.github}`}
                  title="GitHub"
                  variant="light"
                  className="text-default-foreground"
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
                  className="text-default-foreground"
                  isExternal
                  isIconOnly
                >
                  <SimpleIconsLinkedin className="h-5 w-5" />
                </Button>
              )}
            </div>

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
