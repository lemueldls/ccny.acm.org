"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { ModalProvider } from "@/components/modal/provider";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { PrimeReactProvider } from "primereact/api";
import Tailwind from "primereact/passthrough/tailwind";
import { twMerge } from "tailwind-merge";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Toaster className="dark:hidden" />
      <Toaster theme="dark" className="hidden dark:block" />
      <ModalProvider>
        <NextUIProvider>
          <ThemeProvider attribute="class" defaultTheme="dark">
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
              {children}
            </PrimeReactProvider>
          </ThemeProvider>
        </NextUIProvider>
      </ModalProvider>
    </SessionProvider>
  );
}
