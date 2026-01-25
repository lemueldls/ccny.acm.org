import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => await ctx.db.query("websites").collect(),
});

// Export const getById = query({
//   Args: { id: v.id("websites") },
//   Handler: async (ctx, args) => {
//     Return await ctx.db.get(args.id);
//   },
// });

export const getByUserId = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    if (!args.userId) {
      return;
    }

    const website = await ctx.db
      .query("websites")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .unique();

    if (website) {
      return website;
    }
  },
});

export const getByUserSlug = query({
  args: { userSlug: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (!args.userSlug) {
      return;
    }

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("slug"), args.userSlug))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    const website = await ctx.db
      .query("websites")
      .filter((q) => q.eq(q.field("userId"), user._id))
      .unique();

    if (website) {
      return website;
    }
  },
});

export const doesUserHaveWebsite = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const website = await ctx.db
      .query("websites")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .unique();

    return Boolean(website);
  },
});

export const createWebsite = mutation({
  args: {
    css: v.optional(v.string()),
    html: v.optional(v.string()),
    javascript: v.optional(v.string()),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("websites", {
      css: args.css || "",
      html: args.html || "",
      javascript: args.javascript || "",
      userId: args.userId,
    });

    return await ctx.db.get(id);
  },
});

export const createOrGetWebsite = mutation({
  args: {
    css: v.optional(v.string()),
    html: v.optional(v.string()),
    javascript: v.optional(v.string()),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const website = await ctx.db
      .query("websites")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .unique();

    if (website) {
      return website;
    }

    const id = await ctx.db.insert("websites", {
      css: args.css || "",
      html: args.html || "",
      javascript: args.javascript || "",
      userId: args.userId,
    });

    return (await ctx.db.get(id))!;
  },
});

export const update = mutation({
  args: {
    css: v.optional(v.string()),
    html: v.optional(v.string()),
    id: v.id("websites"),
    javascript: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const patch: { [key: string]: string } = {};
    if (args.html !== undefined) {
      patch.html = args.html;
    }
    if (args.css !== undefined) {
      patch.css = args.css;
    }
    if (args.javascript !== undefined) {
      patch.javascript = args.javascript;
    }

    return await ctx.db.patch(args.id, patch);
  },
});

export const deleteAll = mutation({
  args: {},
  handler: async (ctx) => {
    const websites = await ctx.db.query("websites").collect();
    const ids = websites.map((w) => w._id);

    ids.map((id) => ctx.db.delete(id));
  },
});
