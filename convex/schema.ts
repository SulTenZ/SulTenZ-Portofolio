import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  skillGroups: defineTable({
    name: v.string(),
    order: v.optional(v.number()),
  }).index("by_order", ["order"]),

  skills: defineTable({
    groupId: v.id("skillGroups"),
    name: v.string(),
    imageStorageId: v.id("_storage"),
    level: v.optional(v.string()),
    order: v.optional(v.number()), 
  })
  .index("by_group", ["groupId"])
  .index("by_group_order", ["groupId", "order"]),

  projects: defineTable({
    title: v.string(),
    description: v.string(),
    imageStorageId: v.id("_storage"),
    link: v.string(),
    techStack: v.array(v.string()),
  }),

    contactMessages: defineTable({
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
    createdAt: v.number(),
  }),

  messages: defineTable({
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
    createdAt: v.number(),
  }),
});
