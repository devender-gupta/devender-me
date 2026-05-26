import type { ParsedContent } from "@nuxt/content"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const messages = body?.messages || []

  if (!messages.length) {
    throw createError({ statusCode: 400, statusMessage: "Messages are required." })
  }

  try {
    // 1. Gather your Nuxt Content v3 data
    const [userArr, experiences, projects] = await Promise.all([
      queryCollection(event, "content").where("path", "LIKE", "/user%").all(),
      queryCollection(event, "content").where("path", "LIKE", "/experiences%").all(),
      queryCollection(event, "content").where("path", "LIKE", "/projects%").all()
    ])

    const user = Array.isArray(userArr) && userArr.length > 0 ? (userArr[0] as ParsedContent) : null

    const name = (user?.name as string) ?? "Devender Gupta"
    const designation = (user?.designation as string) ?? "Full Stack Engineer"
    const summary = (user?.summary as string) ?? (user?.description as string) ?? ""

    const techStack = user?.tech_stack as Array<{ name: string }> | undefined
    const techList = Array.isArray(techStack) ? techStack.map((t) => t.name).join(", ") : ""

    const education = user?.education as
      | Array<{ degree: string; institution: string; date: string }>
      | undefined
    const educationContext = Array.isArray(education)
      ? education.map((e) => `- ${e.degree} at ${e.institution} (${e.date})`).join("\n")
      : ""

    const experienceContext = experiences
      .map((item) => {
        const lines = [`Company: ${item.company}, Role: ${item.position} (${item.date})`]
        if (item.location) lines.push(`  Location: ${item.location}`)
        return lines.join("\n")
      })
      .join("\n\n")

    const projectContext = projects
      .map((item) => {
        const tech = item.tech as string[] | undefined
        const roles = item.roles as string[] | undefined
        const achievements = item.achievements as string[] | undefined
        const lines = [`Project: ${item.title} (${item.date})`]
        if (item.description) lines.push(`  Description: ${item.description}`)
        if (Array.isArray(tech) && tech.length) lines.push(`  Tech: ${tech.join(", ")}`)
        if (Array.isArray(roles) && roles.length)
          lines.push(`  Responsibilities:\n${roles.map((r) => `    - ${r}`).join("\n")}`)
        if (Array.isArray(achievements) && achievements.length)
          lines.push(`  Achievements:\n${achievements.map((a) => `    - ${a}`).join("\n")}`)
        return lines.join("\n")
      })
      .join("\n\n")

    // 2. Format your resume intelligence instructions
    const systemPrompt = `
      You are an elite AI Career Assistant representing ${name}, a highly skilled ${designation}.
      Answer recruiter queries accurately and professionally based strictly on the provided context below.
      Be specific — reference actual project names, technologies, responsibilities, and achievements when relevant.
      
      ABOUT ${name.toUpperCase()}:
      ${summary}

      ${techList ? `CORE TECH STACK:\n${techList}` : ""}

      ${educationContext ? `EDUCATION:\n${educationContext}` : ""}

      CAREER HISTORY & EXPERIENCE:
      ${experienceContext}

      KEY PORTFOLIO PROJECTS:
      ${projectContext}

      RULES:
      - Format responses using Markdown: use **bold** for emphasis, bullet lists for multiple items, and inline code for technology names.
      - Be specific and cite concrete details (project names, tech, dates, achievements) whenever available.
      - Do not make up any information not present above. If something is not covered, encourage them to reach out to ${name} directly.
      - Keep answers professional and substantive.
    `

    // 3. Fetch from the FREE GitHub Models Endpoint
    const config = useRuntimeConfig()
    const response = (await $fetch("https://models.inference.ai.azure.com/chat/completions", {
      method: "POST",
      headers: {
        // Authenticates cleanly using your free developer token!
        Authorization: `Bearer ${config.githubToken}`,
        "Content-Type": "application/json"
      },
      body: {
        model: "gpt-4o-mini", // Hosted natively inside the GitHub models catalog
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        temperature: 0.3
      }
    })) as { choices: Array<{ message: { content: string } }> }

    return {
      message: response?.choices[0]?.message.content
    }
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to communicate with the GitHub AI Engine."
    throw createError({
      statusCode: 500,
      statusMessage: message
    })
  }
})
