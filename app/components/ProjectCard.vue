<template>
  <div class="project-card">
    <img
      :src="project.image || '/images/placeholder.jpg'"
      :alt="project.title"
      class="project-image"
    >
    <div class="project-content">
      <h3 class="project-title">{{ project.title }}</h3>
      <p class="project-description">{{ project.description }}</p>
      <p class="tech-stack-text"><strong>Tech stack:</strong> {{ project.tech?.join(", ") }}</p>
      <div class="project-links">
        <a :href="project.liveUrl" target="_blank">🔗 Live Preview</a>
        <a :href="project.githubUrl" target="_blank">🐙 View Code</a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.project-card {
  background: var(--card-bg);
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.project-image {
  height: 200px;
  width: 100%;
  object-fit: cover;
}

.project-content {
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.project-description {
  color: #a7a7a7;
  font-size: 0.9rem;
  margin: 1rem 0;
  flex-grow: 1;
}

.tech-stack-text {
  font-size: 0.8rem;
  margin-bottom: 1.5rem;
}

.project-links {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
}
</style>
