import { defineContentConfig, defineCollection, z } from "@nuxt/content"

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: "page",
      source: "**"
    }),
    projects: defineCollection({
      type: "page",
      source: "projects/*.md",
      schema: z.object({
        id: z.string(),
        title: z.string(),
        company: z.string(),
        date: z.string(),
        repo_link: z.string().url().optional(),
        preview_link: z.string().url().optional(),
        tech: z.array(z.string()),
        description: z.string(),
        roles: z.array(z.string()),
        achievements: z.array(z.string())
      })
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
        brand: z.object({
          first: z.string(),
          last: z.string()
        }),
        github_link: z.string().url(),
        linkedin_link: z.string().url(),
        resume_link: z.string().url().optional(),
        education: z.array(
          z.object({
            institution: z.string(),
            degree: z.string(),
            date: z.string()
          })
        ),
        tech_stack: z
          .array(
            z.object({
              name: z.string(),
              icon: z.string()
            })
          )
          .optional()
      })
    }),
    experiences: defineCollection({
      type: "page",
      source: "experiences/*.md",
      schema: z.object({
        id: z.string(),
        company: z.string(),
        position: z.string(),
        date: z.string(),
        location: z.string(),
        type: z.string()
      })
    })
  }
})
