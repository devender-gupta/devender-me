import withNuxt from "./.nuxt/eslint.config.mjs"

export default withNuxt({
  rules: {
    // Senior Dev preference: No unused variables allowed. Underscore-prefixed params are intentionally unused.
    "no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    // Allow single word component names like 'index.vue'
    "vue/multi-word-component-names": "off",
    // Force double quotes (matches your project style)
    quotes: ["error", "double"]
  }
})
