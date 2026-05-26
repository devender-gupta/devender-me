export const siteProfile = {
  name: "Devender Gupta",
  designation: "Full Stack Engineer",
  location: "Kochi, Kerala, India",
  website: "https://devendergupta.com",
  summary:
    "Lead Full-Stack Engineer with 7+ years of experience building, scaling, and maintaining production-grade SaaS platforms and high-traffic web applications used by thousands of real users.",
  email: "devender.gupta.me@gmail.com",
  github: "https://github.com/devender-gupta",
  linkedin: "https://www.linkedin.com/in/devender-gupta",
  stackoverflow: "https://stackoverflow.com/users/8053641/devender-gupta",
  techStack: ["Laravel", "Node.js", "Vue.js", "React.js", "AWS", "Docker"],
  experiences: [
    {
      company: "Brainwired (Drakon Innovations Pvt ltd)",
      role: "Software Engineer",
      period: "Jul 2018 - Nov 2018",
      location: "Kochi, Kerala, India"
    },
    {
      company: "CloudMe Software Solution",
      role: "Senior Laravel Developer",
      period: "Dec 2018 - Aug 2019",
      location: "Kochi, Kerala, India"
    },
    {
      company: "Floges Software Solutions (P) Ltd",
      role: "Software Engineer",
      period: "Sep 2019 - Dec 2021",
      location: "Kochi, Kerala, India"
    },
    {
      company: "QBurst Technologies",
      role: "Lead Engineer, Senior Engineer",
      period: "Jan 2022 - Present",
      location: "Kochi, Kerala, India"
    }
  ],
  projects: [
    {
      title: "Osmosis Learn",
      company: "QBurst Technologies",
      period: "Sep 2019 - Dec 2021",
      tech: ["CodeIgniter", "Flutter", "Git", "Laravel", "MySQL", "Node.js", "PHP", "Vue.js"],
      description:
        "A SaaS learning platform for global learners with interactive sessions, webinars, learning resources, invitations, courses, quizzes, and assets."
    },
    {
      title: "MeetClinics",
      company: "QBurst Technologies",
      period: "Apr 2020 - Aug 2021",
      tech: ["AWS", "Firebase", "Flutter", "Git", "Laravel", "Vue.js"],
      description:
        "An online doctor and hospital consultation app for users in Turkey with search and filtering by location, GPS, and treatment facilities."
    },
    {
      title: "Dreamscape Platform '18",
      company: "Dreamscape Networks",
      period: "Mar 2022 - Oct 2022",
      tech: ["Git", "MySQL", "PHP"],
      description:
        "A web hosting platform and CRM for customers to browse products on the platform."
    },
    {
      title: "CUT APP Project",
      company: "QBurst Technologies",
      period: "Nov 2022 - Dec 2023",
      tech: ["Laravel", "ReactJS"],
      description:
        "An app that lets restaurant owners and chefs order supplies directly from suppliers while tracking inventory, loyalty, and profit sharing."
    },
    {
      title: "WWJ Corp. Software Engineering",
      company: "QBurst Technologies",
      period: "May 2024 - Jan 2026",
      tech: ["Docker", "Flutter", "Laravel", "Nuxt.js"],
      description:
        "A platform for booking office desks, rooms, and shared spaces via web and mobile devices."
    }
  ]
} as const

export const agentSkillDocs = [
  {
    slug: "link-headers",
    title: "Link Headers",
    description: "Documents the homepage Link response headers for agent discovery.",
    content: `# Link Headers

The homepage advertises discovery resources using RFC 8288 Link headers.

- api-catalog: /.well-known/api-catalog
- service-doc: /docs/api

Agents should inspect the Link response headers on / for discovery.`
  },
  {
    slug: "markdown-negotiation",
    title: "Markdown Negotiation",
    description: "Documents markdown responses when agents send Accept: text/markdown.",
    content: `# Markdown Negotiation

The homepage returns markdown when the request includes Accept: text/markdown.

- Default for browsers: HTML
- Agent response: text/markdown; charset=utf-8

This keeps the page readable for both humans and agents.`
  },
  {
    slug: "content-signals",
    title: "Content Signals",
    description: "Documents the site's robots.txt Content-Signal directives.",
    content: `# Content Signals

robots.txt declares the site's content preferences with Content-Signal directives.

- ai-train=no
- search=yes
- ai-input=no

These directives communicate how automated systems may use the site's content.`
  },
  {
    slug: "api-catalog",
    title: "API Catalog",
    description: "Documents the RFC 9727 API catalog endpoint.",
    content: `# API Catalog

/.well-known/api-catalog returns an application/linkset+json document.

It advertises:
- service-desc: /openapi.json
- service-doc: /docs/api
- status: /api/health

This helps automated clients discover the site's API surface.`
  },
  {
    slug: "mcp-server-card",
    title: "MCP Server Card",
    description: "Documents the published MCP server card for discovery.",
    content: `# MCP Server Card

/.well-known/mcp/server-card.json publishes discovery metadata for agent tooling.

The card includes:
- server information
- transport details
- capabilities

This allows MCP-aware clients to discover the site's agent-facing tooling.`
  }
] as const

export function getHomepageMarkdown() {
  const projectLines = siteProfile.projects.map((project) => {
    return `- ${project.title} (${project.period}) - ${project.company}: ${project.description}`
  })

  const experienceLines = siteProfile.experiences.map((experience) => {
    return `- ${experience.role} at ${experience.company} (${experience.period}) - ${experience.location}`
  })

  return [
    `# ${siteProfile.name}`,
    "",
    `**${siteProfile.designation}** based in ${siteProfile.location}`,
    "",
    siteProfile.summary,
    "",
    "## Tech Stack",
    siteProfile.techStack.map((item) => `- ${item}`).join("\n"),
    "",
    "## Experience",
    experienceLines.join("\n"),
    "",
    "## Featured Projects",
    projectLines.join("\n"),
    "",
    "## Discovery",
    "- API catalog: /.well-known/api-catalog",
    "- API docs: /docs/api",
    "- AI text endpoint: /ai.txt"
  ].join("\n")
}

export function getApiCatalog() {
  return {
    linkset: [
      {
        anchor: siteProfile.website + "/",
        link: [
          {
            href: siteProfile.website + "/openapi.json",
            rel: "service-desc",
            type: "application/openapi+json"
          },
          {
            href: siteProfile.website + "/docs/api",
            rel: "service-doc",
            type: "text/html"
          },
          {
            href: siteProfile.website + "/api/health",
            rel: "status",
            type: "application/json"
          }
        ]
      }
    ]
  }
}

export function getOpenApiDocument() {
  return {
    openapi: "3.1.0",
    info: {
      title: "Devender Gupta Portfolio Discovery API",
      version: "1.0.0",
      description: "Discovery endpoints for homepage metadata, AI text, and service health."
    },
    servers: [{ url: siteProfile.website }],
    paths: {
      "/api/health": {
        get: {
          summary: "Health check",
          responses: {
            "200": {
              description: "Service is healthy"
            }
          }
        }
      },
      "/ai.txt": {
        get: {
          summary: "Token-optimized profile text for agents",
          responses: {
            "200": {
              description: "Plain text profile data"
            }
          }
        }
      },
      "/docs/api": {
        get: {
          summary: "API documentation page",
          responses: {
            "200": {
              description: "Documentation page"
            }
          }
        }
      }
    }
  }
}

export function getMcpServerCard() {
  return {
    serverInfo: {
      name: "Devender Gupta Portfolio Discovery",
      version: "1.0.0"
    },
    transport: {
      type: "http",
      url: siteProfile.website + "/api/mcp"
    },
    capabilities: {
      tools: ["openSection", "getDiscoveryEndpoints", "readAiTxt"],
      resources: ["homepage", "docs", "health"],
      prompts: []
    }
  }
}
