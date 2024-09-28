import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { getPostData, getSiteData } from "@/lib/fetchers";
import BlogCard from "@/components/blog-card";
import BlurImage from "@/components/blur-image";
import MDX from "@/components/mdx";
import { placeholderBlurhash, toDateString } from "@/lib/utils";

// export async function generateMetadata({
//   params,
// }: {
//   params: { domain: string; slug: string };
// }) {
//   const domain = decodeURIComponent(params.domain);
//   const slug = decodeURIComponent(params.slug);

//   const [data, siteData] = await Promise.all([
//     getPostData(domain, slug),
//     getSiteData(domain),
//   ]);
//   if (!data || !siteData) {
//     return null;
//   }
//   const { title, description } = data;

//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       creator: "@vercel",
//     },
//     // Optional: Set canonical URL to custom domain if it exists
//     // ...(params.domain.endsWith(`.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`) &&
//     //   siteData.customDomain && {
//     //     alternates: {
//     //       canonical: `https://${siteData.customDomain}/${params.slug}`,
//     //     },
//     //   }),
//   };
// }

export async function generateStaticParams() {
  const allPosts = await prisma.post.findMany({
    select: {
      slug: true,
      site: {
        select: {
          subdomain: true,
          customDomain: true,
        },
      },
    },
    // feel free to remove this filter if you want to generate paths for all posts
    where: {
      site: {
        subdomain: "demo",
      },
    },
  });

  const allPaths = allPosts
    .flatMap(({ site, slug }) => [
      site?.subdomain && {
        domain: `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
        slug,
      },
      site?.customDomain && {
        domain: site.customDomain,
        slug,
      },
    ])
    .filter(Boolean);

  return allPaths;
}

export default async function SitePostPage({
  params,
}: {
  params: { domain: string; slug: string };
}) {
  const domain = decodeURIComponent(params.domain);
  const slug = decodeURIComponent(params.slug);
  const data = await getPostData(domain, slug);

  if (!data) {
    notFound();
  }

  return (
    <>
    what
    </>
  );
}
