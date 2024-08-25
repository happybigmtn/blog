import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

export default defineSchema({
  ...authTables,
  posts: defineTable({
    title: v.string(),
    content: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
    authorId: v.string(),
  }),
  comments: defineTable({
    postId: v.id("posts"),
    content: v.string(),
    authorId: v.string(),
  }),
  resources: defineTable({
    title: v.string(),
    description: v.string(),
    category: v.string(),
    link: v.string(),
  }),
  goals: defineTable({
    goal: v.string(),
    description: v.string(),
    category: v.string(),
    progress: v.number(),
    userId: v.string(),
  }),
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
});
