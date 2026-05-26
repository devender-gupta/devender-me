import type {
  UserCollectionItem,
  ExperiencesCollectionItem,
  ProjectsCollectionItem
} from "@nuxt/content"

export default defineEventHandler(async (event) => {
  // 1. Read conversation history from client request payload
  const body = await readBody(event)
  const messages = body?.messages || []

  if (!messages.length) {
    throw createError({ statusCode: 400, statusMessage: "Messages are required." })
  }

  try {
    // 2. Fetch full datasets from Nuxt Content collections
    const [userArr, experiences, projects] = await Promise.all([
      queryCollection(event, "user").all(),
      queryCollection(event, "experiences").all(),
      queryCollection(event, "projects").all()
    ])

    const user: UserCollectionItem | null = userArr[0] ?? null

    const name = user?.name ?? "Devender Gupta"
    const designation = user?.designation ?? "Full Stack Engineer"
    const summary = user?.summary ?? ""

    const email = (user?.email as string) ?? userMeta?.email ?? ""
    const github = (user?.github_link as string) ?? userMeta?.github_link ?? ""
    const linkedin = (user?.linkedin_link as string) ?? userMeta?.linkedin_link ?? ""

    // 3. Compile experiences with full typed fields
    const experienceContext = experiences
      .map((item: ExperiencesCollectionItem) => {
        return `### POSITION: ${item.position} at ${item.company} (${item.date})\n  Location: ${item.location}\n`
      })
      .join("\n")

    // 4. Compile projects with full typed fields
    const projectContext = projects
      .map((item: ProjectsCollectionItem) => {
        const rolesList = item.roles.map((r) => `    - ${r}`).join("\n")
        const achList = item.achievements.map((a) => `    - ${a}`).join("\n")
        return [
          `### PROJECT: ${item.title} (${item.date})`,
          `  Tech: ${item.tech.join(", ")}`,
          `  Overview: ${item.description}`,
          rolesList ? `  Responsibilities:\n${rolesList}` : "",
          achList ? `  Achievements:\n${achList}` : ""
        ]
          .filter(Boolean)
          .join("\n")
      })
      .join("\n\n")

    // 5. Construct the deep knowledge-base System Prompt
    const techList = user?.tech_stack?.map((t) => t.name).join(", ") ?? ""
    const educationContext =
      user?.education?.map((e) => `- ${e.degree} at ${e.institution} (${e.date})`).join("\n") ?? ""

    const systemPrompt = `
      You are an elite, highly intelligent AI Career Assistant representing ${name}, an accomplished Lead ${designation}.
      Your job is to act as his representative and answer recruiter questions confidently, warmly, and thoroughly.
      
      OFFICIAL CONTACT DETAILS (Provide these freely whenever someone asks to contact, hire, or connect with Devender):
      - Email: ${email}
      - GitHub Portfolio: ${github}
      - LinkedIn Profile: ${linkedin}

      CRITICAL METRICS (Always use these to answer high-level timeline and tech experience queries):
      - Total Career Experience: Devender has nearly 8 years (7.5+ years) of professional full-stack engineering experience.
      - Laravel Experience: Devender has been building with Laravel for his entire career—spanning nearly 8 years of production-grade backend architecture, SaaS scaling, and API development.
      - Core Framework Stack: Laravel (Senior/Lead level), Node.js, Nuxt.js, Vue.js, React, and MySQL.
      - Base Location: Kochi, Kerala, India.

      ABOUT DEVENDER:
      ${summary}

      ${techList ? `CORE TECH STACK:\n      ${techList}` : ""}

      ${educationContext ? `EDUCATION:\n      ${educationContext}` : ""}

      DETAILED EXPERIENCE, ROLES & RESPONSIBILITIES:
      ${experienceContext}

      COMPREHENSIVE PROJECT PORTFOLIO & ACHIEVEMENTS:
      ${projectContext}

      RULES & BEHAVIOR CONSTRAINTS:
      - Answer directly, proudly, and professionally. Speak in the third person or as a designated agent representative.
      - When asked about specific tool experience (like Laravel or Vue), use the CRITICAL METRICS to confidently state that he has utilized them throughout his entire 8-year career history.
      - Keep responses clean, readable, and highly organized using bullet points for tool stacks or specific achievements.
      - Never fabricate information. If an engineering capability or specific project scope is not specified in the data modules above, politely state you lack that explicit telemetry record on hand, but encourage the recruiter to connect with Devender directly via email or LinkedIn.
    `

    // 6. Securely execute payload call against free GitHub Models inference gateway
    const config = useRuntimeConfig()
    const response = await $fetch<{ choices: Array<{ message: { content: string } }> }>(
      "https://models.inference.ai.azure.com/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.githubToken}`,
          "Content-Type": "application/json"
        },
        body: {
          model: "gpt-4o-mini",
          messages: [{ role: "system", content: systemPrompt }, ...messages],
          temperature: 0.2
        }
      }
    )

    return {
      message: response.choices[0]?.message.content
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to communicate with GitHub AI Core."
    throw createError({
      statusCode: 500,
      statusMessage: message
    })
  }
})
