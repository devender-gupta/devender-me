<template>
  <div class="project-card">
    <div class="image-wrapper">
      <NuxtImg
        :src="'/project-placeholder.jpg'"
        :alt="project.title"
        class="project-image"
        loading="lazy"
      />
      <div class="image-overlay" />
    </div>

    <div class="project-content">
      <div class="header-meta">
        <h3 class="project-title">{{ project.title }}</h3>
        <p v-if="project.company" class="project-company">{{ project.company }}</p>
        <p v-if="project.date" class="project-date">{{ project.date }}</p>
      </div>

      <div class="scroll-area">
        <p class="project-description">{{ project.description }}</p>

        <p class="tech-stack-text">
          <span class="label">Tech stack:</span> {{ project.tech?.join(", ") }}
        </p>

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
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
  border: var(--border-subtle);
  transition:
    transform var(--duration-base) var(--easing-standard),
    border-color var(--duration-base) var(--easing-standard);
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 37.5rem;
}

.project-card:hover {
  transform: translateY(-5px);
  border-color: var(--color-primary);
}

.image-wrapper {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.project-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background: linear-gradient(to top, var(--color-surface), transparent);
}

.project-content {
  padding: var(--space-6);
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.header-meta {
  margin-bottom: var(--space-4);
}

.project-title {
  font-size: 1.4rem;
  color: var(--color-white);
  margin: 0;
}

.project-company {
  color: var(--color-primary);
  font-size: 0.9rem;
  font-weight: var(--font-weight-medium);
  margin-top: var(--space-1);
}

.project-date {
  color: var(--color-text-dim);
  font-size: 0.8rem;
}

.scroll-area {
  flex: 1;
  overflow-y: auto;
  padding-right: var(--space-2);
  margin-bottom: var(--space-4);
}

.scroll-area::-webkit-scrollbar {
  width: 0.25rem;
}

.scroll-area::-webkit-scrollbar-thumb {
  background: var(--color-surface-muted);
  border-radius: var(--radius-pill);
}

.project-description {
  color: var(--color-text-muted);
  font-size: 0.85rem;
  line-height: 1.6;
  margin-bottom: var(--space-5);
}

.tech-stack-text {
  font-size: 0.75rem;
  color: var(--color-text);
  background: rgba(var(--color-white-rgb), 0.03);
  padding: var(--space-2);
  border-radius: var(--radius-sm);
  margin-bottom: var(--space-4);
}

.label {
  font-weight: bold;
  color: var(--color-white);
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
  margin: 0 0 var(--space-4) 0;
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
