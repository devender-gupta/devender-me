<template>
  <section class="projects-section container">
    <div class="section-heading text-center">
      <h2 class="section-title">Projects</h2>
      <p class="section-subtitle">Things I’ve built so far</p>
    </div>
    <div class="projects-grid">
      <ProjectCard v-for="project in projects" :key="project.path" :project="project" />
    </div>
  </section>
</template>

<script setup>
const { data: projects } = await useAsyncData("projects", () =>
  queryCollection("projects").order("id", "DESC").all()
)
</script>
<style scoped>
.projects-section {
  padding: 80px 0;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  padding-bottom: 5rem;
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
