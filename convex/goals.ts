import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return []; // Return an empty array for unauthenticated users
    }
    return await ctx.db
      .query("goals")
      .filter((q) => q.eq(q.field("userId"), identity.subject))
      .collect();
  },
});

export const get = query({
  args: { id: v.id("goals") },
  handler: async (ctx, args) => {
    const goal = await ctx.db.get(args.id);
    const identity = await ctx.auth.getUserIdentity();
    if (!goal || !identity || goal.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }
    return goal;
  },
});

export const create = mutation({
  args: {
    goal: v.string(),
    description: v.string(),
    category: v.string(),
    progress: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated");
    }
    return await ctx.db.insert("goals", {
      ...args,
      userId: identity.subject,
    });
  },
});

export const updateProgress = mutation({
  args: {
    id: v.id("goals"),
    progress: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthenticated");
    }
    const goal = await ctx.db.get(args.id);
    if (!goal || goal.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }
    return await ctx.db.patch(args.id, { progress: args.progress });
  },
});
