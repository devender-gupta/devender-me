export default defineNuxtPlugin(() => {
  if (typeof navigator === "undefined") {
    return
  }

  type WebMcpTool = {
    name: string
    description: string
    inputSchema: Record<string, unknown>
    execute: (..._args: unknown[]) => Promise<unknown>
  }

  type WebMcpContext = {
    tools: WebMcpTool[]
  }

  type ModelContextApi = {
    provideContext?: (_context: WebMcpContext) => void
  }

  const modelContext = (navigator as Navigator & { modelContext?: ModelContextApi }).modelContext
  if (!modelContext?.provideContext) {
    return
  }

  modelContext.provideContext({
    tools: [
      {
        name: "openSection",
        description: "Scroll the page to a portfolio section by its anchor id.",
        inputSchema: {
          type: "object",
          properties: {
            section: {
              type: "string",
              enum: ["home", "tech", "projects", "about", "contact"]
            }
          },
          required: ["section"],
          additionalProperties: false
        },
        execute: async ({ section }: { section: string }) => {
          const element = document.getElementById(section)
          element?.scrollIntoView({ behavior: "smooth", block: "start" })
          return { ok: true, section }
        }
      },
      {
        name: "getDiscoveryEndpoints",
        description: "Return the site's discovery and documentation endpoints.",
        inputSchema: {
          type: "object",
          properties: {},
          additionalProperties: false
        },
        execute: async () => {
          return {
            homepage: "/",
            apiCatalog: "/.well-known/api-catalog",
            apiDocs: "/docs/api",
            openApi: "/openapi.json",
            health: "/api/health",
            aiText: "/ai.txt"
          }
        }
      }
    ]
  })
})
