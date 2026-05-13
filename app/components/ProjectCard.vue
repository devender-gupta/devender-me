<template>
  <div class="project-card">
    <img :src="'/project-placeholder.jpg'" :alt="project.title" class="project-image" >
    <div class="project-content">
      <h3 class="project-title">{{ project.title }}</h3>
      <p v-if="project.company" class="project-company">{{ project.company }}</p>
      <p v-if="project.date" class="project-date">{{ project.date }}</p>
      <p class="project-description">{{ project.description }}</p>
      <p class="tech-stack-text"><strong>Tech stack:</strong> {{ project.tech?.join(", ") }}</p>

      <div v-if="project.roles?.length" class="project-list-block">
        <h4 class="project-list-title">Roles & Responsibilities</h4>
        <ul class="project-list">
          <li v-for="role in project.roles" :key="role">{{ role }}</li>
        </ul>
      </div>

      <div v-if="project.achievements?.length" class="project-list-block">
        <h4 class="project-list-title">Achievements</h4>
        <ul class="project-list">
          <li v-for="achievement in project.achievements" :key="achievement">{{ achievement }}</li>
        </ul>
      </div>

      <div class="project-links">
        <a v-if="project.preview_link" :href="project.preview_link" target="_blank">Live Preview</a>
        <a v-if="project.repo_link" :href="project.repo_link" target="_blank">🐙 View Code</a>
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

.project-date {
  color: #8d8d8d;
  font-size: 0.82rem;
  margin-top: 0.25rem;
}

.project-company {
  color: #bdbdbd;
  font-size: 0.85rem;
  margin-top: 0.35rem;
}

.tech-stack-text {
  font-size: 0.8rem;
  margin-bottom: 1rem;
}

.project-list-block {
  margin-bottom: 1rem;
}

.project-list-title {
  font-size: 0.85rem;
  margin-bottom: 0.4rem;
}

.project-list {
  margin: 0;
  padding-left: 1rem;
  color: #a7a7a7;
  font-size: 0.85rem;
}

.project-links {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
}
</style>
