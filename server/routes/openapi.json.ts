import { getOpenApiDocument } from "~~/server/utils/agent-discovery"

export default defineEventHandler((event) => {
  setHeader(event, "Content-Type", "application/openapi+json; charset=utf-8")
  return getOpenApiDocument()
})
