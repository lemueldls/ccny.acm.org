import { CalendarDaysIcon, UsersIcon, PhotoIcon } from "@heroicons/react/20/solid";
import { Button, Link, Navbar, NavbarContent, NavbarItem } from "@heroui/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | ACM @ CCNY",
};

export interface RootLayoutProps {
  children: React.ReactNode;
}

const sidebarItems = [
  {
    href: "/admin/events",
    startContent: <CalendarDaysIcon className="size-5" />,
    title: "Events",
  },
  {
    href: "/admin/users",
    startContent: <UsersIcon className="size-5" />,
    title: "Users",
  },
  {
    href: "/admin/gallery",
    startContent: <PhotoIcon className="size-5" />,
    title: "Gallery",
  },
];

export default function AuthLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden sm:flex-row">
      <nav className="texture no-scrollbar border-default-100 flex w-full shrink-0 flex-row justify-center gap-2 overflow-x-auto p-2 sm:max-w-sm sm:flex-col sm:justify-start sm:border-r sm:p-8">
        {sidebarItems.map((item, i) => (
          <Button
            key={i}
            size="lg"
            as={Link}
            href={item.href}
            className="shrink-0 justify-start sm:w-full"
            variant="light"
            startContent={item.startContent}
          >
            {item.title}
          </Button>
        ))}
      </nav>

      <div className="flex-1 overflow-auto p-4 sm:p-8">{children}</div>
    </div>
  );
}
