import { getMcpServerCard } from "~~/server/utils/agent-discovery"

export default defineEventHandler((event) => {
  setHeader(event, "Content-Type", "application/json; charset=utf-8")
  return getMcpServerCard()
})
