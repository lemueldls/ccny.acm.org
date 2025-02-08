import { convexAuth, getAuthUserId } from "@convex-dev/auth/server";

import { Anonymous } from "@convex-dev/auth/providers/Anonymous";
import GitHub from "@auth/core/providers/github";
import Discord from "@auth/core/providers/discord";

import { createId } from "@paralleldrive/cuid2";
import { MutationCtx } from "./_generated/server";
import { Doc } from "./_generated/dataModel";

export const { auth, signIn, signOut, store } = convexAuth({
  providers: [
    Anonymous({
      // @ts-expect-error
      profile(params, ctx) {
        return {
          name: "Anonymous",
          email: undefined,
          image: undefined,
          githubId: undefined,
          discordId: undefined,
          isAnonymous: true,
          isAdmin: false,
        };
      },
    }),
    Discord({
      allowDangerousEmailAccountLinking: true,
      profile(discordProfile, tokens) {
        console.log({ discordProfile, tokens });

        if (discordProfile.avatar === null) {
          const defaultAvatarNumber =
            discordProfile.discriminator === "0"
              ? Number(BigInt(discordProfile.id) >> BigInt(22)) % 6
              : parseInt(discordProfile.discriminator) % 5;
          discordProfile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
        } else {
          const format = discordProfile.avatar.startsWith("a_") ? "gif" : "png";
          discordProfile.image_url = `https://cdn.discordapp.com/avatars/${discordProfile.id}/${discordProfile.avatar}.${format}`;
        }

        return {
          id: discordProfile.id,
          name: discordProfile.global_name ?? discordProfile.username,
          slug: discordProfile.username,
          email: discordProfile.email,
          image: discordProfile.image_url,
          githubId: undefined,
          discordId: discordProfile.id,
          isAnonymous: false,
          isAdmin: false,
        };
      },
    }),
    GitHub({
      allowDangerousEmailAccountLinking: true,
      profile(githubProfile, tokens) {
        console.log({ githubProfile, tokens });

        return {
          id: githubProfile.id.toString(),
          name: githubProfile.name ?? githubProfile.login,
          slug: githubProfile.login,
          email: githubProfile.email,
          image: githubProfile.avatar_url,
          githubId: githubProfile.id.toString(),
          discordId: undefined,
          isAnonymous: false,
          isAdmin: false,
        };
      },
    }),
  ],
  // pages: {
  //   signIn: `/login`,
  //   verifyRequest: `/login`,
  //   error: "/login", // Error code passed in query string as ?error=
  // },
  // adapter: DrizzleAdapter(db, {
  //   usersTable: users,
  //   accountsTable: accounts,
  //   sessionsTable: sessions,
  //   verificationTokensTable: verificationTokens,
  // }),
  // session: { strategy: "jwt" },
  // cookies: {
  //   sessionToken: {
  //     name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}authjs.session-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: "lax",
  //       path: "/",
  //       // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
  //       domain: VERCEL_DEPLOYMENT
  //         ? `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`
  //         : undefined,
  //       secure: VERCEL_DEPLOYMENT,
  //     },
  //   },
  // },
  callbacks: {
    // `args.provider` is the currently used provider config
    async createOrUpdateUser(ctx: MutationCtx, args) {
      const profile = args.profile as Doc<"users">;
      if (args.existingUserId) {
        // await ctx.db.patch(args.existingUserId, profile);
        return args.existingUserId;
      }

      // const emailUser = await ctx.db
      //   .query("users")
      //   .filter((q) => q.eq(q.field("email"), profile.email))
      //   .unique();
      // if (emailUser) {
      //   // await ctx.db.patch(emailUser._id, profile);
      //   return emailUser._id;
      // }
      // const discordUser = await ctx.db
      //   .query("users")
      //   .filter((q) => q.eq(q.field("discordId"), profile.discordId))
      //   .unique();
      // if (discordUser) {
      //   // await ctx.db.patch(discordUser._id, profile);
      //   return discordUser._id;
      // }

      const userId = await ctx.db.insert("users", profile as Doc<"users">);

      return userId;
    },
    // async afterUserCreatedOrUpdated(ctx, args) {
    //   console.log("[afterUserCreatedOrUpdated]", { args });
    // },
  },
});
