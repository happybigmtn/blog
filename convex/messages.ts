import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    // Assuming 'posts' table contains the messages
    const messages = await ctx.db.query("posts").order("desc").take(100);
    // Add the author's name to each message
    return Promise.all(
      messages.map(async (message) => {
        const author = message.authorId; // Assuming authorId is already present
        return { ...message, author };
      }),
    );
  },
});

export const send = mutation({
  args: {
    body: v.string(),
    title: v.string(),
    category: v.string(),
    tags: v.array(v.string()),
  },
  handler: async (ctx, { body, title, category, tags }) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not signed in");
    }
    // Send a new message (post)
    await ctx.db.insert("posts", {
      title,
      content: body,
      category,
      tags,
      authorId: identity.subject,
    });
  },
});
