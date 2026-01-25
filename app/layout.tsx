import "@/styles/globals.css";

import { lato } from "@/styles/fonts";

import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { Providers } from "./providers";

import type { Metadata } from "next";
import { Organization, WithContext } from "schema-dts";

const title = "ACM @ CCNY";
const description =
  "We are a student-led computer science club and ACM Chapter at the City College of New York. The club aims to foster a community of tech enthusiasts who collaborate in developing the skills they need in the industry, expanding their network, participating in activities related to new technologies, and learning how to further their professional careers.";
const image = "/og-image.png";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ACM @ CCNY",
  description,
  url: process.env.NEXT_PUBLIC_ROOT_URL,
  logo: `${process.env.NEXT_PUBLIC_ROOT_URL}/logo.svg`,
  sameAs: [
    "https://discord.com/invite/CsntEuGJe5",
    "https://www.instagram.com/acm.ccny/",
    "https://www.linkedin.com/in/ccnyacm/",
  ],
  email: "ccnyacm@gmail.com",
  foundingDate: "2024",
  parentOrganization: {
    "@type": "Organization",
    name: "Association for Computing Machinery",
    url: "https://www.acm.org/",
  },
} satisfies WithContext<Organization>;

export const metadata: Metadata = {
  title,
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
  openGraph: {
    title,
    description,
    images: [image],
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_ROOT_URL!),
  other: {
    "script[type='application/ld+json']": JSON.stringify(jsonLd),
  },
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
        <body>
          <Providers>
            <main className={lato.className}>{children}</main>
          </Providers>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
