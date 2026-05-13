// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "en"
      },
      title: "Devender Gupta | Full Stack Developer",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Portfolio of Devender Gupta, a Full Stack Developer specializing in high-performance web applications using Laravel, NodeJS, VueJS, ReactJS, and MySQL."
        },
        // Open Graph / Facebook / LinkedIn
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://devender.me" }, // Replace with your actual domain later
        { property: "og:title", content: "Devender Gupta | Full Stack Developer" },
        {
          property: "og:description",
          content: "Explore the projects and technical expertise of Devender Gupta."
        },
        { property: "og:image", content: "/og-preview.jpg" } // The preview image
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        // Pre-connect to Google Fonts if you are using them to save 100-200ms
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" }
      ]
    }
  },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/content", "@nuxt/icon", "@nuxt/image", "@nuxt/eslint"],
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4
  },
  compatibilityDate: "2026-05-13",
  vite: {
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"]
    }
  },
  icon: {
    mode: "css",
    cssLayer: "base"
  }
})
