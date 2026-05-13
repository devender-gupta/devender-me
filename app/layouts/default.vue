<template>
  <div class="app-container">
    <AppHeader />

    <main class="main-content">
      <slot />
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* Ensures footer stays at the bottom on short pages */
}

.main-content {
  flex: 1;
  /* Pushes the footer down if content is sparse */
}
</style>
