import { v } from "convex/values";

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
    date: v.optional(v.number()),
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
    date: v.optional(v.number()),
    active: v.optional(v.boolean()),
  },
  handler: async (ctx, { id, ...args }) => {
    await ctx.db.patch(id, args);
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

export const importInstagram = mutation({
  args: {
    posts: v.array(
      v.object({
        storageId: v.id("_storage"),
        caption: v.string(),
        date: v.number(),
      }),
    ),
  },
  handler: async (ctx, args) => {
    let count = 0;
    for (const post of args.posts) {
      let decodedCaption = post.caption;
      try {
        decodedCaption = decodeURIComponent(escape(post.caption));
      } catch (e) {
        // Just use original if it fails
      }

      await ctx.db.insert("gallery", {
        image: post.storageId,
        caption: decodedCaption,
        date: post.date,
        active: true,
      });
      count++;
    }
    return count;
  },
});
