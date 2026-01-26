import "@/styles/globals.css";
import type { Metadata, Viewport } from "next";

import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { Organization, WithContext } from "schema-dts";

import { lato } from "@/styles/fonts";

import { Providers } from "./providers";

const title = "ACM @ CCNY";
const description =
  "We are a student-led computer science club and ACM chapter at the City College of New York. The club aims to foster a community of tech enthusiasts who collaborate in developing the skills they need in the industry, expanding their network, participating in activities related to new technologies, and learning how to further their professional careers.";
const image = "/og-image.png";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  description,
  email: "ccnyacm@gmail.com",
  foundingDate: "2024",
  logo: `${process.env.NEXT_PUBLIC_ROOT_URL}/logo.svg`,
  name: "ACM @ CCNY",
  parentOrganization: {
    "@type": "Organization",
    name: "Association for Computing Machinery",
    url: "https://www.acm.org/",
  },
  sameAs: [
    "https://discord.com/invite/CsntEuGJe5",
    "https://www.instagram.com/acm.ccny/",
    "https://www.linkedin.com/in/ccnyacm/",
  ],
  url: process.env.NEXT_PUBLIC_ROOT_URL,
} satisfies WithContext<Organization>;

export const metadata: Metadata = {
  description,
  icons: {
    icon: [
      { rel: "icon", type: "image/svg+xml", url: "/favicon.svg" },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
      {
        rel: "apple-touch-icon",
        type: "image/png",
        sizes: "180x180",
        url: "/apple-touch-icon.png",
      },
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#000000",
      },
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
    ],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_ROOT_URL!),
  openGraph: {
    title,
    description,
    images: [image],
  },
  other: {
    "script[type='application/ld+json']": JSON.stringify(jsonLd),
  },
  title,
};

export const viewport: Viewport = {
  themeColor: "#7d55c7",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <Providers>
            <main className={lato.className}>{children}</main>
          </Providers>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
