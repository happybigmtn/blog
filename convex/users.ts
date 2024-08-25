import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const store = mutation({
  args: { name: v.string(), tokenIdentifier: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", {
      name: args.name,
      tokenIdentifier: args.tokenIdentifier,
    });
  },
});

export const getUser = query({
  args: { tokenIdentifier: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", args.tokenIdentifier),
      )
      .first();
  },
});
