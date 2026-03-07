import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const images = await ctx.db
      .query("gallery")
      .withIndex("by_active_date", (q) => q.eq("active", true))
      .order("desc")
      .collect();

    return Promise.all(
      images.map(async (img) => ({
        ...img,
        url: (await ctx.storage.getUrl(img.image)) ?? "",
      })),
    );
  },
});

export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const images = await ctx.db.query("gallery").withIndex("by_date").order("desc").collect();
    return Promise.all(
      images.map(async (img) => ({
        ...img,
        url: (await ctx.storage.getUrl(img.image)) ?? "",
      })),
    );
  },
});

export const addImage = mutation({
  args: {
    image: v.id("_storage"),
    caption: v.optional(v.string()),
    date: v.optional(v.string()),
    active: v.boolean(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("gallery", args);
  },
});

export const updateImage = mutation({
  args: {
    id: v.id("gallery"),
    image: v.optional(v.id("_storage")),
    caption: v.optional(v.string()),
    date: v.optional(v.string()),
    active: v.optional(v.boolean()),
  },
  handler: async (ctx, { id, ...args }) => {
    await ctx.db.patch(id, args);
  },
});

export const fixCaptions = mutation({
  args: {},
  handler: async (ctx) => {
    const images = await ctx.db.query("gallery").collect();
    let count = 0;
    for (const img of images) {
      if (!img.caption) continue;
      try {
        // Fix for Instagram export encoding issue (Latin1 bytes in UTF-8 string)
        const fixed = decodeURIComponent(escape(img.caption));
        if (fixed !== img.caption) {
          await ctx.db.patch(img._id, { caption: fixed });
          count++;
        }
      } catch (e) {
        continue;
      }
    }
    return count;
  },
});

export const removeImage = mutation({
  args: { id: v.id("gallery") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
