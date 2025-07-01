import "@/styles/globals.css";

import type { Metadata } from "next";

import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Providers } from "./providers";

import { Image } from "@heroui/react";
// import NextImage from "next/image";

import { lato } from "@/styles/fonts";

const title = "ACM @ CCNY";
const description =
  "We are a student-led computer science club and ACM Chapter at the City College of New York. The club aims to foster a community of tech enthusiasts who collaborate in developing the skills they need in the industry, expanding their network, participating in activities related to new technologies, and learning how to further their professional careers.";
const image = "/og-image.png";

export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        href: "/favicon.ico",
      },
      {
        media: "(prefers-color-scheme: light)",
        url: "/icon-on-light.png",
        href: "/icon-on-light.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/icon-on-dark.png",
        href: "/icon-on-dark.png",
      },
    ],
  },
  openGraph: {
    title,
    description,
    images: [image],
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title,
  //   description,
  //   images: [image],
  //   creator: "@vercel",
  // },
  metadataBase: new URL(process.env.NEXT_PUBLIC_ROOT_URL!),
};

// export const viewport: Viewport = {
//   width: "device-width",
//   // height: "device-height",
//   initialScale: 1,
//   // maximumScale: 1,
//   // minimumScale: 1,
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en" suppressHydrationWarning>
        <Analytics />
        <SpeedInsights />

        <body>
          <Providers>
            <main
              className={`min-h-screen bg-background text-foreground ${lato.className}`}
            >
              {children}
            </main>

            <div
              aria-hidden="true"
              className="fixed -bottom-[40%] -left-[20%] z-0 hidden dark:opacity-70 dark:md:block"
            >
              <Image
                // as={NextImage}
                width={1266}
                height={1211}
                alt="left background"
                src="/gradients/docs-left.png"
              />
            </div>
            <div
              aria-hidden="true"
              className="fixed -right-[60%] -top-[80%] z-0 hidden rotate-12 dark:opacity-70 dark:md:block 2xl:-right-[45%] 2xl:-top-[60%]"
            >
              <Image
                // as={NextImage}
                width={1833}
                height={1822}
                alt="right background"
                src="/gradients/docs-right.png"
              />
            </div>
          </Providers>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
