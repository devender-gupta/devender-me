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

    const experienceContext = experiences
      .map((item) => {
        const meta = item.meta as Record<string, unknown> | undefined
        return `- ${item.company ?? meta?.company}: ${item.position ?? item.title} (${item.date ?? meta?.date})`
      })
      .join("\n")

    const projectContext = projects
      .map((item) => {
        const meta = item.meta as Record<string, unknown> | undefined
        const tech = item.tech ?? meta?.tech
        return `- ${item.title}: Using ${Array.isArray(tech) ? tech.join(", ") : "Web Stack"}`
      })
      .join("\n")

    // 2. Format your resume intelligence instructions
    const systemPrompt = `
      You are an elite AI Career Assistant representing ${name}, a highly skilled ${designation}.
      Answer recruiter queries concisely, accurately, and professionally based strictly on the provided context below.
      
      ABOUT DEVENDER:
      ${summary}

      CAREER HISTORY & EXPERIENCE:
      ${experienceContext}

      KEY PORTFOLIO PROJECTS:
      ${projectContext}

      RULES:
      - Answer directly, confidently, and politely. Keep responses crisp.
      - Do not make up any information. If a skill or project isn't mentioned above, encourage them to reach out to Devender directly.
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
      message: response.choices[0].message.content
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
