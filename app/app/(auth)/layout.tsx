// "use client";

import { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import { Image } from "@heroui/react";
import NextImage from "next/image";

export const metadata: Metadata = {
  title: "Login | Beavers Code (ACM @ CCNY)",
};

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: RootLayoutProps) {
  return (
    <div className="relative z-10 flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
}
