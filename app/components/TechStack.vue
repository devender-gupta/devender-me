<template>
    <section class="tech-section container">
        <div class="text-center">
            <h2 class="section-title">My Tech Stack</h2>
            <p class="section-subtitle">Technologies I’ve been working with recently</p>
        </div>

        <div class="tech-grid">
            <div v-for="tech in techData" :key="tech.name" class="tech-item">
                <Icon :name="tech.icon" class="tech-icon" :size="75" />
            </div>
        </div>
    </section>
</template>

<script setup>
const { data: user } = await useAsyncData('user', () =>
    queryCollection('user').first()
)
const techData = computed(() => user.value?.tech_stack || [])
</script>

<style scoped>
.tech-section {
    padding: 80px 0;
}

.section-title {
    font-size: 2.5rem;
    margin-bottom: 10px;
}

.section-subtitle {
    color: #A7A7A7;
    margin-bottom: 50px;
}

.tech-grid {
    display: grid;
    /* 6 columns as per your Figma/Screenshot */
    grid-template-columns: repeat(6, 1fr);
    gap: 40px;
    justify-items: center;
    align-items: center;
}

.tech-icon {
    font-size: 80px;
    /* Adjust size to match design */
    filter: grayscale(20%);
    transition: transform 0.3s ease, filter 0.3s ease;
}

.tech-icon:hover {
    transform: scale(1.1);
    filter: grayscale(0%);
}

/* Responsive: 4 columns on tablet, 3 on mobile */
@media (max-width: 768px) {
    .tech-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

@media (max-width: 480px) {
    .tech-grid {
        grid-template-columns: repeat(3, 1fr);
    }
}
</style>