import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/** List semua group (urut kalau ada order) */
export const list = query({
  args: {},
  handler: async (ctx) => {
    const groupsIndexed = await ctx.db.query("skillGroups")
      .withIndex("by_order")
      .order("asc")
      .collect();

    return groupsIndexed.length
      ? groupsIndexed
      : await ctx.db.query("skillGroups").collect();
  },
});

/** Tambah group */
export const add = mutation({
  args: {
    name: v.string(),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("skillGroups", args);
  },
});

/** Update group */
export const update = mutation({
  args: {
    id: v.id("skillGroups"),
    name: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, { id, ...patch }) => {
    await ctx.db.patch(id, patch);
  },
});

/** Hapus group + semua skills di dalamnya */
export const remove = mutation({
  args: { id: v.id("skillGroups") },
  handler: async (ctx, { id }) => {
    const skills = await ctx.db.query("skills")
      .withIndex("by_group", (q) => q.eq("groupId", id))
      .collect();

    for (const s of skills) {
      await ctx.storage.delete(s.imageStorageId);
      await ctx.db.delete(s._id);
    }

    await ctx.db.delete(id);
  },
});
