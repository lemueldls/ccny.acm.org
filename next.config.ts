import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    serverActions: {
      allowedOrigins: [
        process.env.NEXT_PUBLIC_APP_URL!,
        process.env.NEXT_PUBLIC_ADMIN_URL!,
      ],
    },
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { hostname: "res.cloudinary.com" },
      { hostname: "abs.twimg.com" },
      { hostname: "pbs.twimg.com" },
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "www.google.com" },
      { hostname: "illustrations.popsy.co" },
      { hostname: "cdn.discordapp.com" },
      { hostname: "github.com" },
    ],
  },
};

export default nextConfig;
