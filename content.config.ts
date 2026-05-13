import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: "**",
    }),
    projects: defineCollection({
      type: "page",
      source: "projects/*.md",
      schema: z.object({
        id: z.string(),
        title: z.string(),
        company: z.string(),
        date: z.string(),
        tech: z.array(z.string()),
        description: z.string(),
        roles: z.array(z.string()),
        achievements: z.array(z.string()),
      }),
    }),
    user: defineCollection({
      type: "page",
      source: "user.md",
      schema: z.object({
        name: z.string(),
        email: z.string().email(),
        phone: z.string(),
        designation: z.string(),
        introduction: z.string(),
        summary: z.string(),
        brand_username: z.string(),
        github_link: z.string().url(),
        linkedin_link: z.string().url(),
        tech_stack: z
          .array(
            z.object({
              name: z.string(),
              icon: z.string(),
            }),
          )
          .optional(),
      }),
    }),
  },
});
