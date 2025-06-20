"use client";

import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Image,
} from "@heroui/react";

import { SimpleIconsDiscord } from "@/components/icons/discord";
import { SimpleIconsInstagram } from "@/components/icons/instagram";
import { SimpleIconsLinkedin } from "@/components/icons/linkedin";
import {
  EnvelopeIcon as EnvelopeIcon20,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/20/solid";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

const ThemedLogo = dynamic(() => import('@/components/themed-logo'), { ssr: false })

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
      <NavbarContent className="hidden gap-8 md:flex" justify="center">
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
            <Link color="foreground" href="#news">
              News
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
          <Button
            as={Link}
            title="Discord"
            className="hover:text-[#5865F2]"
            color="default"
            href="https://discord.com/invite/CsntEuGJe5"
            isExternal
            variant="light"
            isIconOnly
          >
            <SimpleIconsDiscord className="h-5 w-5" />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            title="Instagram"
            className="hover:text-[#E4405F]"
            color="default"
            href="https://www.instagram.com/acm.ccny/"
            isExternal
            variant="light"
            isIconOnly
          >
            <SimpleIconsInstagram className="h-5 w-5" />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            title="LinkedIn"
            className="hover:text-[#0A66C2]"
            color="default"
            href="https://www.linkedin.com/in/ccnyacm/"
            isExternal
            variant="light"
            isIconOnly
          >
            <SimpleIconsLinkedin className="h-5 w-5" />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            title="Email"
            className="hover:text-[#7D55C7]"
            color="default"
            href="mailto:ccnyacm@gmail.com"
            isExternal
            variant="light"
            isIconOnly
          >
            <EnvelopeIcon20 className="h-5 w-5" />
          </Button>
        </NavbarItem>

        {/* <NavbarItem className="hidden lg:flex">
            <Button
              onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
              color="default"
              variant="light"
              isIconOnly
            >
              {theme === "dark" ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </Button>
          </NavbarItem> */}

        {/* <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem> */}
      </NavbarContent>
    </Navbar>
  )
}