import { headers } from "next/headers";
// import { getPostsForSite } from "@/lib/fetchers";

export default async function Sitemap() {
  const headersList = await headers();
  const domain = headersList
    .get("Host")
    ?.replace(".localhost:3000", `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  // const posts = await getPostsForSite(domain);

  return [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
    },
    // ...posts.map(({ slug }) => ({
    //   url: `https://${domain}/${slug}`,
    //   lastModified: new Date(),
    // })),
  ];
}
