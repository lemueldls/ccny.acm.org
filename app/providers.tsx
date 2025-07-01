"use client";

import { useRouter } from "next/navigation";

// import { SessionProvider } from "next-auth/react";
// import { ModalProvider } from "@/components/modal/provider";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider } from "next-themes";
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
            unstyled: true,
            pt: Tailwind,
            ptOptions: {
              mergeSections: true,
              mergeProps: true,
              classNameMergeFunction: twMerge,
            },
          }}
        >
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </PrimeReactProvider>
      </ThemeProvider>
    </HeroUIProvider>
  );
}
