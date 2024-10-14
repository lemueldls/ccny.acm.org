"use client";

import { useRouter } from "next/navigation";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { ModalProvider } from "@/components/modal/provider";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
// import { PrimeReactProvider } from "primereact/api";
// import Tailwind from "primereact/passthrough/tailwind";
// import { twMerge } from "tailwind-merge";
import { useTheme } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <SessionProvider>
      <Toaster
        theme={theme as "light" | "dark" | undefined}
        // className="hidden dark:block"
      />
      <ModalProvider>
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
            {children}
            {/* </PrimeReactProvider> */}
          </ThemeProvider>
        </NextUIProvider>
      </ModalProvider>
    </SessionProvider>
  );
}
