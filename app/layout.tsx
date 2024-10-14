import "@/styles/globals.css";
import { cal, inter } from "@/styles/fonts";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import { Metadata, Viewport } from "next";
import { cn } from "@/lib/utils";

import { Image } from "@nextui-org/react";

import { Lato } from "next/font/google";

const title = "Beavers Code (ACM @ CCNY)";
const description =
  "In collaboration with ACM and GDSC, we are proud to present Beavers Code, a student-led computer science club at the City College of New York.";
const image = "/icon.png";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

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
  // metadataBase: new URL(process.env.NEXT_PUBLIC_ROOT_URL),
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
    <html lang="en" suppressHydrationWarning>
      <body className={cn(cal.variable, inter.variable)}>
        <Providers>
          <main
            className={`min-h-screen bg-background text-foreground ${lato.className}`}
          >
            {children}
          </main>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
