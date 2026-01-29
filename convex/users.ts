import { getAuthSessionId, getAuthUserId } from "@convex-dev/auth/server";
import { v } from "convex/values";

import { internal } from "./_generated/api";
import { internalQuery, mutation, query } from "./_generated/server";

export const requireUser = internalQuery({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Unauthorized");
    }

    const user = await ctx.db.get(userId);
    if (!user) {
      throw new Error("Unauthorized");
    }

    return user;
  },
});

export const requireAdmin = internalQuery({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new Error("Unauthorized");
    }

    const user = await ctx.db.get(userId);
    if (!user || !user.isAdmin) {
      throw new Error("Unauthorized");
    }

    return user;
  },
});

export const isAdmin = internalQuery({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return false;
    }

    const user = await ctx.db.get(userId);
    if (!user) {
      return false;
    }

    return user.isAdmin;
  },
});

export const currentSession = query({
  args: {},
  handler: async (ctx) => {
    const sessionId = await getAuthSessionId(ctx);
    if (sessionId === null) {
      return null;
    }
    return await ctx.db.get(sessionId);
  },
});

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }

    return await ctx.db.get(userId);
  },
});

export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    await ctx.runQuery(internal.users.requireAdmin);

    const users = await ctx.db.query("users").collect();
    // users.sort((a, b) => (a.name || a.email || "").localeCompare(b.name || b.email || ""));

    return users;
  },
});

export const getByEmail = query({
  args: { email: v.optional(v.string()) },
  handler: async (ctx, args) => {
    await ctx.runQuery(internal.users.requireAdmin);

    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .unique();
  },
});

export const getByDiscordId = query({
  args: { discordId: v.optional(v.string()) },
  handler: async (ctx, args) => {
    await ctx.runQuery(internal.users.requireAdmin);

    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("discordId"), args.discordId))
      .unique();
  },
});

export const patchUser = mutation({
  args: {
    id: v.id("users"),
    user: v.object({
      discordId: v.optional(v.string()),
      email: v.optional(v.string()),
      emailVerificationTime: v.optional(v.number()),
      image: v.optional(v.string()),
      isAdmin: v.optional(v.boolean()),
      isAnonymous: v.optional(v.boolean()),
      name: v.optional(v.string()),
      phone: v.optional(v.string()),
      phoneVerificationTime: v.optional(v.number()),
    }),
  },
  handler: async (ctx, args) => {
    const { id, user } = args;

    const patch: { [key: string]: any } = {};
    if (user.name !== undefined) {
      patch.name = user.name;
    }
    if (user.email !== undefined) {
      patch.email = user.email;
    }
    if (user.emailVerificationTime !== undefined) {
      patch.emailVerificationTime = user.emailVerificationTime;
    }
    if (user.phone !== undefined) {
      patch.phone = user.phone;
    }
    if (user.phoneVerificationTime !== undefined) {
      patch.phoneVerificationTime = user.phoneVerificationTime;
    }
    if (user.image !== undefined) {
      patch.image = user.image;
    }
    if (user.discordId !== undefined) {
      patch.discordId = user.discordId;
    }
    if (user.isAnonymous !== undefined) {
      patch.isAnonymous = user.isAnonymous;
    }
    if (user.isAdmin !== undefined) {
      patch.isAdmin = user.isAdmin;
    }

    return await ctx.db.patch(id, patch);
  },
});

export const deleteUser = mutation({
  args: { id: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.id);
    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.delete(args.id);
  },
});
