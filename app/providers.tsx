"use client";

// import { SessionProvider } from "next-auth/react";
// import { ModalProvider } from "@/components/modal/provider";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/navigation";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import { twMerge } from "tailwind-merge";

import { ConvexClientProvider } from "@/components/convex-client-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <HeroUIProvider navigate={router.push}>
      <ThemeProvider attribute="class">
        <PrimeReactProvider
          value={{
            pt: Tailwind,
            ptOptions: {
              mergeSections: true,
              mergeProps: true,
              classNameMergeFunction: twMerge,
            },
            unstyled: true,
          }}
        >
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </PrimeReactProvider>
      </ThemeProvider>
    </HeroUIProvider>
  );
}
