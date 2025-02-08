import { ReactNode, Suspense } from "react";
import Nav from "@/components/nav";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <div className="w-full p-4">{children}</div>;
}
