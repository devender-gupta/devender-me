<template>
  <div class="about-page container">
    <section class="section-block">
      <h2 class="section-title">About Me</h2>
      <p class="about-text">{{ user.summary }}</p>
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

    <section class="section-block">
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
  queryCollection("experiences").all()
)
</script>

<style scoped>
.about-page {
  padding: 4rem 0;
}

.section-block {
  margin-bottom: 4rem;
  max-width: 800px;
}

.about-text {
  color: #a7a7a7;
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
  color: #ccc;
  font-weight: 500;
}

.badge {
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 600;
  background: #d7ffe0;
  color: #0f5e2c;
  /* Default for Internship */
}

.badge.full-time {
  background: #d7ffe0;
  color: #0f5e2c;
}

.timeline-meta {
  display: flex;
  gap: 2rem;
  margin: 0.5rem 0 1.5rem;
  color: #a7a7a7;
  font-size: 0.85rem;
}

.divider {
  border: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
