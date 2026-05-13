<template>
    <div>
        <AppHeader />
        <AppHero />

        <TechStack />

        <section class="projects-section container">
            <div class="section-heading">
                <h2>Projects</h2>
                <p>Things I’ve built so far</p>
            </div>

            <div class="projects-grid">
                <ProjectCard v-for="project in projects" :key="project.path" :project="project" />
            </div>
        </section>
    </div>
</template>

<script setup>
const { data: projects } = await useAsyncData('projects', () =>
    queryCollection('projects').all()
)
</script>

<style scoped>
.section-heading {
    text-align: center;
    margin-bottom: 4rem;
}

.section-heading h2 {
    font-size: 2.5rem;
}

.projects-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
    padding-bottom: 5rem;
}

@media (max-width: 1024px) {
    .projects-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 768px) {
    .projects-grid {
        grid-template-columns: 1fr;
    }

    .hero {
        flex-direction: column;
        text-align: center;
    }
}
</style>