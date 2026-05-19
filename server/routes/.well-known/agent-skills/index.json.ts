import { createHash } from "node:crypto"
import { agentSkillDocs } from "~~/server/utils/agent-discovery"

export default defineEventHandler((event) => {
  setHeader(event, "Content-Type", "application/json; charset=utf-8")

  return {
    $schema: "https://agentskills.io/schemas/discovery-index.v0.2.0.json",
    skills: agentSkillDocs.map((skill) => ({
      name: skill.title,
      type: "documentation",
      description: skill.description,
      url: `https://devendergupta.com/.well-known/agent-skills/${skill.slug}.md`,
      sha256: createHash("sha256").update(skill.content, "utf8").digest("hex")
    }))
  }
})
