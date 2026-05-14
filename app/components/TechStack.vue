<template>
  <section class="tech-section container">
    <div class="text-center">
      <h2 class="section-title">My Tech Stack</h2>
      <p class="section-subtitle">
        The primary technologies I leverage to deliver robust digital solutions.
      </p>
    </div>

    <div class="tech-grid">
      <div v-for="tech in techData" :key="tech.name" class="tech-item">
        <Icon :name="tech.icon" class="tech-icon" :size="75" />
      </div>
    </div>
  </section>
</template>

<script setup>
const { data: user } = await useAsyncData("user-tech", () => queryCollection("user").first())
const techData = computed(() => user.value?.tech_stack || [])
</script>

<style scoped>
.tech-section {
  padding-block: var(--space-20);
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: var(--space-10);
  justify-items: center;
  align-items: center;
}

.tech-icon {
  font-size: clamp(3.125rem, 6vw, 5rem);
  filter: grayscale(20%);
  transition:
    transform var(--duration-base) var(--easing-standard),
    filter var(--duration-base) var(--easing-standard);
}

.tech-icon:hover {
  transform: scale(1.08);
  filter: grayscale(0%);
}

@media (max-width: 768px) {
  .tech-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-5);
  }
}

@media (max-width: 480px) {
  .tech-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
