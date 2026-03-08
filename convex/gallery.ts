import { v } from "convex/values";

import { internal } from "./_generated/api";
import { Doc } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

export interface GalleryImage extends Doc<"gallery"> {
  url: string;
}

export const get = query({
  args: {},
  handler: async (ctx): Promise<GalleryImage[]> => {
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
  handler: async (ctx): Promise<GalleryImage[]> => {
    await ctx.runQuery(internal.users.requireAdmin);

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
    date: v.optional(v.number()),
    active: v.boolean(),
  },
  handler: async (ctx, args) => {
    await ctx.runQuery(internal.users.requireAdmin);

    return await ctx.db.insert("gallery", args);
  },
});

export const updateImage = mutation({
  args: {
    id: v.id("gallery"),
    image: v.optional(v.id("_storage")),
    caption: v.optional(v.string()),
    date: v.optional(v.number()),
    active: v.optional(v.boolean()),
  },
  handler: async (ctx, { id, ...args }) => {
    await ctx.runQuery(internal.users.requireAdmin);

    await ctx.db.patch(id, args);
  },
});

export const removeImage = mutation({
  args: { id: v.id("gallery") },
  handler: async (ctx, { id }) => {
    await ctx.runQuery(internal.users.requireAdmin);

    await ctx.db.delete(id);
  },
});

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});
