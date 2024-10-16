"use client";

import { useRouter } from "next/navigation";

// import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { ModalProvider } from "@/components/modal/provider";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
// import { PrimeReactProvider } from "primereact/api";
// import Tailwind from "primereact/passthrough/tailwind";
// import { twMerge } from "tailwind-merge";
import { ConvexClientProvider } from "@/components/convex-client-provider";

import { useTheme } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <ModalProvider>
      <Toaster
        theme={theme as "light" | "dark" | undefined}
        // className="hidden dark:block"
      />

      <NextUIProvider navigate={router.push}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
        >
          {/* <PrimeReactProvider
              value={{
                unstyled: true,
                pt: Tailwind,
                ptOptions: {
                  mergeSections: true,
                  mergeProps: true,
                  classNameMergeFunction: twMerge,
                },
              }}
            > */}
          <ConvexClientProvider>{children}</ConvexClientProvider>
          {/* </PrimeReactProvider> */}
        </ThemeProvider>
      </NextUIProvider>
    </ModalProvider>
  );
}
