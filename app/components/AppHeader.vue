<template>
  <header class="header container">
    <div class="logo">
      <NuxtLink to="/" class="logo-link">
        <span class="brackets">{</span>
        <span class="gradient-text">{{ userNameFirstPart }}</span>
        <span class="brackets">}</span>
        <span class="name-suffix">&nbsp;{{ userNameSecondPart }}</span>
      </NuxtLink>
    </div>
    <nav class="nav-links">
      <NuxtLink to="/#home">Home</NuxtLink>
      <NuxtLink to="/#about">About</NuxtLink>
      <NuxtLink to="/#tech">Tech Stack</NuxtLink>
      <NuxtLink to="/#projects">Projects</NuxtLink>
      <NuxtLink to="/#contact">Contact</NuxtLink>
    </nav>
    <div class="social-icons">
      <a class="social-link" :href="user.github_link" target="_blank" rel="noopener noreferrer">
        <AppIcon name="uil:github" :size="30" />
      </a>
      <a class="social-link" :href="user.linkedin_link" target="_blank" rel="noopener noreferrer">
        <AppIcon name="uil:linkedin" :size="30" />
      </a>
    </div>
  </header>
</template>
<script setup>
const { data: user } = await useAsyncData("user-header", () => queryCollection("user").first())

const userNameParts = computed(() => {
  const username = user.value?.brand_username || ""
  return username ? username.split("-") : []
})

const userNameFirstPart = computed(() => {
  return userNameParts.value[0] || ""
})

const userNameSecondPart = computed(() => {
  return userNameParts.value[1] || ""
})
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: var(--text-white);
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: var(--primary-accent);
}

.social-icons {
  display: flex;
  gap: 1.2rem;
  font-size: 1.2rem;
}

.social-link {
  display: inline-flex;
  color: var(--text-white);
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.social-link:hover {
  transform: translateY(-3px);
  color: var(--primary-accent);
  opacity: 0.8;
}
</style>
