import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  // nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { NextResponse } from "next/server";

import { api } from "./convex/_generated/api";

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|gradients|members|vendor|_icons|_vercel|[\\w-]+\\.\\w+).*)",
    "/api/auth(.*)",
  ],
};

const isLoginPage = createRouteMatcher(["/login"]);
const isAdminPage = createRouteMatcher(["/admin"]);
const isHashPath = createRouteMatcher(["/about", "/team", "/events"]);

const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

const appUrl = process.env.NEXT_PUBLIC_APP_URL;
const appHost = appUrl ? new URL(appUrl).host : `code.${rootDomain}`;

const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL;
const adminHost = adminUrl ? new URL(adminUrl).host : `admin.${rootDomain}`;

export default convexAuthNextjsMiddleware(async (req, { convexAuth }) => {
  const url = req.nextUrl;
  const host = url.host;
  const searchParams = url.searchParams.toString();
  // get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ""}`;

  // if (isApiRoute(req)) {
  //   Return NextResponse.rewrite(new URL("/", req.url));
  // }

  // rewrites for app pages
  if (host === appHost) {
    // if (!token && path !== "/login") {
    //   Return NextResponse.redirect(new URL("/login", req.url));
    // } else if (token && path == "/login") {
    //   Return NextResponse.redirect(new URL("/", req.url));
    // }

    // console.log({
    //   Authenticated: convexAuth.isAuthenticated(),
    //   IsLoginPage: isLoginPage(req),
    // });

    if (await convexAuth.isAuthenticated()) {
      if (isLoginPage(req)) {
        const redirectTo = url.searchParams.get("redirectTo") || "/";
        return NextResponse.redirect(new URL(redirectTo, req.url));
      }
    } else {
      if (!isLoginPage(req)) {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("redirectTo", path);
        return NextResponse.redirect(loginUrl);
      }
    }

    if (isAdminPage(req)) {
      const token = await convexAuth.getToken();
      const user = await fetchQuery(api.users.currentUser, {}, { token });

      if (!user) {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("redirectTo", path);
        return NextResponse.redirect(loginUrl);
      }
      if (!user.isAdmin) {
        return new Response("Not authorized", { status: 403 });
      }
    }

    return NextResponse.rewrite(new URL(`/app${path === "/" ? "" : path}`, req.url));
  }

  if (host === adminHost) {
    return NextResponse.redirect(
      new URL(`/admin${path === "/" ? "" : path}`, process.env.NEXT_PUBLIC_APP_URL),
    );
  }

  if (host === "ccny.acm.org" || host === "localhost:3000" || host === rootDomain) {
    if (isHashPath(req)) {
      return NextResponse.redirect(new URL(`/#${path.slice(1)}`, req.url));
    }

    return NextResponse.rewrite(new URL(`/home${path === "/" ? "" : path}`, req.url));
  }

  // rewrite everything else to `/[domain]/[slug] dynamic route
  return NextResponse.rewrite(new URL(`/${host}${path}`, req.url));
});
