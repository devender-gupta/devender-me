if (!Object.groupBy) {
  Object.groupBy = (items, classifier) => {
    return items.reduce((groups, item, index) => {
      const key = classifier(item, index)
      const normalizedKey = String(key)

      if (!groups[normalizedKey]) {
        groups[normalizedKey] = []
      }

      groups[normalizedKey].push(item)
      return groups
    }, {})
  }
}

const withNuxt = (await import("./.nuxt/eslint.config.mjs")).default

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
