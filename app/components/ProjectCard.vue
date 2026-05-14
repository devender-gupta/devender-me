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
  background: #212121;
  /* Slightly lighter than pure black */
  border-radius: 16px;
  overflow: hidden;

  /* height: 650px; */
  /* Fixed height for all cards to ensure consistency */
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition:
    transform 0.3s ease,
    border-color 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  /* Let the grid handle the height */
  min-height: 600px;
}

.project-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary-accent);
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
  background: linear-gradient(to top, #212121, transparent);
}

.project-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  /* Contains the scroll area */
}

.header-meta {
  margin-bottom: 1rem;
}

.project-title {
  font-size: 1.4rem;
  color: #fff;
  margin: 0;
}

.project-company {
  color: var(--primary-accent);
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 4px;
}

.project-date {
  color: #666;
  font-size: 0.8rem;
}

/* THE FIX: Scrollable area for variable content */
.scroll-area {
  flex: 1;
  overflow-y: auto;
  padding-right: 8px;
  margin-bottom: 1rem;
}

/* Custom Scrollbar for a premium look */
.scroll-area::-webkit-scrollbar {
  width: 4px;
}

.scroll-area::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 10px;
}

.project-description {
  color: #a7a7a7;
  font-size: 0.85rem;
  line-height: 1.6;
  margin-bottom: 1.2rem;
}

.tech-stack-text {
  font-size: 0.75rem;
  color: #ccc;
  background: rgba(255, 255, 255, 0.03);
  padding: 8px;
  border-radius: 6px;
  margin-bottom: 1rem;
}

.label {
  font-weight: bold;
  color: #fff;
}

.list-title {
  font-size: 0.85rem;
  color: #eee;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.custom-list {
  padding-left: 1.2rem;
  margin: 0 0 1rem 0;
  color: #a7a7a7;
  font-size: 0.85rem;
}

.custom-list li {
  margin-bottom: 6px;
}

.project-links {
  display: flex;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #333;
}

.link-btn {
  flex: 1;
  text-align: center;
  padding: 8px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.8rem;
  font-weight: 500;
  transition: all 0.2s;
  color: #fff;
  background: #333;
}

.link-btn:hover {
  background: #444;
}

.link-btn.preview {
  background: linear-gradient(90deg, #13b0f5, #e70faa);
}
</style>
