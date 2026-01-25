import type { ReactNode } from "react";

export interface AdminEventsLayoutProps {
  children: ReactNode;
}

export default async function AdminEventsLayout({ children }: AdminEventsLayoutProps) {
  // Const events = await fetch("/api/events").then((res) => res.json());

  // Console.log({ events });

  return <>{children}</>;
}
