<template>
  <div class="project-card">
    <div class="image-wrapper">
      <NuxtImg
        :src="'/project-placeholder.webp'"
        :alt="project.title"
        class="project-image"
        loading="lazy"
      />
    </div>

    <div class="project-content">
      <div class="header-meta">
        <h3 class="project-title">{{ project.title }}</h3>
        <p v-if="project.company" class="project-company">{{ project.company }}</p>
        <p v-if="project.date" class="project-date">{{ project.date }}</p>
      </div>

      <p class="project-description">{{ project.description }}</p>

      <p class="tech-stack-text">
        <span class="label">Tech stack:</span> {{ project.tech?.join(", ") }}
      </p>

      <div class="project-details">
        <div v-if="project.roles?.length" class="project-list-block">
          <h4 class="list-title">Roles & Responsibilities</h4>
          <ul class="custom-list">
            <li v-for="role in project.roles" :key="role">{{ role }}</li>
          </ul>
        </div>

        <div v-if="project.achievements?.length" class="project-list-block">
          <h4 class="list-title">Achievements</h4>
          <ul class="custom-list success">
            <li v-for="achievement in project.achievements" :key="achievement">
              {{ achievement }}
            </li>
          </ul>
        </div>
      </div>

      <div class="project-links">
        <a
          v-if="project.preview_link"
          :href="project.preview_link"
          target="_blank"
          class="link-btn preview"
        >
          <span>Live Preview</span>
        </a>
        <a v-if="project.repo_link" :href="project.repo_link" target="_blank" class="link-btn code">
          <span>View Code</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  project: { type: Object, required: true }
})
</script>

<style scoped>
.project-card {
  display: grid;
  grid-template-columns: minmax(0, 40%) 1fr;
  gap: var(--space-10);
  width: 100%;
  height: 100%;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  border: var(--border-subtle);
  overflow: hidden;
  padding: var(--space-6);
}

@media (max-width: 900px) {
  .project-card {
    grid-template-columns: 1fr;
  }
}

.image-wrapper {
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  aspect-ratio: 4 / 3;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.project-content {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.header-meta {
  margin-bottom: var(--space-4);
}

.project-title {
  font-size: 1.75rem;
  color: var(--color-white);
  margin: 0;
}

.project-company {
  color: var(--color-primary);
  font-size: 0.95rem;
  font-weight: var(--font-weight-medium);
  margin-top: var(--space-1);
}

.project-date {
  color: var(--color-text-muted);
  font-size: 0.85rem;
}

.project-description {
  color: var(--color-text-muted);
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: var(--space-5);
}

.tech-stack-text {
  font-size: 0.8rem;
  color: var(--color-text);
  background: rgba(var(--color-white-rgb), 0.03);
  padding: var(--space-3);
  border-radius: var(--radius-sm);
  margin-bottom: var(--space-5);
}

.label {
  font-weight: bold;
  color: var(--color-white);
}

.project-details {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-6);
  margin-bottom: var(--space-5);
}

@media (max-width: 640px) {
  .project-details {
    grid-template-columns: 1fr;
  }
}

.list-title {
  font-size: 0.85rem;
  color: var(--color-heading);
  margin-bottom: var(--space-2);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.custom-list {
  padding-left: 1.2rem;
  margin: 0;
  color: var(--color-text-muted);
  font-size: 0.85rem;
}

.custom-list li {
  margin-bottom: var(--space-2);
}

.project-links {
  display: flex;
  gap: var(--space-4);
  padding-top: var(--space-4);
  margin-top: auto;
  border-top: 1px solid var(--color-surface-muted);
}

.link-btn {
  flex: 1;
  text-align: center;
  padding: var(--space-2);
  border-radius: var(--radius-md);
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: var(--font-weight-medium);
  transition: all var(--duration-fast) var(--easing-standard);
  color: var(--color-white);
  background: var(--color-surface-muted);
}

.link-btn:hover {
  background: var(--color-surface-soft);
}

.link-btn.preview {
  background: var(--gradient-brand);
}
</style>
