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
const { data: user } = await useAsyncData("user-footer", () => queryCollection("user").first())
</script>

<style scoped>
.contact-section {
  padding: 10rem 0;
  text-align: center;
}

.contact-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: var(--text-heading);
  margin-bottom: 1rem;
  letter-spacing: -1px;
}

.contact-email {
  font-size: 3.5rem;
  font-weight: 800;
  text-decoration: none;
  display: block;
}

/* Responsive */
@media (max-width: 768px) {
  .contact-title,
  .contact-email {
    font-size: 2rem;
  }
}
</style>
