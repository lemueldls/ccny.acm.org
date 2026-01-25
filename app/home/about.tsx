import { Card, CardBody, CardHeader, Divider, Image } from "@heroui/react";
import NextImage from "next/image";

export default function HomePageAbout() {
  return (
    <Card
      id="about"
      className="texture bg-default/20 block w-full max-w-300 px-4 py-8 sm:px-16"
      shadow="sm"
    >
      <CardHeader className="flex flex-col items-center justify-center gap-8 py-0 pb-3 lg:flex-row">
        <Image
          as={NextImage}
          width="710"
          height="224"
          className="flex-1 lg:py-8"
          src="/ccny-collab.svg"
          alt="CCNY Collab"
        />

        <Divider orientation="vertical" className="hidden h-64 lg:block" />
        <Divider orientation="horizontal" className="block lg:hidden" />

        <Image as={NextImage} width="200" height="200" src="/acm.svg" alt="ACM" />
      </CardHeader>

      <CardBody>
        <p className="m-auto w-full max-w-5xl text-center text-2xl text-pretty">
          We are a student-led computer science club and ACM Chapter at the City College of New
          York. The club aims to foster a community of tech enthusiasts who collaborate in
          developing the skills they need in the industry, expanding their network, participating in
          activities related to new technologies, and learning how to further their professional
          careers.
        </p>
      </CardBody>
    </Card>
  );
}
