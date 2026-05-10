// convex/certificates.ts
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    // Tambahkan order("desc") agar list certificate selalu rapi dari yang terbaru
    const certificates = await ctx.db.query("certificates").order("desc").collect();
    
    return Promise.all(
      certificates.map(async (cert) => ({
        ...cert,
        imageUrl: await ctx.storage.getUrl(cert.imageStorageId),
      }))
    );
  },
});

export const getRecent = query({
  args: {},
  handler: async (ctx) => {
    // Ambil maksimal 2 sertifikat terbaru
    const certificates = await ctx.db.query("certificates").order("desc").take(2);
    
    return Promise.all(
      certificates.map(async (cert) => ({
        ...cert,
        imageUrl: await ctx.storage.getUrl(cert.imageStorageId),
      }))
    );
  },
});

export const add = mutation({
  args: {
    title: v.string(),
    issuer: v.string(),
    date: v.string(),
    imageStorageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("certificates", args);
  },
});

export const remove = mutation({
  args: { id: v.id("certificates") },
  handler: async (ctx, { id }) => {
    const doc = await ctx.db.get(id);
    if (doc) {
      await ctx.storage.delete(doc.imageStorageId);
      await ctx.db.delete(id);
    }
  },
});
