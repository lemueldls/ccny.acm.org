import type { ReactNode } from "react";

export interface AdminEventsLayoutProps {
  children: ReactNode;
}

export default async function AdminEventsLayout({ children }: AdminEventsLayoutProps) {
  // const events = await fetch("/api/events").then((res) => res.json());

  // console.log({ events });

  return <>{children}</>;
}
