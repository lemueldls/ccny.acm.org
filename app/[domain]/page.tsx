import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import { fontMapper } from "@/styles/fonts";
import { Metadata } from "next";
import { usePreloadedQuery, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import Website from "./website";

export default async function SitePage({
  params,
  // children,
}: {
  params: { domain: string };
  // children: ReactNode;
}) {
  const domain = decodeURIComponent(params.domain);
  // const data = await getSiteData(domain);

  const subdomain = domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`)
    ? domain.replace(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`, "")
    : undefined;

  const website = await fetchQuery(api.websites.getByUserSlug, {
    userSlug: subdomain,
  });

  if (!website) {
    notFound();
  }

  return (
    <Website
      html={website.html}
      css={website.css}
      javascript={website.javascript}
    />
  );
}
