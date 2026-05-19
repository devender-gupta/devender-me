import type { ParsedContent } from "@nuxt/content"

export default defineEventHandler(async (event) => {
  setHeader(event, "Content-Type", "text/plain; charset=utf-8")

  const [userArr, experiences, projects] = await Promise.all([
    queryCollection(event, "content").where("path", "LIKE", "/user%").all(),
    queryCollection(event, "content").where("path", "LIKE", "/experiences%").all(),
    queryCollection(event, "content").where("path", "LIKE", "/projects%").all()
  ])

  // Cast cleanly using the native ParsedContent model instead of raw 'any'
  const user = Array.isArray(userArr) && userArr.length > 0 ? (userArr[0] as ParsedContent) : null

  // Safely cast custom metadata collections as unknown key-value records
  const userMeta = user?.meta as Record<string, unknown> | undefined

  const name = (user?.name as string) ?? (user?.title as string) ?? "Devender Gupta"
  const designation =
    (user?.designation as string) ?? (userMeta?.designation as string) ?? "Full Stack Engineer"
  const summary =
    (user?.summary as string) ??
    (userMeta?.summary as string) ??
    (user?.description as string) ??
    ""
  const email = (user?.email as string) ?? (userMeta?.email as string) ?? ""
  const phone = (user?.phone as string) ?? (userMeta?.phone as string) ?? ""
  const github = (user?.github_link as string) ?? (userMeta?.github_link as string) ?? ""
  const linkedin = (user?.linkedin_link as string) ?? (userMeta?.linkedin_link as string) ?? ""
  const stackoverflow =
    (user?.stackoverflow_link as string) ?? (userMeta?.stackoverflow_link as string) ?? ""

  const userTech = user?.tech_stack ?? userMeta?.tech_stack
  const techStack = Array.isArray(userTech)
    ? userTech
        .map((item) => {
          if (typeof item === "string") return item
          if (item && typeof item === "object" && "name" in item) {
            return (item as Record<string, string>).name
          }
          return ""
        })
        .filter(Boolean)
    : []

  const experienceLines = experiences.map((item) => {
    const meta = item.meta as Record<string, unknown> | undefined
    const company = (item.company as string) ?? (meta?.company as string) ?? "Independent"
    const position =
      (item.position as string) ??
      (item.title as string) ??
      (meta?.position as string) ??
      "Engineer"
    const date = (item.date as string) ?? (meta?.date as string) ?? ""
    const location = (item.location as string) ?? (meta?.location as string) ?? ""
    return `- ${company} | ${position}${date ? ` | ${date}` : ""}${location ? ` | ${location}` : ""}`
  })

  const projectLines = projects.map((item) => {
    const meta = item.meta as Record<string, unknown> | undefined
    const title = item.title ?? "Project"
    const date = (item.date as string) ?? (meta?.date as string) ?? ""
    const company = (item.company as string) ?? (meta?.company as string) ?? ""
    const preview = (item.preview_link as string) ?? (meta?.preview_link as string) ?? ""

    const projectTech = item.tech ?? meta?.tech ?? item.tech_stack ?? meta?.tech_stack
    const tech = Array.isArray(projectTech) ? projectTech.join(", ") : ""

    return `- ${title}${date ? ` (${date})` : ""}${company ? ` | ${company}` : ""}${tech ? ` | Tech: ${tech}` : ""}${preview ? ` | Preview: ${preview}` : ""}`
  })

  return [
    `${name.toUpperCase()} | ${designation.toUpperCase()}`,
    summary ? `Summary: ${summary}` : "",
    email ? `Email: ${email}` : "",
    phone ? `Phone: ${phone}` : "",
    "Website: https://devendergupta.com",
    "",
    "=========================================",
    "SOCIAL LINKS",
    "=========================================",
    github ? `GitHub: ${github}` : "",
    linkedin ? `LinkedIn: ${linkedin}` : "",
    stackoverflow ? `Stack Overflow: ${stackoverflow}` : "",
    "",
    "=========================================",
    "TECH STACK",
    "=========================================",
    techStack.length ? `- ${techStack.join(", ")}` : "- Advanced Web Development ecosystem stacks.",
    "",
    "=========================================",
    "EXPERIENCE",
    "=========================================",
    experienceLines.length
      ? experienceLines.join("\n")
      : "- Full-Stack engineering career history records.",
    "",
    "=========================================",
    "PROJECTS",
    "=========================================",
    projectLines.length
      ? projectLines.join("\n")
      : "- High-performance application portfolio modules.",
    "",
    "=========================================",
    "PORTFOLIO MAP",
    "=========================================",
    "Sitemap: https://devendergupta.com/sitemap.xml",
    "Manifest: https://devendergupta.com/site.webmanifest"
  ]
    .filter((line) => typeof line === "string" && line.trim() !== "")
    .join("\n")
})
