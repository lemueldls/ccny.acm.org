import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,
  users: defineTable({
    name: v.string(),
    slug: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    image: v.optional(v.string()),
    discordId: v.optional(v.string()),
    isAnonymous: v.boolean(),
    isAdmin: v.boolean(),
  })
    .index("slug", ["slug"])
    .index("email", ["email"])
    .index("phone", ["phone"]),

  events: defineTable({
    title: v.string(),
    kind: v.optional(
      v.union(
        v.literal("workshop"),
        v.literal("hackathon"),
        v.literal("meeting"),
        v.literal("informationSession"),
      ),
    ),
    location: v.optional(v.string()),
    start: v.optional(v.number()),
    end: v.optional(v.number()),
    description: v.optional(v.string()),
    rsvp: v.optional(v.string()),
  }),

  workshops: defineTable({
    id: v.string(),
    title: v.string(),
    description: v.string(),
  }),

  websites: defineTable({
    userId: v.string(),
    html: v.string(),
    css: v.string(),
    javascript: v.string(),
  }),
});
