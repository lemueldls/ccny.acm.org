import { NextRequest, NextResponse } from "next/server";
import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  // nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "./convex/_generated/api";
import { convexAuth } from "@convex-dev/auth/server";

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

const publicRootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

export default convexAuthNextjsMiddleware(async (req, { convexAuth }) => {
  const url = req.nextUrl;

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  let hostname = req.headers
    .get("x-forwarded-host")!
    // .get("host")!
    .replace(".localhost:3000", `.${publicRootDomain}`);

  // special case for Vercel preview deployment URLs
  if (
    //   console.log("api route", { req });
    //   return NextResponse.rewrite(new URL("/", req.url));
    // }
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

  // console.log({ hostname, path, api: isApiRoute(req) });
  // if (isApiRoute(req)) {
  //   return NextResponse.rewrite(new URL("/", req.url));
  // }

  // rewrites for app pages
  if (hostname == `app.${publicRootDomain}`) {
    // if (!token && path !== "/login") {
    //   return NextResponse.redirect(new URL("/login", req.url));
    // } else if (token && path == "/login") {
    //   return NextResponse.redirect(new URL("/", req.url));
    // }

    // console.log({
    //   authenticated: convexAuth.isAuthenticated(),
    //   isLoginPage: isLoginPage(req),
    // });

    if (convexAuth.isAuthenticated()) {
      if (isLoginPage(req)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } else {
      if (!isLoginPage(req)) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }

    if (isAdminPage(req)) {
      const user = await fetchQuery(
        api.users.currentUser,
        {},
        { token: convexAuth.getToken() },
      );

      if (!user) return NextResponse.redirect(new URL("/login", req.url));
      if (!user.isAdmin) return new Response("Not authorized", { status: 403 });
    }

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

  // rewrite everything else to `/[domain]/[slug] dynamic route
  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
});
