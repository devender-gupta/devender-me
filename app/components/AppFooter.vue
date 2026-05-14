<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <NuxtLink to="/#home" class="logo">
            <span class="brackets">{</span>
            <span class="gradient-text">{{ user.brand.first }}</span>
            <span class="brackets">}</span>
            <span class="name-suffix">&nbsp;{{ user.brand.last }}</span>
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
  padding: 4rem 0 2rem;
  background-color: var(--bg-dark);
  margin-top: 4rem;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.footer-info {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.logo {
  color: var(--text-white);
  text-decoration: none;
}

.info-link {
  color: var(--text-white);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s;
}

.info-link:hover {
  color: var(--primary-accent);
}

.footer-socials {
  display: flex;
  gap: 1.5rem;
  font-size: 1.4rem;
}

.footer-socials a {
  color: var(--text-white);
  display: inline-flex;
  transition:
    transform 0.3s,
    color 0.3s;
}

.footer-socials a:hover {
  color: var(--primary-accent);
  transform: translateY(-3px);
}

.footer-divider {
  border: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.footer-nav {
  display: flex;
  gap: 2rem;
}

.footer-nav a {
  color: var(--text-white);
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.3s;
}

.footer-nav a:hover {
  color: var(--primary-accent);
}

@media (max-width: 992px) {
  .footer-top {
    flex-direction: column;
    gap: 2rem;
    text-align: center;
  }

  .footer-info {
    flex-direction: column;
    gap: 1rem;
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
    gap: 1rem;
  }
}
</style>
