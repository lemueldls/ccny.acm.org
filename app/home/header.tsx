"use client";

import { Image, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";
import NextImage from "next/image";

import ThemeToggle from "@/components/theme-toggle";
import ThemedLogo from "@/components/themed-logo";

export default function HomePageHeader() {
  return (
    <Navbar className="texture">
      <NavbarContent justify="start">
        <NavbarItem>
          <NavbarBrand>
            <Link href="/">
              {/* <ThemedLogo width={44} height={44} /> */}
              <Image
                as={NextImage}
                width={44}
                height={44}
                src={`/logo.svg`}
                alt="Logo"
                suppressHydrationWarning
              />
            </Link>
          </NavbarBrand>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:gap-8" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#about">
            About
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link color="foreground" href="#team">
            Team
          </Link>
        </NavbarItem>

        {/* <NavbarItem>
          <Link color="foreground" href="#sponsors">
            Sponsors
          </Link>
        </NavbarItem> */}

        <NavbarItem>
          <Link color="foreground" href="#events">
            Events
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeToggle />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
