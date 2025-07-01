import type { Metadata } from "next";

import { Image } from "@heroui/react";
import NextImage from "next/image";

import Nav from "@/components/nav";

export const metadata: Metadata = {
  title: "Workshop | ACM @ CCNY",
};

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: RootLayoutProps) {
  return (
    <div className="relative z-10 h-screen">
      <Nav>{children}</Nav>
    </div>
  );
}
