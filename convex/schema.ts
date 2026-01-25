import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";

export const slideSegment = v.union(
  v.object({
    kind: v.literal("markdown"),
    content: v.string(),
  }),
  v.object({
    kind: v.literal("quicktime"),
    question: v.string(),
    answers: v.array(v.string()),
    correctAnswer: v.string(),
    points: v.number(),
    time: v.number(),
  }),
);

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
    githubId: v.optional(v.string()),
    discordId: v.optional(v.string()),
    isAnonymous: v.boolean(),
    isAdmin: v.boolean(),
    points: v.optional(v.number()),
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
    public: v.optional(v.boolean()),
    external: v.optional(v.boolean()),
    location: v.optional(v.string()),
    host: v.optional(v.string()),
    start: v.optional(v.number()),
    end: v.optional(v.number()),
    description: v.optional(v.string()),
    rsvp: v.optional(v.string()),
  }),

  workshops: defineTable({
    slug: v.string(),
    title: v.string(),
    description: v.string(),
    slideSegments: v.array(slideSegment),
  }),

  activeWorkshops: defineTable({
    workshopId: v.id("workshops"),
    slideSegments: v.array(slideSegment),
    userAnswers: v.record(v.id("users"), v.string()),
  }),

  websites: defineTable({
    userId: v.string(),
    html: v.string(),
    css: v.string(),
    javascript: v.string(),
  }),
});
