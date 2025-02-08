"use client";

import { useRouter } from "next/navigation";

// import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
// import { ModalProvider } from "@/components/modal/provider";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider } from "next-themes";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import { twMerge } from "tailwind-merge";
import { ConvexClientProvider } from "@/components/convex-client-provider";

import { useTheme } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <HeroUIProvider navigate={router.push}>
      <Toaster
        // theme={theme as "light" | "dark" | undefined}
        theme="dark"
        // className="hidden dark:block"
      />

      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        forcedTheme="dark"
        enableSystem={false}
      >
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
