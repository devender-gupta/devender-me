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
const { data: user } = await useAsyncData("user-layout", () => queryCollection("user").first())
const { data: experiences } = await useAsyncData("experiences-layout", () =>
  queryCollection("experiences").order("id", "DESC").all()
)

const location = computed(() => {
  const latestExperience = experiences.value?.[0]
  const value = latestExperience?.location
  if (typeof value === "string" && value.trim().length > 0) {
    return value
  }
  return "Kochi, Kerala, India"
})

const knowsAbout = computed(() => {
  const stack = user.value?.tech_stack
  if (!Array.isArray(stack)) {
    return []
  }
  return stack
    .map((item) => item?.name)
    .filter((name) => typeof name === "string" && name.trim().length > 0)
})

useHead({
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: user.value?.name ?? "Devender Gupta",
        jobTitle: user.value?.designation ?? "Full Stack Engineer",
        url: "https://devendergupta.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: location.value.split(",")[0]?.trim() ?? "Kochi",
          addressRegion: location.value.split(",")[1]?.trim() ?? "Kerala",
          addressCountry: "India"
        },
        knowsAbout: knowsAbout.value
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
