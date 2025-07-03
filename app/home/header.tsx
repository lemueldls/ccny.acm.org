"use client";

import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";

import ThemedLogo from "@/components/themed-logo";
import ThemeToggle from "@/components/theme-toggle";

export default function HomePageHeader() {
  return (
    <Navbar className="texture">
      <NavbarContent justify="start">
        <NavbarItem>
          <NavbarBrand>
            <Link href="/">
              <ThemedLogo />
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
