import "@/styles/globals.css";

import type { Metadata } from "next";

import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { Providers } from "./providers";

import { cn, Image } from "@heroui/react";
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
        url: "/logo-on-light.png",
        href: "/logo-on-light.png",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-on-dark.png",
        href: "/logo-on-dark.png",
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
            <main className={lato.className}>{children}</main>
          </Providers>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
