import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("websites").collect();
  },
});

// export const getById = query({
//   args: { id: v.id("websites") },
//   handler: async (ctx, args) => {
//     return await ctx.db.get(args.id);
//   },
// });

export const getByUserId = query({
  args: { userId: v.optional(v.id("users")) },
  handler: async (ctx, args) => {
    if (!args.userId) return;

    const website = await ctx.db
      .query("websites")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .unique();

    if (website) return website;
  },
});

export const getByUserSlug = query({
  args: { userSlug: v.optional(v.string()) },
  handler: async (ctx, args) => {
    if (!args.userSlug) return;

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("slug"), args.userSlug))
      .unique();

    if (!user) throw new Error("User not found");

    const website = await ctx.db
      .query("websites")
      .filter((q) => q.eq(q.field("userId"), user._id))
      .unique();

    if (website) return website;
  },
});

export const doesUserHaveWebsite = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const website = await ctx.db
      .query("websites")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .unique();

    return !!website;
  },
});

export const createWebsite = mutation({
  args: {
    userId: v.id("users"),
    html: v.optional(v.string()),
    css: v.optional(v.string()),
    javascript: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("websites", {
      userId: args.userId,
      html: args.html || "",
      css: args.css || "",
      javascript: args.javascript || "",
    });

    return await ctx.db.get(id);
  },
});

export const createOrGetWebsite = mutation({
  args: {
    userId: v.id("users"),
    html: v.optional(v.string()),
    css: v.optional(v.string()),
    javascript: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const website = await ctx.db
      .query("websites")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .unique();

    if (website) return website;

    const id = await ctx.db.insert("websites", {
      userId: args.userId,
      html: args.html || "",
      css: args.css || "",
      javascript: args.javascript || "",
    });

    return (await ctx.db.get(id))!;
  },
});

export const update = mutation({
  args: {
    id: v.id("websites"),
    html: v.optional(v.string()),
    css: v.optional(v.string()),
    javascript: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const patch: { [key: string]: string } = {};
    if (args.html !== undefined) patch.html = args.html;
    if (args.css !== undefined) patch.css = args.css;
    if (args.javascript !== undefined) patch.javascript = args.javascript;

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
