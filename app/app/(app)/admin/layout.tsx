import Nav from "@/components/nav";

import { Metadata } from "next";
import { Button, Image, Link, Navbar, NavbarContent, NavbarItem, Tab, Tabs } from "@heroui/react";
import { CalendarDaysIcon, UsersIcon } from "@heroicons/react/20/solid";

export const metadata: Metadata = {
  title: "Admin | Beavers Code (ACM @ CCNY)",
};

export interface RootLayoutProps {
  children: React.ReactNode;
}

const sidebarItems = [
  { title: "Events", href: "/admin/events", startContent: <CalendarDaysIcon className="size-5" /> },
  { title: "Users", href: "/admin/users", startContent: <UsersIcon className="size-5" /> }
]

export default function AuthLayout({ children }: RootLayoutProps) {
  return (
    <div className="w-full flex">
      <Navbar className="texture hidden sm:flex flex-col justify-start w-full max-w-sm p-8">
        <NavbarContent justify="start" className="flex-col">
          {sidebarItems.map((item, i) => <NavbarItem key={i} className="w-full">
            <Button size="lg" as={Link} href={item.href} className="w-full justify-start" variant="light" startContent={item.startContent}>
              {item.title}
            </Button>
          </NavbarItem>)}
        </NavbarContent>
      </Navbar>

      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
}
