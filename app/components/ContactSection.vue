<template>
  <section class="contact-section container">
    <div class="contact-card">
      <h2 class="contact-title">For any questions please mail me:</h2>
      <a :href="`mailto:${user.email}`" class="contact-email gradient-text">
        {{ user.email }}
      </a>
    </div>
  </section>
</template>

<script setup>
const { data: user } = await useAsyncData("user-contact", () => queryCollection("user").first())
</script>

<style scoped>
.contact-section {
  padding-block: var(--space-40);
  text-align: center;
}

.contact-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: var(--font-weight-extrabold);
  color: var(--color-heading);
  margin-bottom: var(--space-4);
  letter-spacing: -0.04em;
}

.contact-email {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: var(--font-weight-extrabold);
  text-decoration: none;
  display: block;
}

@media (max-width: 768px) {
  .contact-email {
    font-size: 1.5rem;
    /* Forces a smaller size on mobile */
    line-height: 1.2;
  }
}

@media (max-width: 768px) {
  .contact-section {
    padding-block: var(--space-24);
  }
}
</style>
