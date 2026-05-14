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
        <li><a href="#tech" class="nav-link">Tech Stack</a></li>
        <li><a href="#projects" class="nav-link">Projects</a></li>
        <li><a href="#about" class="nav-link">About</a></li>
        <li><a href="#contact" class="nav-link">Contact</a></li>
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
      </div>
    </nav>
  </header>
</template>

<script setup>
const { data: user } = await useAsyncData("user-header", () => queryCollection("user").first())
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(25, 25, 25, 0.8);
  /* Glassmorphism effect */
  backdrop-filter: blur(10px);
  padding: 1.5rem 0;
}

.nav-wrapper {
  display: flex;
  justify-content: space-between;
  /* This is the secret sauce */
  align-items: center;
}

/* Nav links styling */
.nav-links {
  display: flex;
  gap: 2.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  color: #a7a7a7;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #fff;
}

/* Logo styling */
.logo-link {
  text-decoration: none;
  color: inherit;
}

/* Social icons styling */
.header-socials {
  display: flex;
  gap: 1.2rem;
  font-size: 1.5rem;
}

.header-socials a {
  color: #a7a7a7;
  transition:
    color 0.3s,
    transform 0.3s;
}

.header-socials a:hover {
  color: #fff;
  transform: translateY(-2px);
}

/* Responsive: Hide nav on mobile or change to hamburger */
@media (max-width: 768px) {
  .nav-links {
    display: none;
    /* You can implement a mobile menu later */
  }
}
</style>
