<template>
  <section class="projects-section container">
    <div class="section-heading text-center">
      <h2 class="section-title">Featured Projects</h2>
      <p class="section-subtitle">A snapshot of my latest engineering contributions.</p>
    </div>
    <div class="projects-grid">
      <ProjectCard v-for="project in projects" :key="project.path" :project="project" />
    </div>
  </section>
</template>

<script setup>
const { data: projects } = await useAsyncData("projects", () =>
  queryCollection("projects").where("display", "==", "true").order("id", "DESC").all()
)
</script>
<style scoped>
.projects-section {
  padding-block: var(--space-20);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-10);
  padding-bottom: var(--space-20);
}

@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
