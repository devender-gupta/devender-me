<template>
  <header class="header">
    <nav class="container nav-wrapper">
      <NuxtLink to="/" class="logo-link">
        <div class="logo">
          <span class="brackets">{</span>
          <span class="gradient-text">{{ user.brand.first }}</span>
          <span class="brackets">}</span>
          <span class="name">&nbsp;{{ user.brand.last }}</span>
        </div>
      </NuxtLink>

      <ul class="nav-links">
        <NuxtLink to="/#home" class="nav-link" :class="{ active: activeSection === 'home' }">
          Home
        </NuxtLink>
        <li>
          <a href="#tech" class="nav-link" :class="{ active: activeSection === 'tech' }"
            >Tech Stack</a
          >
        </li>
        <li>
          <a href="#projects" class="nav-link" :class="{ active: activeSection === 'projects' }"
            >Projects</a
          >
        </li>
        <li>
          <a href="#about" class="nav-link" :class="{ active: activeSection === 'about' }">About</a>
        </li>
        <li>
          <a href="#contact" class="nav-link" :class="{ active: activeSection === 'contact' }"
            >Contact</a
          >
        </li>
      </ul>

      <div class="header-socials">
        <a
          v-if="user?.github_link"
          :href="user.github_link"
          target="_blank"
          aria-label="GitHub"
          rel="noopener noreferrer"
        >
          <AppIcon name="uil:github" />
        </a>
        <a
          v-if="user?.linkedin_link"
          :href="user.linkedin_link"
          target="_blank"
          aria-label="LinkedIn"
          rel="noopener noreferrer"
        >
          <AppIcon name="uil:linkedin" />
        </a>
        <ThemeSwitcher />
      </div>
    </nav>
  </header>
</template>

<script setup>
const activeSection = ref("home")
const { data: user } = await useAsyncData("user-header", () => queryCollection("user").first())

const sections = ["home", "tech", "projects", "about", "contact"]

onMounted(() => {
  const updateActiveSection = () => {
    const offset = 140

    for (const sectionId of sections) {
      const element = document.getElementById(sectionId)
      if (!element) {
        continue
      }

      const top = element.getBoundingClientRect().top
      if (top - offset <= 0) {
        activeSection.value = sectionId
      }
    }

    if (globalThis.scrollY < 120) {
      activeSection.value = "home"
    }
  }

  updateActiveSection()
  globalThis.addEventListener("scroll", updateActiveSection, { passive: true })

  onBeforeUnmount(() => {
    globalThis.removeEventListener("scroll", updateActiveSection)
  })
})
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(var(--color-bg-rgb), 0.8);
  backdrop-filter: blur(10px);
  border-bottom: var(--border-subtle);
  padding-block: var(--space-6);
}

.nav-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links {
  display: flex;
  gap: var(--space-10);
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: var(--color-text-muted);
  text-decoration: none;
  font-weight: var(--font-weight-medium);
  font-size: 1rem;
  transition: color var(--duration-base) var(--easing-standard);
}

.nav-link:hover {
  color: var(--color-white);
}

.nav-link.active {
  color: var(--color-primary);
}

.logo-link {
  text-decoration: none;
  color: inherit;
}

.logo {
  color: var(--color-heading);
  font-size: 1.05rem;
  font-weight: var(--font-weight-semibold);
}

.brackets {
  color: var(--color-text-muted);
}

.name {
  color: var(--color-text);
}

.header-socials {
  display: flex;
  gap: var(--space-5);
  font-size: 1.5rem;
  align-items: center;
}

.header-socials a {
  color: var(--color-text-muted);
  transition:
    color var(--duration-base) var(--easing-standard),
    transform var(--duration-base) var(--easing-standard);
}

.header-socials a:hover {
  color: var(--color-white);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .header {
    padding-block: var(--space-4);
  }
}
</style>
