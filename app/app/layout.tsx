import type { Metadata } from "next";

import GradientBackground from "@/components/gradient-background";

export const metadata: Metadata = {
  title: "Workshop | ACM @ CCNY",
};

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: RootLayoutProps) {
  return (
    <>
      {children}

      <GradientBackground />
    </>
  );
}
