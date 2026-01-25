import { headers } from "next/headers";
// Import { getPostsForSite } from "@/lib/fetchers";

export default async function Sitemap() {
  const headersList = await headers();
  const domain = headersList
    .get("Host")
    ?.replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  // Const posts = await getPostsForSite(domain);

  return [
    {
      lastModified: new Date(),
      url: `https://${domain}`,
    },
    // ...posts.map(({ slug }) => ({
    //   Url: `https://${domain}/${slug}`,
    //   LastModified: new Date(),
    // })),
  ];
}
