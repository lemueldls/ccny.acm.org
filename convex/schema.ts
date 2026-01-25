import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const slideSegment = v.union(
  v.object({
    content: v.string(),
    kind: v.literal("markdown"),
  }),
  v.object({
    answers: v.array(v.string()),
    correctAnswer: v.string(),
    kind: v.literal("quicktime"),
    points: v.number(),
    question: v.string(),
    time: v.number(),
  }),
);

export default defineSchema({
  ...authTables,

  users: defineTable({
    discordId: v.optional(v.string()),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    githubId: v.optional(v.string()),
    image: v.optional(v.string()),
    isAdmin: v.boolean(),
    isAnonymous: v.boolean(),
    name: v.string(),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    points: v.optional(v.number()),
    slug: v.optional(v.string()),
  })
    .index("slug", ["slug"])
    .index("email", ["email"])
    .index("phone", ["phone"]),

  events: defineTable({
    description: v.optional(v.string()),
    end: v.optional(v.number()),
    external: v.optional(v.boolean()),
    host: v.optional(v.string()),
    kind: v.optional(
      v.union(
        v.literal("workshop"),
        v.literal("hackathon"),
        v.literal("meeting"),
        v.literal("informationSession"),
      ),
    ),
    location: v.optional(v.string()),
    public: v.optional(v.boolean()),
    rsvp: v.optional(v.string()),
    start: v.optional(v.number()),
    title: v.string(),
  }),

  workshops: defineTable({
    description: v.string(),
    slideSegments: v.array(slideSegment),
    slug: v.string(),
    title: v.string(),
  }),

  activeWorkshops: defineTable({
    slideSegments: v.array(slideSegment),
    userAnswers: v.record(v.id("users"), v.string()),
    workshopId: v.id("workshops"),
  }),

  websites: defineTable({
    css: v.string(),
    html: v.string(),
    javascript: v.string(),
    userId: v.string(),
  }),
});
