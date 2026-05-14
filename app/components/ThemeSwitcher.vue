<template>
  <button
    class="theme-switcher"
    :aria-label="`Theme: ${colorMode.preference}. Switch to ${nextMode}`"
    :title="`Current: ${colorMode.preference} mode`"
    @click="cycle"
  >
    <AppIcon :name="icon" />
  </button>
</template>

<script setup>
const colorMode = useColorMode()

const modes = ["system", "light", "dark"]

const cycle = () => {
  const idx = modes.indexOf(colorMode.preference)
  colorMode.preference = modes[(idx + 1) % modes.length]
}

const icon = computed(() => {
  if (colorMode.preference === "light") return "uil:sun"
  if (colorMode.preference === "dark") return "uil:moon"
  return "uil:desktop"
})

const nextMode = computed(() => {
  const idx = modes.indexOf(colorMode.preference)
  return modes[(idx + 1) % modes.length]
})
</script>

<style scoped>
.theme-switcher {
  background: transparent;
  border: var(--border-subtle);
  cursor: pointer;
  padding: var(--space-1);
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
  font-size: 1.15rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  transition:
    background-color var(--duration-base) var(--easing-standard),
    border-color var(--duration-base) var(--easing-standard),
    color var(--duration-base) var(--easing-standard),
    transform var(--duration-base) var(--easing-standard);
}

.theme-switcher:hover {
  background: rgba(var(--color-white-rgb), 0.08);
  border-color: var(--color-primary);
  color: var(--color-white);
  transform: translateY(-1px);
}
</style>
