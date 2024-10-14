import { NextRequest, NextResponse } from "next/server";
import { auth, requireAdmin } from "@/auth";

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /_vercel (Vercel internals)
     * 5. /favicon.ico, /sitemap.xml (static files)
     */
    "/((?!api/|_next/|_static/|gradients/|team/|_vercel|[\\w-]+\\.\\w+).*)",
    // "/((?!api/|_next/|_static/|gradients|team|vendor|_icons|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

const publicRootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

export default async function middleware(req: NextRequest, res: NextResponse) {
  const url = req.nextUrl;

  if (req.url.includes(".jpg")) console.log({ url });

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  let hostname = req.headers
    .get("x-forwarded-host")!
    // .get("host")!
    .replace(".localhost:3000", `.${publicRootDomain}`);

  // special case for Vercel preview deployment URLs
  if (
    hostname.includes("---") &&
    hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  ) {
    hostname = `${hostname.split("---")[0]}.${publicRootDomain}`;
  }

  const searchParams = req.nextUrl.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  // rewrites for app pages
  if (hostname == `app.${publicRootDomain}`) {
    const session = await auth();

    if (!session && path !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url));
    } else if (session && path == "/login") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (path.startsWith("/admin")) await requireAdmin();

    return NextResponse.rewrite(
      new URL(`/app${path === "/" ? "" : path}`, req.url),
    );
  }

  if (hostname == `admin.${publicRootDomain}`) {
    return NextResponse.redirect(
      new URL("/admin", process.env.NEXT_PUBLIC_APP_URL),
    );
  }

  // rewrite root application to `/home` folder
  if (
    hostname === "localhost:3000" ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN
  ) {
    return NextResponse.rewrite(
      new URL(`/home${path === "/" ? "" : path}`, req.url),
    );
  }
}
