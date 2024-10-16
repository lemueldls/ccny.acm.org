"use client";

import Image from "next/image";
import LoginButton from "./login-button";
import { Suspense } from "react";
import { SimpleIconsDiscord } from "@/components/icons/discord";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { SimpleIconsGithub } from "@/components/icons/github";

export default function LoginPage() {
  return (
    <Card isBlurred className="mx-5 px-8 sm:mx-auto sm:w-full sm:max-w-md">
      <CardHeader className="text-center">
        <h1 className="mt-6 font-cal text-3xl text-foreground">
          Continue with an account
        </h1>
      </CardHeader>
      <CardBody className="gap-4">
        {/* <LoginButton
          // className="hover:text-[#5865F2]"
          provider="github"
          variant="faded"
          startContent={<SimpleIconsGithub className="h-5 w-5" />}
        >
          Login with GitHub
        </LoginButton> */}
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
          <p className="text-center text-foreground-600">
            If you login anonymously, your data will be transferred when you
            decide to create an account.
          </p>
        </CardFooter>
      </CardBody>
    </Card>
  );
}
