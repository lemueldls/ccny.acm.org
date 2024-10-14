import Nav from "@/components/nav";

import { Metadata } from "next";
import { Image } from "@nextui-org/react";

export const metadata: Metadata = {
  title: "Workshop | Beavers Code (ACM @ CCNY)",
};

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: RootLayoutProps) {
  return (
    <>
      <div className="relative z-10 h-screen">
        <Nav>{children}</Nav>
      </div>

      <div
        aria-hidden="true"
        className="fixed -bottom-[40%] -left-[20%] z-0 hidden dark:opacity-70 dark:md:block"
      >
        <Image
          removeWrapper
          alt="docs left background"
          src="/gradients/docs-left.png"
        />
      </div>
      <div
        aria-hidden="true"
        className="fixed -right-[60%] -top-[80%] z-0 hidden rotate-12 dark:opacity-70 dark:md:block 2xl:-right-[45%] 2xl:-top-[60%]"
      >
        <Image
          removeWrapper
          alt="docs right background"
          src="/gradients/docs-right.png"
        />
      </div>
    </>
  );
}
