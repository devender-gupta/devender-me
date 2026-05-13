<template>
  <div>
    <section id="home" class="page-section">
      <AppHeader />
    </section>

    <section id="about" class="page-section">
      <AppHero />
    </section>

    <section id="tech" class="page-section">
      <TechStack />
    </section>

    <section id="projects" class="page-section">
      <Project />
    </section>

    <section id="contact" class="page-section">
      <AppFooter />
    </section>
  </div>
</template>

<script setup>
import AppFooter from "~/components/AppFooter.vue"
</script>

<style scoped>
.page-section {
  scroll-margin-top: 1rem;
}

.section-heading {
  text-align: center;
  margin-bottom: 4rem;
}

.section-heading h2 {
  font-size: 2.5rem;
}

.contact-section {
  padding: 2rem 0 5rem;
}

.contact-section h2 {
  margin-bottom: 0.5rem;
}

.contact-links {
  display: flex;
  gap: 1rem;
  margin-top: 0.75rem;
}

.contact-links a,
.contact-section a {
  color: var(--primary-accent);
}
</style>
