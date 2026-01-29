import { fetchQuery } from "convex/nextjs";
import { notFound } from "next/navigation";

import { api } from "@/convex/_generated/api";

import Website from "./website";

interface SitePageProps {
  params: Promise<{ domain: string }>;
}

export default async function SitePage({ params }: SitePageProps) {
  let { domain } = await params;
  domain = decodeURIComponent(domain);
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

  return <Website html={website.html} css={website.css} javascript={website.javascript} />;
}
