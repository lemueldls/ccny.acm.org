import {
  getAuthSessionId,
  getAuthUserId,
  signInViaProvider,
} from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import schema, { slideSegment } from "./schema";
import { signIn } from "./auth";

export const getSlideSegments = query({
  args: { workshopId: v.optional(v.id("workshops")) },
  handler: async (ctx, args) => {
    const slideSegments = await ctx.db.query("activeWorkshops").collect();

    return slideSegments.find((s) => s.workshopId === args.workshopId)
      ?.slideSegments;
  },
});

export const setActiveSlideSegments = mutation({
  args: {
    workshopId: v.id("workshops"),
    slideSegments: v.array(slideSegment),
  },
  handler: async (ctx, args) => {
    const activeSlideSegments = await ctx.db
      .query("activeWorkshops")
      .filter((q) => q.eq(q.field("workshopId"), args.workshopId))
      .unique();

    if (activeSlideSegments)
      await ctx.db.patch(activeSlideSegments._id, {
        slideSegments: args.slideSegments,
      });
    else
      await ctx.db.insert("activeWorkshops", {
        workshopId: args.workshopId,
        slideSegments: args.slideSegments,
        userAnswers: {},
      });
  },
});

export const setUserAnswer = mutation({
  args: {
    workshopId: v.id("workshops"),
    answer: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("User not found");

    const activeWorkshop = await ctx.db
      .query("activeWorkshops")
      .filter((q) => q.eq(q.field("workshopId"), args.workshopId))
      .unique();

    if (!activeWorkshop) throw new Error("Workshop not found");

    await ctx.db.patch(activeWorkshop._id, {
      userAnswers: { [userId]: args.answer },
    });

    return args.answer;
  },
});

export const endQuicktime = mutation({
  args: {
    workshopId: v.id("workshops"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("User not found");

    const activeWorkshop = await ctx.db
      .query("activeWorkshops")
      .filter((q) => q.eq(q.field("workshopId"), args.workshopId))
      .unique();

    if (!activeWorkshop) throw new Error("Workshop not found");

    const slideSegments = activeWorkshop?.slideSegments;
    const lastSegment = slideSegments?.[slideSegments.length - 1];

    if (!lastSegment) throw new Error("No active segment found");
    if (lastSegment.kind !== "quicktime") throw new Error("Not a quicktime");

    const userAnswers = activeWorkshop?.userAnswers;
    const userAnswer = userAnswers?.[userId];

    if (!userAnswer) return lastSegment.correctAnswer;

    const correct = userAnswer === lastSegment.correctAnswer;

    if (correct) {
      const user = await ctx.db.get(userId);
      const points = user?.points || 0;

      await ctx.db.patch(userId, { points: points + lastSegment.points });
    }

    return lastSegment.correctAnswer;
  },
});
