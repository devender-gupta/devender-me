<template>
  <section class="projects-section container">
    <div class="section-heading text-center">
      <h2 class="section-title">Featured Projects</h2>
      <p class="section-subtitle">A snapshot of my latest engineering contributions.</p>
    </div>

    <div
      v-if="projects?.length"
      class="carousel"
      tabindex="0"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured projects"
      @keydown.left="goPrev"
      @keydown.right="goNext"
      @keydown.home.prevent="goTo(0)"
      @keydown.end.prevent="goTo(lastIndex)"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    >
      <div class="carousel-viewport">
        <div class="carousel-track" :style="{ transform: `translateX(-${activeIndex * 100}%)` }">
          <div
            v-for="project in projects"
            :key="project.path"
            class="carousel-slide"
            :aria-hidden="project !== activeProject"
          >
            <ProjectCard :project="project" />
          </div>
        </div>
      </div>

      <div v-if="projects.length > 1" class="carousel-controls">
        <p class="carousel-status" aria-live="polite">
          {{ activeIndex + 1 }} / {{ projects.length }}
        </p>

        <div class="carousel-dots" role="tablist" aria-label="Project slide selector">
          <button
            v-for="(project, index) in projects"
            :key="project.path"
            type="button"
            role="tab"
            class="dot"
            :class="{ active: index === activeIndex }"
            :aria-label="`Go to project ${index + 1}: ${project.title}`"
            :aria-current="index === activeIndex"
            @click="goTo(index)"
          />
        </div>

        <div class="carousel-arrows">
          <button
            class="carousel-arrow"
            type="button"
            aria-label="Previous project"
            @click="goPrev"
          >
            <Icon name="uil:angle-left-b" />
          </button>
          <button class="carousel-arrow" type="button" aria-label="Next project" @click="goNext">
            <Icon name="uil:angle-right-b" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const monthMap = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11
}

function parseDatePart(datePart) {
  if (!datePart) return null

  const normalized = datePart.trim().toLowerCase()
  if (["present", "current", "now", "ongoing"].includes(normalized)) {
    return Number.POSITIVE_INFINITY
  }

  const monthYearMatch = normalized.match(/^([a-z]{3,9})\s+(\d{4})$/)
  if (monthYearMatch) {
    const month = monthMap[monthYearMatch[1].slice(0, 3)]
    const year = Number(monthYearMatch[2])
    if (month !== undefined) {
      return Date.UTC(year, month, 1)
    }
  }

  const yearMatch = normalized.match(/^(\d{4})$/)
  if (yearMatch) {
    return Date.UTC(Number(yearMatch[1]), 0, 1)
  }

  return null
}

function getProjectSortValue(project) {
  const dateRange = project.date ?? ""
  const [startPart, endPart] = dateRange.split(" - ").map((item) => item.trim())
  return parseDatePart(endPart) ?? parseDatePart(startPart) ?? 0
}

const { data: projects } = await useAsyncData("projects", async () => {
  const items = await queryCollection("projects").where("display", "==", "true").all()
  return [...items].sort((a, b) => getProjectSortValue(b) - getProjectSortValue(a))
})

const activeIndex = ref(0)
const activeProject = computed(() => projects.value?.[activeIndex.value])
const lastIndex = computed(() => {
  const total = projects.value?.length ?? 0
  return Math.max(total - 1, 0)
})

watch(
  () => projects.value?.length ?? 0,
  (total) => {
    if (!total) {
      activeIndex.value = 0
      return
    }

    if (activeIndex.value >= total) {
      activeIndex.value = total - 1
    }
  }
)

function goTo(index) {
  const total = projects.value?.length ?? 0
  if (!total) return
  activeIndex.value = (index + total) % total
}

function goPrev() {
  goTo(activeIndex.value - 1)
}

function goNext() {
  goTo(activeIndex.value + 1)
}

let touchStartX = 0

function onTouchStart(event) {
  touchStartX = event.changedTouches[0].clientX
}

function onTouchEnd(event) {
  const deltaX = event.changedTouches[0].clientX - touchStartX
  const SWIPE_THRESHOLD = 40
  if (deltaX > SWIPE_THRESHOLD) goPrev()
  else if (deltaX < -SWIPE_THRESHOLD) goNext()
}
</script>

<style scoped>
.projects-section {
  padding-block: var(--space-20);
}

.carousel {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  outline: none;
  touch-action: pan-y;
}

.carousel-viewport {
  overflow: hidden;
  border-radius: var(--radius-lg);
}

.carousel-track {
  display: flex;
  align-items: stretch;
  transition: transform var(--duration-base, 0.4s) var(--easing-standard, ease);
}

.carousel-slide {
  flex: 0 0 100%;
  min-width: 0;
  display: flex;
}

.carousel-controls {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.carousel-status {
  margin: 0;
  min-width: 4.25rem;
  font-size: 0.76rem;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-muted);
  letter-spacing: 0.08em;
}

.carousel-dots {
  flex: 1;
  display: flex;
  gap: var(--space-2);
  overflow-x: auto;
  scrollbar-width: none;
}

.carousel-dots::-webkit-scrollbar {
  display: none;
}

.carousel-arrows {
  display: flex;
  gap: var(--space-2);
}

.carousel-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: var(--border-subtle);
  background: var(--color-surface);
  color: var(--color-white);
  font-size: 1.25rem;
  cursor: pointer;
  transition:
    transform var(--duration-fast) var(--easing-standard),
    background var(--duration-fast) var(--easing-standard),
    border-color var(--duration-fast) var(--easing-standard);
}

.carousel-arrow:hover {
  background: var(--color-surface-soft);
  border-color: var(--color-primary);
  transform: translateY(-1px);
}

.dot {
  width: 0.7rem;
  height: 0.625rem;
  flex: 0 0 auto;
  border-radius: 50%;
  border: none;
  padding: 0;
  background: var(--color-surface-muted);
  cursor: pointer;
  transition: background var(--duration-fast) var(--easing-standard);
}

.dot.active {
  background: var(--gradient-brand);
  width: 1.35rem;
  border-radius: var(--radius-pill);
}

@media (max-width: 1024px) {
  .carousel-controls {
    flex-wrap: wrap;
  }

  .carousel-dots {
    order: 3;
    flex-basis: 100%;
  }
}

@media (max-width: 640px) {
  .projects-section {
    padding-block: var(--space-16);
  }

  .carousel-controls {
    gap: var(--space-2);
  }

  .carousel-status {
    min-width: auto;
  }

  .carousel-arrow {
    width: 2.25rem;
    height: 2.25rem;
    font-size: 1.1rem;
  }
}
</style>
