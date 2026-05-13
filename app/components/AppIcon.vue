<template>
  <Icon :name="name" :size="size" :style="iconStyle" />
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: [String, Number],
    default: 24
  },
  iconColor: {
    type: String,
    default: "currentColor"
  },
  backgroundColor: {
    type: String,
    default: ""
  }
})

const iconStyle = computed(() => ({
  color: props.iconColor,
  ...(props.backgroundColor ? { backgroundColor: props.backgroundColor } : {})
}))
</script>
