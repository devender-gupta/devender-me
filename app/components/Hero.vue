<template>
  <section class="hero container">
    <div class="hero-content">
      <h1 class="hero-text">
        Hi 👋,<br >
        My name is<br >
        <span class="gradient-text">{{ user.name }}</span
        ><br >
        {{ user.introduction }}
      </h1>
    </div>
    <div class="hero-image">
      <div class="profile-outer-ring">
        <NuxtImg
          src="/devender-gupta.png"
          alt="Devender Gupta"
          width="350"
          height="350"
          format="webp"
          preload
          class="profile-img-transparent"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
const { data: user } = await useAsyncData("user-hero", () => queryCollection("user").first())
</script>

<style scoped>
.hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6rem 0;
}

.hero-text {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.1;
  color: var(--text-heading);
}

/* 1. This handles the Blue-to-Pink Outer Ring */
.profile-outer-ring {
  display: flex;
  align-items: center;
  justify-content: center;
  /* colorful gradient ring from your design */
  background: linear-gradient(180deg, var(--secondary-accent) 0%, var(--primary-accent) 100%);
  border-radius: 50%;
  width: 350px;
  height: 350px;
  /* 2. Middle Layer Gap: 
       This padding creates the space for the colorful ring to show */
  padding: 6px;
  box-sizing: border-box;
  /* Crucial for Nuxt 4 to maintain width */
}

/* 3. This handles your Photo AND its internal Black-to-White Gradient */
.profile-img-transparent {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;

  /* NEW: This adds the Black to White gradient BEHIND your transparent photo */
  background: linear-gradient(180deg, var(--bg-dark) 0%, var(--bg-white) 100%);

  /* Pro Tip: Ensure the image is cropped tightly in Nuxt */
  border: none;
  /* Removes any previous border attempts */
}
</style>
