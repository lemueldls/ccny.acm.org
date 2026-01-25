import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  // NextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { NextResponse } from "next/server";

import { api } from "./convex/_generated/api";

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|gradients|team|vendor|_icons|_vercel|[\\w-]+\\.\\w+).*)",
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

export default convexAuthNextjsMiddleware(async (req, { convexAuth }) => {
  const url = req.nextUrl;

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  const hostname = req.headers
    // .get("x-forwarded-host")!
    .get("Host")!
    .replace(".localhost:3000", `.${rootDomain}`);

  const searchParams = req.nextUrl.searchParams.toString();
  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;

  // If (isApiRoute(req)) {
  //   Return NextResponse.rewrite(new URL("/", req.url));
  // }

  // Rewrites for app pages
  if (hostname === appDomain) {
    // If (!token && path !== "/login") {
    //   Return NextResponse.redirect(new URL("/login", req.url));
    // } else if (token && path == "/login") {
    //   Return NextResponse.redirect(new URL("/", req.url));
    // }

    // Console.log({
    //   Authenticated: convexAuth.isAuthenticated(),
    //   IsLoginPage: isLoginPage(req),
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

      if (!user) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      if (!user.isAdmin) {
        return new Response("Not authorized", { status: 403 });
      }
    }

    return NextResponse.rewrite(new URL(`/app${path === "/" ? "" : path}`, req.url));
  }

  if (hostname === adminDomain) {
    return NextResponse.redirect(new URL("/admin", process.env.NEXT_PUBLIC_APP_URL));
  }

  // Rewrite root application to `/home` folder
  if (hostname === "ccny.acm.org" || hostname === "localhost:3000" || hostname === rootDomain) {
    return NextResponse.rewrite(new URL(`/home${path === "/" ? "" : path}`, req.url));
  }

  // Rewrite everything else to `/[domain]/[slug] dynamic route
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
});
