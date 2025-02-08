import Nav from "@/components/nav";

import { Metadata } from "next";
import { Image } from "@heroui/react";

export const metadata: Metadata = {
  title: "Admin | Beavers Code (ACM @ CCNY)",
};

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: RootLayoutProps) {
  return <div className="w-full p-4">{children}</div>;
}
