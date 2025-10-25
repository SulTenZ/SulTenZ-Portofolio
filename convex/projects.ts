import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const projects = await ctx.db.query("projects").collect();
    return Promise.all(
      projects.map(async (project) => ({
        ...project,
        imageUrl: await ctx.storage.getUrl(project.imageStorageId),
      }))
    );
  },
});

export const add = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    imageStorageId: v.id("_storage"),
    link: v.string(),
    techStack: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("projects", args);
  },
});

export const remove = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, { id }) => {
    const doc = await ctx.db.get(id);
    if (doc) {
      await ctx.storage.delete(doc.imageStorageId);
      await ctx.db.delete(id);
    }
  },
});
