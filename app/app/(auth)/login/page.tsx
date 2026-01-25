"use client";

import { Card, CardBody, CardFooter, CardHeader, Divider } from "@heroui/react";
import Image from "next/image";
import { Suspense } from "react";

import { SimpleIconsDiscord } from "@/components/icons/discord";
import { SimpleIconsGithub } from "@/components/icons/github";

import LoginButton from "./login-button";

export default function LoginPage() {
  return (
    <Card
      isBlurred
      className="circuit-board bg-default/20! mx-5 px-8 sm:mx-auto sm:w-full sm:max-w-md"
    >
      <CardHeader>
        <h1 className="text-foreground mt-4 w-full text-center text-2xl font-bold">
          Continue with an account
        </h1>
      </CardHeader>
      <CardBody className="gap-4">
        <LoginButton
          // ClassName="hover:text-[#5865F2]"
          provider="github"
          variant="faded"
          startContent={<SimpleIconsGithub className="h-5 w-5" />}
        >
          Login with GitHub
        </LoginButton>
        <LoginButton
          className="hover:text-[#5865F2]"
          provider="discord"
          variant="faded"
          startContent={<SimpleIconsDiscord className="h-5 w-5" />}
        >
          Login with Discord
        </LoginButton>

        <Divider />

        <LoginButton provider="anonymous" variant="bordered">
          Login Anonymously
        </LoginButton>

        <CardFooter>
          <p className="text-foreground-600 text-center">
            If you login anonymously, your data will not be transferred when you link an account.
          </p>
        </CardFooter>
      </CardBody>
    </Card>
  );
}
