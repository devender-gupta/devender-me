import { getApiCatalog } from "~~/server/utils/agent-discovery"

export default defineEventHandler((event) => {
  setHeader(event, "Content-Type", "application/linkset+json; charset=utf-8")
  return getApiCatalog()
})
