<template>
  <section class="hero container">
    <div class="hero-content">
      <h1 class="hero-text">
        Hi 👋,<br >
        My name is<br >
        <span class="gradient-text">{{ user.name }}</span
        >,<br >
        {{ user.introduction }}
      </h1>
    </div>
    <div class="hero-image">
      <div class="profile-outer-ring" :aria-label="user.designation">
        <img
          src="/devender-gupta.webp"
          width="350"
          height="350"
          alt="Devender Gupta"
          class="profile-img-transparent"
          loading="eager"
          fetchpriority="high"
          decoding="sync"
        >
        <div class="designation-tooltip" role="tooltip">
          <span class="designation-label">Role</span>
          <span class="designation-value">{{ user.designation }}</span>
        </div>
      </div>
      <div v-if="certificationBadges.length" class="certification-badges">
        <a
          v-for="cert in certificationBadges"
          :key="cert.name"
          :href="cert.credential_url"
          :title="cert.name"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            :src="cert.badge"
            :alt="`${cert.name} badge`"
            width="48"
            height="48"
            loading="lazy"
            class="certification-badge-item"
          >
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const MAX_CERTIFICATION_BADGES = 5

const { data: user } = await useAsyncData("user-hero", () => queryCollection("user").first())
const certificationBadges = computed(() =>
  (user.value?.certifications ?? []).filter((cert) => cert.badge).slice(0, MAX_CERTIFICATION_BADGES)
)
</script>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) auto;
  align-items: center;
  gap: var(--space-8);
  padding-block: var(--space-24);
}

.hero-text {
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: var(--font-weight-bold);
  line-height: 1.1;
  color: var(--color-heading);
}

@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    text-align: center;
    padding-block: var(--space-12);
  }

  .profile-outer-ring {
    width: 15.625rem;
    height: 15.625rem;
    margin-inline: auto;
  }
}

.profile-outer-ring {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-brand-vertical);
  border-radius: 50%;
  width: 21.875rem;
  height: 21.875rem;
  padding: 0.375rem;
  box-sizing: border-box;
}

.profile-img-transparent {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  background: var(--gradient-profile-bg);
  border: none;
}

.designation-tooltip {
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 35%) scale(0.98);
  display: inline-flex;
  flex-direction: column;
  gap: 0.125rem;
  min-width: 12rem;
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-pill);
  background: rgba(var(--color-bg-rgb), 0.92);
  border: var(--border-subtle);
  color: var(--color-white);
  text-align: center;
  box-shadow: var(--shadow-primary);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition:
    opacity var(--duration-base) var(--easing-standard),
    transform var(--duration-base) var(--easing-standard),
    visibility var(--duration-base) var(--easing-standard);
}

.designation-label {
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.designation-value {
  font-size: 0.95rem;
  font-weight: var(--font-weight-semibold);
}

.profile-outer-ring:hover .designation-tooltip,
.profile-outer-ring:focus-within .designation-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, 22%) scale(1);
}

@media (max-width: 768px) {
  .designation-tooltip {
    bottom: var(--space-2);
    transform: translate(-50%, 110%);
    min-width: 10.5rem;
  }

  .profile-outer-ring:hover .designation-tooltip,
  .profile-outer-ring:focus-within .designation-tooltip {
    transform: translate(-50%, 100%);
  }
}

.hero-image {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
}

.certification-badges {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-3);
}

.certification-badge-item {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: var(--color-bg);
  box-shadow: var(--shadow-primary);
  object-fit: contain;
  padding: 0.25rem;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .certification-badge-item {
    width: 2.5rem;
    height: 2.5rem;
  }
}
</style>
