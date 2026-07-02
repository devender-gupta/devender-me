<template>
  <div class="project-card">
    <header class="header-meta">
      <p v-if="project.date" class="project-date">{{ project.date }}</p>
      <h3 class="project-title">{{ project.title }}</h3>
      <p v-if="project.company" class="project-company">{{ project.company }}</p>
    </header>

    <p class="project-description">{{ project.description }}</p>

    <div v-if="project.tech?.length" class="tech-stack">
      <h4 class="section-title">Tech Stack</h4>
      <ul class="tech-list">
        <li v-for="tech in project.tech" :key="tech" class="tech-pill">{{ tech }}</li>
      </ul>
    </div>

    <div class="project-details">
      <div v-if="project.roles?.length" class="project-list-block">
        <h4 class="section-title">Roles & Responsibilities</h4>
        <ul class="custom-list">
          <li v-for="role in project.roles" :key="role">{{ role }}</li>
        </ul>
      </div>

      <div v-if="project.achievements?.length" class="project-list-block">
        <h4 class="section-title">Achievements</h4>
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
        rel="noopener noreferrer"
        class="link-btn preview"
      >
        <span>Live Preview</span>
      </a>
      <a
        v-if="project.repo_link"
        :href="project.repo_link"
        target="_blank"
        rel="noopener noreferrer"
        class="link-btn code"
      >
        <span>View Code</span>
      </a>
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
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  width: 100%;
  height: 100%;
  background:
    linear-gradient(180deg, rgba(var(--color-white-rgb), 0.03) 0%, transparent 35%),
    var(--color-surface);
  border-radius: var(--radius-lg);
  border: var(--border-strong);
  overflow: hidden;
  padding: var(--space-6);
  min-width: 0;
}

.header-meta {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.project-title {
  font-size: clamp(1.4rem, 1rem + 1vw, 1.85rem);
  line-height: 1.2;
  color: var(--color-white);
  margin: 0;
}

.project-company {
  color: var(--color-heading);
  font-size: 0.92rem;
  font-weight: var(--font-weight-medium);
  margin: 0;
}

.project-date {
  align-self: flex-start;
  color: var(--color-primary);
  font-size: 0.75rem;
  font-weight: var(--font-weight-semibold);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0;
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-pill);
  background: rgba(19, 176, 245, 0.12);
}

.project-description {
  color: var(--color-text);
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

.tech-stack {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin: 0;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

.tech-pill {
  color: var(--color-white);
  font-size: 0.75rem;
  font-weight: var(--font-weight-medium);
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-pill);
  border: var(--border-subtle);
  background: rgba(var(--color-white-rgb), 0.05);
}

.project-details {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-5);
}

@media (max-width: 640px) {
  .project-card {
    padding: var(--space-5);
    gap: var(--space-4);
  }

  .project-details {
    grid-template-columns: 1fr;
  }
}

.section-title {
  font-size: 0.72rem;
  color: var(--color-heading);
  margin: 0 0 var(--space-2) 0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.custom-list {
  padding-left: 1.05rem;
  margin: 0;
  color: var(--color-text);
  font-size: 0.86rem;
  line-height: 1.55;
}

.custom-list li {
  margin-bottom: var(--space-1);
}

.success li::marker {
  color: var(--color-primary);
}

.project-links {
  display: flex;
  gap: var(--space-3);
  padding-top: var(--space-3);
  margin-top: auto;
  border-top: 1px solid var(--color-surface-muted);
}

.link-btn {
  flex: 1;
  text-align: center;
  padding: var(--space-3);
  border-radius: var(--radius-md);
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: var(--font-weight-medium);
  transition:
    transform var(--duration-fast) var(--easing-standard),
    background var(--duration-fast) var(--easing-standard),
    border-color var(--duration-fast) var(--easing-standard);
  color: var(--color-white);
  background: var(--color-surface-muted);
  border: var(--border-subtle);
}

.link-btn:hover {
  background: var(--color-surface-soft);
  transform: translateY(-1px);
}

.link-btn.preview {
  background: var(--gradient-brand);
  border-color: transparent;
}
</style>
