"use client";

import type { ReactNode } from "react";

import { useAuthActions } from "@convex-dev/auth/react";
import {
  ArrowLeftEndOnRectangleIcon,
  ArrowLeftStartOnRectangleIcon,
  EnvelopeIcon as EnvelopeIcon20,
  MoonIcon,
  SunIcon,
} from "@heroicons/react/20/solid";
import {
  Avatar,
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  User,
} from "@heroui/react";
import { useQuery } from "convex/react";
import { useTheme } from "next-themes";
import NextImage from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { api } from "@/convex/_generated/api";

import { SimpleIconsDiscord } from "./icons/discord";
import { SimpleIconsGithub } from "./icons/github";
import { SimpleIconsInstagram } from "./icons/instagram";
import { SimpleIconsLinkedin } from "./icons/linkedin";
import ThemeToggle from "./theme-toggle";

export default function Nav({ children }: { children: ReactNode }) {
  const { signOut, signIn } = useAuthActions();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const segments = useSelectedLayoutSegments();
  // const { id } = useParams() as { id?: string };

  // const [siteId, setSiteId] = useState<string | null>();
  // const [showSidebar, setShowSidebar] = useState(false);

  const { resolvedTheme } = useTheme();
  const pathname = usePathname();

  const user = useQuery(api.users.currentUser);

  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar className="texture" onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />

          <NavbarBrand className="flex items-center">
            <Link href={process.env.NEXT_PUBLIC_ROOT_URL}>
              <Image
                as={NextImage}
                src={`/icon-on-${resolvedTheme}.webp`}
                width={44}
                height={44}
                alt="Icon"
              />
            </Link>

            {/* <div className="mx-4 h-11 rotate-30 border-l border-foreground-400" /> */}
            <span className="text-medium text-foreground/50 px-2">/</span>

            <Link href="/">
              <h1 className="text-foreground dark:shadow-primary dark:text-shadow font-mono text-2xl font-bold">
                [code]
              </h1>
            </Link>

            <Breadcrumbs
              size="lg"
              separator="/"
              itemClasses={{ separator: "px-2" }}
              maxItems={3}
              itemsBeforeCollapse={3}
              itemsAfterCollapse={0}
              className="hidden sm:block"
              renderEllipsis={({ items, ellipsisIcon, separator }) => (
                <div key="ellipsis" className="flex items-center">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        isIconOnly
                        className="h-6 w-6 min-w-6"
                        size="sm"
                        variant="flat"
                      >
                        {ellipsisIcon}
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Routes">
                      {items.map((item, index) => (
                        <DropdownItem key={index} href={item.href}>
                          {item.children}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                  {separator}
                </div>
              )}
            >
              {pathname.split("/").map((segment, index) => (
                <BreadcrumbItem
                  key={index}
                  href={`/${pathname
                    .split("/")
                    .slice(1, index + 1)
                    .join("/")}`}
                >
                  {segment}
                </BreadcrumbItem>
              ))}
            </Breadcrumbs>
          </NavbarBrand>
        </NavbarContent>
        {/* <NavbarContent className="flex gap-8" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#team">
              Team
            </Link>
          </NavbarItem>

          <NavbarItem>
            <Link color="foreground" href="#events">
              Events
            </Link>
          </NavbarItem>
        </NavbarContent> */}
        <NavbarContent className="hidden sm:flex" justify="end">
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                {/* <User
                  as={Button}
                  isFocusable
                  size="sm"
                  variant="light"
                  avatarProps={
                    user.image
                      ? {
                          isBordered: true,
                          src: user.image,
                        }
                      : undefined
                  }
                  className="h-auto justify-start p-2 transition-transform"
                  description={user.email}
                  name={user.name}
                /> */}
                <Avatar
                  as="button"
                  isBordered
                  size="sm"
                  src={user.image || undefined}
                  className="transition-transform"
                  name={user.name}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                {/* <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{user.email}</p>
                </DropdownItem> */}

                {!user.githubId ? (
                  <DropdownItem
                    key="link-github"
                    startContent={<SimpleIconsGithub className="h-5 w-5" />}
                    onPress={() => signIn("github")}
                  >
                    Link GitHub
                  </DropdownItem>
                ) : null}

                {!user.discordId ? (
                  <DropdownItem
                    key="link-discord"
                    startContent={<SimpleIconsDiscord className="h-5 w-5" />}
                    onPress={() => signIn("discord")}
                  >
                    Link Discord
                  </DropdownItem>
                ) : null}

                <DropdownItem
                  key="logout"
                  color="danger"
                  startContent={
                    <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
                  }
                  onPress={() => signOut()}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>

          <NavbarItem>
            <ThemeToggle />
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <div className="flex h-[calc(100%-4rem)]">
        {/* <div className="diagonal-lines flex h-full w-[20rem] flex-col gap-4 bg-default bg-opacity-20 p-4 backdrop-blur">
          <div className="flex flex-1 flex-col gap-4">lmfao</div>

          <div className="flex flex-col gap-4">
            <Dropdown placement="top-start">
              <DropdownTrigger>
                <User
                  as={Button}
                  isFocusable
                  size="lg"
                  variant="light"
                  avatarProps={
                    user.image
                      ? {
                          isBordered: true,
                          src: user.image,
                        }
                      : undefined
                  }
                  className="h-auto justify-start p-2 transition-transform"
                  description={user.email}
                  name={user.name}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem
                  key="logout"
                  color="danger"
                  startContent={
                    <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
                  }
                  onPress={() => signOut()}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div> */}

        {children}
      </div>
    </>
  );
}
