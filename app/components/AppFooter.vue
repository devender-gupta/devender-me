<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <NuxtLink to="/#home" class="logo">
            <span class="brackets">{</span>
            <span class="gradient-text">{{ user?.brand?.first }}</span>
            <span class="brackets">}</span>
            <span class="name-suffix">&nbsp;{{ user?.brand?.last }}</span>
          </NuxtLink>
        </div>

        <div class="footer-info">
          <a v-if="user?.phone" :href="`tel:${user.phone.replace(/\s+/g, '')}`" class="info-link">
            {{ user.phone }}
          </a>
          <a v-if="user?.email" :href="`mailto:${user.email}`" class="info-link">
            {{ user.email }}
          </a>

          <div class="footer-socials">
            <a
              v-if="user?.github_link"
              :href="user.github_link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <AppIcon name="uil:github" :size="24" />
            </a>
            <a
              v-if="user?.linkedin_link"
              :href="user.linkedin_link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <AppIcon name="uil:linkedin" :size="24" />
            </a>
            <a
              v-if="user?.stackoverflow_link"
              :href="user.stackoverflow_link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Stack Overflow"
            >
              <AppIcon name="ion:logo-stackoverflow" :size="24" />
            </a>
          </div>
        </div>
      </div>

      <hr class="footer-divider" >

      <div class="footer-bottom">
        <nav class="footer-nav">
          <NuxtLink to="/#home">Home</NuxtLink>
          <NuxtLink to="/#tech">Tech Stack</NuxtLink>
          <NuxtLink to="/#projects">Projects</NuxtLink>
          <NuxtLink to="/#about">About</NuxtLink>
          <NuxtLink to="/#contact">Contact</NuxtLink>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { data: user } = await useAsyncData("user-footer", () => queryCollection("user").first())
</script>

<style scoped>
.footer {
  padding: var(--space-16) 0 var(--space-8);
  background-color: var(--color-bg);
  margin-top: var(--space-16);
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-8);
}

.footer-info {
  display: flex;
  align-items: center;
  gap: var(--space-10);
}

.logo {
  color: var(--color-text);
  text-decoration: none;
}

.name-suffix {
  color: var(--color-text);
}

.info-link {
  color: var(--color-text);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color var(--duration-base) var(--easing-standard);
}

.info-link:hover {
  color: var(--color-primary);
}

.footer-socials {
  display: flex;
  gap: var(--space-6);
  font-size: 1.4rem;
}

.footer-socials a {
  color: var(--color-text);
  display: inline-flex;
  transition:
    transform var(--duration-base) var(--easing-standard),
    color var(--duration-base) var(--easing-standard);
}

.footer-socials a:hover {
  color: var(--color-primary);
  transform: translateY(-3px);
}

.footer-divider {
  border: 0;
  border-top: var(--border-strong);
  margin-bottom: var(--space-8);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-6);
}

.footer-nav {
  display: flex;
  gap: var(--space-8);
}

.footer-nav a {
  color: var(--color-text);
  text-decoration: none;
  font-size: 0.85rem;
  transition: color var(--duration-base) var(--easing-standard);
}

.footer-nav a:hover {
  color: var(--color-primary);
}

@media (max-width: 992px) {
  .footer-top {
    flex-direction: column;
    gap: var(--space-8);
    text-align: center;
  }

  .footer-info {
    flex-direction: column;
    gap: var(--space-4);
  }
}

@media (max-width: 768px) {
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }

  .footer-nav {
    justify-content: center;
    flex-wrap: wrap;
    gap: var(--space-4);
  }
}
</style>
