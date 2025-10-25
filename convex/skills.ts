// convex/skills.ts
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

/** Ambil semua group beserta skills (pakai URL gambar) */
export const listGroupsWithSkills = query({
  args: {},
  handler: async (ctx) => {
    // ambil groups, utamakan order jika ada
    const groupsIndexed = await ctx.db.query("skillGroups")
      .withIndex("by_order")
      .order("asc")
      .collect();
    const groups = groupsIndexed.length
      ? groupsIndexed
      : await ctx.db.query("skillGroups").collect();

    const out = [];
    for (const g of groups) {
      // ambil skills dalam group
      let skills = await ctx.db.query("skills")
        .withIndex("by_group", q => q.eq("groupId", g._id))
        .collect();
      // sort by order jika ada
      skills.sort((a, b) => (a.order ?? 9999) - (b.order ?? 9999));

      // lampirkan URL gambar
      const enriched = await Promise.all(
        skills.map(async (s) => ({
          id: s._id,
          name: s.name,
          level: s.level ?? null,
          imageUrl: await ctx.storage.getUrl(s.imageStorageId),
          order: s.order ?? null,
        }))
      );

      out.push({ id: g._id, name: g.name, skills: enriched, order: g.order ?? null });
    }
    return out;
  },
});

/** Tambah group baru */
export const addGroup = mutation({
  args: {
    name: v.string(),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("skillGroups", args);
  },
});

/** Tambah skill (gambar wajib) ke dalam group tertentu */
export const addSkill = mutation({
  args: {
    groupId: v.id("skillGroups"),
    name: v.string(),
    imageStorageId: v.id("_storage"),
    level: v.optional(v.string()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("skills", args);
  },
});

/** Hapus skill: delete doc + file storage */
export const removeSkill = mutation({
  args: { id: v.id("skills") },
  handler: async (ctx, { id }) => {
    const doc = await ctx.db.get(id);
    if (!doc) return;
    await ctx.storage.delete(doc.imageStorageId);
    await ctx.db.delete(id);
  },
});

/** Hapus group: ikut hapus semua skills & file gambarnya */
export const removeGroup = mutation({
  args: { id: v.id("skillGroups") },
  handler: async (ctx, { id }) => {
    // delete child skills
    const skills = await ctx.db.query("skills").withIndex("by_group", q => q.eq("groupId", id)).collect();
    for (const s of skills) {
      await ctx.storage.delete(s.imageStorageId);
      await ctx.db.delete(s._id);
    }
    // delete group
    await ctx.db.delete(id);
  },
});
