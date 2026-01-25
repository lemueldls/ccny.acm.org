import Discord from "@auth/core/providers/discord";
import GitHub from "@auth/core/providers/github";
import { Anonymous } from "@convex-dev/auth/providers/Anonymous";
import { convexAuth, getAuthUserId } from "@convex-dev/auth/server";
import { createId } from "@paralleldrive/cuid2";

import { Doc } from "./_generated/dataModel";
import { MutationCtx } from "./_generated/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Anonymous({
      // @ts-expect-error
      profile(params, ctx) {
        return {
          discordId: undefined,
          email: undefined,
          githubId: undefined,
          image: undefined,
          isAdmin: false,
          isAnonymous: true,
          name: "Anonymous",
        };
      },
    }),
    Discord({
      allowDangerousEmailAccountLinking: true,
      profile(discordProfile, tokens) {
        // Console.log({ discordProfile, tokens });

        if (discordProfile.avatar === null) {
          const defaultAvatarNumber =
            discordProfile.discriminator === "0"
              ? Number(BigInt(discordProfile.id) >> BigInt(22)) % 6
              : parseInt(discordProfile.discriminator) % 5;
          discordProfile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.webp`;
        } else {
          const format = discordProfile.avatar.startsWith("a_") ? "gif" : "webp";
          discordProfile.image_url = `https://cdn.discordapp.com/avatars/${discordProfile.id}/${discordProfile.avatar}.${format}`;
        }

        return {
          discordId: discordProfile.id,
          email: discordProfile.email,
          githubId: undefined,
          id: discordProfile.id,
          image: discordProfile.image_url,
          isAdmin: false,
          isAnonymous: false,
          name: discordProfile.global_name ?? discordProfile.username,
          slug: discordProfile.username,
        };
      },
    }),
    GitHub({
      allowDangerousEmailAccountLinking: true,
      profile(githubProfile, tokens) {
        console.log({ githubProfile, tokens });

        return {
          discordId: undefined,
          email: githubProfile.email,
          githubId: githubProfile.id.toString(),
          id: githubProfile.id.toString(),
          image: githubProfile.avatar_url,
          isAdmin: false,
          isAnonymous: false,
          name: githubProfile.name ?? githubProfile.login,
          slug: githubProfile.login,
        };
      },
    }),
  ],
  // Pages: {
  //   SignIn: `/login`,
  //   VerifyRequest: `/login`,
  //   Error: "/login", // Error code passed in query string as ?error=
  // },
  // Adapter: DrizzleAdapter(db, {
  //   UsersTable: users,
  //   AccountsTable: accounts,
  //   SessionsTable: sessions,
  //   VerificationTokensTable: verificationTokens,
  // }),
  // Session: { strategy: "jwt" },
  callbacks: {
    // `args.provider` is the currently used provider config
    async createOrUpdateUser(ctx: MutationCtx, args) {
      const profile = args.profile as Doc<"users">;
      if (args.existingUserId) {
        // Await ctx.db.patch(args.existingUserId, profile);
        return args.existingUserId;
      }

      // Const emailUser = await ctx.db
      //   .query("users")
      //   .filter((q) => q.eq(q.field("email"), profile.email))
      //   .unique();
      // If (emailUser) {
      //   // await ctx.db.patch(emailUser._id, profile);
      //   Return emailUser._id;
      // }
      // Const discordUser = await ctx.db
      //   .query("users")
      //   .filter((q) => q.eq(q.field("discordId"), profile.discordId))
      //   .unique();
      // If (discordUser) {
      //   // await ctx.db.patch(discordUser._id, profile);
      //   Return discordUser._id;
      // }

      const userId = await ctx.db.insert("users", profile);

      return userId;
    },
    // Async afterUserCreatedOrUpdated(ctx, args) {
    //   Console.log("[afterUserCreatedOrUpdated]", { args });
    // },
  },
});
