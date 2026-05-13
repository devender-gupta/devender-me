<template>
  <div>
    <section id="home" class="page-section">
      <AppHeader />
      <AppHero />
    </section>

    <section id="tech" class="page-section">
      <TechStack />
    </section>

    <section id="projects" class="page-section">
      <Project />
    </section>

    <section id="about" class="page-section">
      <About />
    </section>

    <section id="contact" class="page-section">
      <ContactSection />
      <AppFooter />
    </section>
  </div>
</template>

<style scoped>
.page-section {
  scroll-margin-top: 1rem;
}
</style>
