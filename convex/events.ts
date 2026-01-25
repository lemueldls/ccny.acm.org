import { v } from "convex/values";

import { internal } from "./_generated/api";
import { query, mutation } from "./_generated/server";

import schema from "./schema";

export const getAllEvents = query({
  args: {},
  handler: async (ctx) => {
    const isAdmin = await ctx.runQuery(internal.users.isAdmin);

    const events = await ctx.db.query("events").collect();
    events.sort((a, b) => (b.start || 0) - (a.start || 0));

    if (isAdmin) return events;
    return events.filter((event) => event.public);
  },
});

export const getById = query({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const updateById = mutation({
  args: {
    id: v.id("events"),
    event: schema.tables.events.validator,
  },
  handler: async (ctx, args) => {
    await ctx.runQuery(internal.users.requireAdmin);

    const { id, event } = args;

    const patch: { [key: string]: any } = {};
    if (event.title !== undefined) patch.title = event.title;
    if (event.kind !== undefined) patch.kind = event.kind;
    if (event.public !== undefined) patch.public = event.public;
    if (event.external !== undefined) patch.external = event.external;
    if (event.location !== undefined) patch.location = event.location;
    if (event.host !== undefined) patch.host = event.host;
    if (event.start !== undefined) patch.start = event.start;
    if (event.end !== undefined) patch.end = event.end;
    if (event.description !== undefined) patch.description = event.description;
    if (event.rsvp !== undefined) patch.rsvp = event.rsvp;

    return await ctx.db.patch(id, patch);
  },
});

export const createEvent = mutation({
  args: {
    event: schema.tables.events.validator,
  },
  handler: async (ctx, args) => {
    await ctx.runQuery(internal.users.requireAdmin);

    const id = await ctx.db.insert("events", args.event);

    return id;
  },
});

export const deleteById = mutation({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    await ctx.runQuery(internal.users.requireAdmin);

    const event = await ctx.db.get(args.id);
    if (!event) throw new Error("Event not found");

    await ctx.db.delete(args.id);
  },
});
