import { getRequestHeader, getRequestURL, setHeader } from "h3"
import { getHomepageMarkdown, siteProfile } from "~~/server/utils/agent-discovery"

export default defineEventHandler((event) => {
  const pathname = getRequestURL(event).pathname
  if (pathname !== "/") {
    return
  }

  setHeader(
    event,
    "Link",
    "</.well-known/api-catalog>; rel=\"api-catalog\", </docs/api>; rel=\"service-doc\""
  )
  setHeader(event, "Vary", "Accept")

  const acceptHeader = getRequestHeader(event, "accept") ?? ""
  if (!acceptHeader.includes("text/markdown")) {
    return
  }

  setHeader(event, "Content-Type", "text/markdown; charset=utf-8")

  return getHomepageMarkdown().replace("# Devender Gupta", `# ${siteProfile.name}`)
})
