import "@/styles/globals.css";

import { lato } from "@/styles/fonts";

import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { Providers } from "./providers";

import type { Metadata } from "next";

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
};

export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: [
      {
        url: "/logo.svg",
        href: "/logo.svg",
      },
      // {
      //   media: "(prefers-color-scheme: light)",
      //   url: "/logo-on-light.png",
      //   href: "/logo-on-light.png",
      // },
      // {
      //   media: "(prefers-color-scheme: dark)",
      //   url: "/logo-on-dark.png",
      //   href: "/logo-on-dark.png",
      // },
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
