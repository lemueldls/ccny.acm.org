import { NextResponse } from "next/server";
import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  // nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "./convex/_generated/api";

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|gradients|team|vendor|_icons|_vercel|[\\w-]+\\.\\w+).*)",
    // "/((?!.*\\..*|_next).*)",
    // "/",
    // "/(api|trpc)(.*)",
    "/api/auth(.*)",
  ],
};

const isLoginPage = createRouteMatcher(["/login"]);
const isAdminPage = createRouteMatcher(["/admin"]);

const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

const appUrl = process.env.NEXT_PUBLIC_APP_URL;
const appDomain = appUrl ? new URL(appUrl).host : `code.${rootDomain}`;

const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL;
const adminDomain = adminUrl ? new URL(adminUrl).host : `admin.${rootDomain}`;

const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;

export default convexAuthNextjsMiddleware(async (req, { convexAuth }) => {
  const url = req.nextUrl;

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  let hostname = req.headers
    .get("x-forwarded-host")!
    // .get("host")!
    .replace(".localhost:3000", `.${rootDomain}`);

  // special case for Vercel preview deployment URLs
  if (
    //   console.log("api route", { req });
    //   return NextResponse.rewrite(new URL("/", req.url));
    // }
    hostname.includes("---") &&
    hostname.endsWith(`.${process.env.NEXT_PUBLIC_VERCEL_DEPLOYMENT_SUFFIX}`)
  ) {
    hostname = `${hostname.split("---")[0]}.${rootDomain}`;
  }

  const searchParams = req.nextUrl.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  // if (isApiRoute(req)) {
  //   return NextResponse.rewrite(new URL("/", req.url));
  // }

  // rewrites for app pages
  if (hostname == appDomain) {
    // if (!token && path !== "/login") {
    //   return NextResponse.redirect(new URL("/login", req.url));
    // } else if (token && path == "/login") {
    //   return NextResponse.redirect(new URL("/", req.url));
    // }

    // console.log({
    //   authenticated: convexAuth.isAuthenticated(),
    //   isLoginPage: isLoginPage(req),
    // });

    if (await convexAuth.isAuthenticated()) {
      if (isLoginPage(req)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } else {
      if (!isLoginPage(req)) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    if (isAdminPage(req)) {
      const token = await convexAuth.getToken();
      const user = await fetchQuery(api.users.currentUser, {}, { token });

      if (!user) return NextResponse.redirect(new URL("/login", req.url));
      if (!user.isAdmin) return new Response("Not authorized", { status: 403 });
    }

    return NextResponse.rewrite(
      new URL(`/app${path === "/" ? "" : path}`, req.url),
    );
  }

  if (hostname == adminDomain) {
    return NextResponse.redirect(
      new URL("/admin", process.env.NEXT_PUBLIC_APP_URL),
    );
  }

  // rewrite root application to `/home` folder
  if (
    hostname === "ccny.acm.org" ||
    hostname === "localhost:3000" ||
    hostname === rootDomain ||
    hostname === vercelUrl
  ) {
    return NextResponse.rewrite(
      new URL(`/home${path === "/" ? "" : path}`, req.url),
    );
  }

  // rewrite everything else to `/[domain]/[slug] dynamic route
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
});
