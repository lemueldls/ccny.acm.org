import "@/styles/globals.css";
import { cal, inter } from "@/styles/fonts";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import { Metadata, Viewport } from "next";
import { cn } from "@/lib/utils";

import { Lato } from "next/font/google";

const title = "Beavers Code (ACM @ CCNY)";
const description = "Beavers Code";
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
  icons: ["/favicon.ico"],
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
  // metadataBase: new URL("https://beaverscode.vercel.app/"),
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
            className={`bg-background text-foreground ccny ${lato.className}`}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none fixed -bottom-[40%] -left-[20%] hidden select-none dark:opacity-70 dark:md:block"
            >
              <img
                src="https://nextui.org/gradients/docs-left.png"
                className="relative z-10 rounded-large opacity-0 shadow-none shadow-black/5 !duration-300 transition-transform-opacity data-[loaded=true]:opacity-100 motion-reduce:transition-none"
                alt="docs left background"
                data-loaded="true"
              />
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none fixed -right-[60%] -top-[80%] hidden rotate-12 select-none dark:opacity-70 dark:md:block 2xl:-right-[45%] 2xl:-top-[60%]"
            >
              <img
                src="https://nextui.org/gradients/docs-right.png"
                className="relative z-10 rounded-large opacity-0 shadow-none shadow-black/5 !duration-300 transition-transform-opacity data-[loaded=true]:opacity-100 motion-reduce:transition-none"
                alt="docs right background"
                data-loaded="true"
              />
            </div>

            {children}
          </main>
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
