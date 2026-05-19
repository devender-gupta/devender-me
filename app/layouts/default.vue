<template>
  <div class="app-container">
    <AppHeader />

    <main class="main-content">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
useHead({
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Devender Gupta",
        jobTitle: "Lead Full-Stack Engineer",
        url: "https://devendergupta.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kochi",
          addressRegion: "Kerala",
          addressCountry: "India"
        },
        knowsAbout: [
          "Laravel",
          "Nuxt.js",
          "Vue.js",
          "React.js",
          "Node.js",
          "MySQL",
          "SaaS Architecture",
          "Web Performance"
        ]
      })
    }
  ]
})
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* Ensures footer stays at the bottom on short pages */
}

.main-content {
  flex: 1;
  /* Pushes the footer down if content is sparse */
}
</style>
