<template>
  <div class="about-page container">
    <section class="section-block">
      <h2 class="section-title">About Me</h2>
      <p class="about-text">{{ user.summary }}</p>
      <a
        href="/Devender_Gupta_Resume.pdf"
        class="btn btn-primary resume-button"
        download
        target="_blank"
        >Download CV</a
      >
    </section>

    <section class="section-block">
      <h2 class="section-title">Work Experience</h2>
      <div class="timeline">
        <div v-for="job in experiences" :key="job.position" class="timeline-item">
          <div class="timeline-header">
            <h3 class="item-title">{{ job.position }}</h3>
            <span class="badge" :class="job.type.toLowerCase()">{{ job.type }}</span>
          </div>
          <div class="timeline-meta">
            <span> <Icon name="uil:building" /> {{ job.company }} </span>
            <span> <Icon name="uil:location-point" /> {{ job.location }} </span>
            <span> <Icon name="uil:calendar-alt" /> {{ job.date }} </span>
          </div>
          <hr class="divider" >
        </div>
      </div>
    </section>

    <section v-if="showEducation" class="section-block">
      <h2 class="section-title">Education</h2>
      <div class="timeline">
        <div v-for="edu in user.education" :key="edu.degree" class="timeline-item">
          <div class="timeline-header">
            <h3 class="item-title">{{ edu.degree }}</h3>
            <span class="badge full-time">Full Time</span>
          </div>
          <div class="timeline-meta">
            <span> <Icon name="uil:graduation-cap" /> {{ edu.institution }} </span>
            <span> <Icon name="uil:calendar-alt" /> {{ edu.date }} </span>
          </div>
          <hr class="divider" >
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const { data: user } = await useAsyncData("user-about", () => queryCollection("user").first())
const { data: experiences } = await useAsyncData("experiences", () =>
  queryCollection("experiences").order("id", "DESC").all()
)
const showEducation = false
</script>

<style scoped>
.about-page {
  padding-block: var(--space-16);
}

@media (min-width: 768px) {
  .about-page {
    padding-block: var(--space-16);
  }
}

.section-block {
  margin-bottom: var(--space-16);
  max-width: 50rem;
}

.about-text {
  color: var(--color-text-muted);
  line-height: 1.8;
  font-size: 1.1rem;
}

.timeline-item {
  margin-bottom: 2rem;
}

.timeline-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-title {
  font-size: 1.25rem;
  color: var(--color-text);
  font-weight: var(--font-weight-medium);
}

.badge {
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-pill);
  font-size: 0.75rem;
  font-weight: var(--font-weight-semibold);
  background: var(--color-success-bg);
  color: var(--color-success-text);
}

.badge.full-time {
  background: var(--color-success-bg);
  color: var(--color-success-text);
}

.timeline-meta {
  display: flex;
  gap: var(--space-8);
  margin: var(--space-2) 0 var(--space-6);
  color: var(--color-text-muted);
  font-size: 0.85rem;
  flex-wrap: wrap;
}

@media (max-width: 480px) {
  .timeline-meta {
    gap: var(--space-2) var(--space-4);
    flex-direction: column;
  }

  .timeline-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-2);
  }
}

.divider {
  border: 0;
  border-top: var(--border-strong);
}

.resume-button {
  margin-top: var(--space-8);
}
</style>
