// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      title: "Devender Gupta | Full Stack Engineer",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          name: "description",
          content:
            "Portfolio of Devender Gupta, a Full Stack Engineer specializing in high-performance web applications using Laravel, NodeJS, VueJS, ReactJS, and MySQL."
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: "https://devender.me" },
        { property: "og:title", content: "Devender Gupta | Full Stack Engineer" },
        {
          property: "og:description",
          content: "Explore the projects and technical expertise of Devender Gupta."
        },
        { property: "og:image", content: "/og-preview.png" }
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/site.webmanifest" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        { rel: "canonical", href: "https://devendergupta.com" },
        {
          rel: "preload",
          as: "image",
          href: "/devender-gupta.webp",
          type: "image/webp"
        }
      ]
    }
  },
  css: ["~/assets/css/variables.css", "~/assets/css/main.css"],
  modules: ["@nuxt/content", "@nuxt/icon", "@nuxt/image", "@nuxt/eslint", "@nuxtjs/color-mode"],
  devtools: { enabled: import.meta.dev },
  future: { compatibilityVersion: 4 },
  compatibilityDate: "2026-05-13",
  icon: {
    mode: "css",
    cssLayer: "base"
  },
  colorMode: {
    preference: "system",
    fallback: "dark",
    classSuffix: ""
  }
})
