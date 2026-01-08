// convex/projects.ts
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// OPTIMIZATION: Query baru khusus untuk Home (hanya ambil 3 data terbaru)
export const getRecent = query({
  args: {},
  handler: async (ctx) => {
    // order("desc") mengurutkan berdasarkan waktu pembuatan (terbaru di atas)
    // take(3) membatasi hanya mengambil 3 item
    const projects = await ctx.db.query("projects").order("desc").take(3);

    return Promise.all(
      projects.map(async (project) => ({
        ...project,
        imageUrl: await ctx.storage.getUrl(project.imageStorageId),
      }))
    );
  },
});

// Query untuk halaman All Projects
export const list = query({
  args: {},
  handler: async (ctx) => {
    // Tambahkan order("desc") agar list project selalu rapi dari yang terbaru
    const projects = await ctx.db.query("projects").order("desc").collect();
    
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