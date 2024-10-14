import NextAuth from "next-auth";

import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/lib/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { Adapter, AdapterUser } from "next-auth/adapters";
import { accounts, sessions, users, verificationTokens } from "@/lib/schema";
import * as schema from "@/lib/schema";
import { eq } from "drizzle-orm";

export type {
  Account,
  DefaultSession,
  Profile,
  Session,
  // User,
} from "@auth/core/types";

export type User = typeof users.$inferSelect;

declare module "next-auth" {
  interface Session {
    user: User;
  }
}

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.AUTH_DISCORD_ID as string,
      clientSecret: process.env.AUTH_DISCORD_SECRET as string,
      allowDangerousEmailAccountLinking: true,
      async profile(profile) {
        const user = await db.query.users.findFirst({
          where: (users, { eq }) => eq(users.discordId, profile.id),
        });

        if (user) user;

        return {
          name: profile.global_name,
          email: profile.email,
          image: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.webp`,
          discordId: profile.id,
          isAnonymous: false,
        };
      },
    }),

    // Anonymous Login
    CredentialsProvider({
      id: "anonymous",
      name: "Anonymous",
      credentials: {
        csrfToken: { label: "CSRF Token", type: "text" },
        callbackUrl: { label: "Callback URL", type: "text" },
        json: { label: "JSON", type: "text" },
      },
      async authorize(credentials) {
        const [userResult] = await db
          .insert(users)
          .values({
            name: "Anonymous",
            isAnonymous: true,
          })
          .returning();

        return userResult;
      },
    }),
  ],
  pages: {
    signIn: `/login`,
    verifyRequest: `/login`,
    error: "/login", // Error code passed in query string as ?error=
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}authjs.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
        domain: VERCEL_DEPLOYMENT
          ? `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
          : undefined,
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;

      return token;
    },
    async session({ session, token }) {
      session.user = token.user as AdapterUser & User;

      return session;
    },
  },
});

export async function requireUser() {
  // await db.delete(schema.users).where(eq(schema.users.id, "bukxpkqb"));

  const session = await auth();
  if (!session) throw new Error("Not authenticated");
  if (!session.user) throw new Error("Not authenticated");

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, session.user.id),
  });

  if (!user) throw new Error("Not authenticated");

  return user;
}

export async function requireAdmin() {
  // await db
  //   .update(schema.users)
  //   .set({ isAdmin: true })
  //   .where(eq(schema.users.id, "vx6ez5m33ufhimai637h0kbi"));

  const user = await requireUser();
  if (!user.isAdmin) throw new Error("Not authorized");

  return user;
}

export function withSiteAuth(action: any) {
  return async (
    formData: FormData | null,
    siteId: string,
    key: string | null,
  ) => {
    const session = await auth();
    if (!session) {
      return {
        error: "Not authenticated",
      };
    }

    const site = await db.query.sites.findFirst({
      where: (sites, { eq }) => eq(sites.id, siteId),
    });

    if (!site || site.userId !== session.user.id) {
      return {
        error: "Not authorized",
      };
    }

    return action(formData, site, key);
  };
}

export function withPostAuth(action: any) {
  return async (
    formData: FormData | null,
    postId: string,
    key: string | null,
  ) => {
    const session = await auth();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }

    const post = await db.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, postId),
      with: {
        site: true,
      },
    });

    if (!post || post.userId !== session.user.id) {
      return {
        error: "Post not found",
      };
    }

    return action(formData, post, key);
  };
}
