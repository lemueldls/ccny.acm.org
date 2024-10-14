// "use client";

import { Metadata } from "next";
import { ReactNode, Suspense } from "react";
import { Image } from "@nextui-org/react";

export const metadata: Metadata = {
  title: "Login | Beavers Code (ACM @ CCNY)",
};

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: RootLayoutProps) {
  return (
    <>
      <div className="relative z-10 flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8">
        <Suspense fallback={null}>{children}</Suspense>
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
