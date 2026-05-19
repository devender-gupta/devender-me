<template>
  <div class="container api-docs">
    <section class="hero">
      <p class="eyebrow">Agent Discovery</p>
      <h1>API and discovery docs</h1>
      <p>
        This site exposes a small discovery surface for agents, including Link headers, markdown
        negotiation, an API catalog, and health/status endpoints.
      </p>
    </section>

    <section class="grid">
      <article class="card">
        <h2>Endpoints</h2>
        <ul>
          <li><a href="/.well-known/api-catalog">/.well-known/api-catalog</a></li>
          <li><a href="/openapi.json">/openapi.json</a></li>
          <li><a href="/api/health">/api/health</a></li>
          <li><a href="/ai.txt">/ai.txt</a></li>
        </ul>
      </article>

      <article class="card">
        <h2>Agent notes</h2>
        <p>
          The homepage advertises discovery resources with RFC 8288 Link headers, and it returns
          markdown when the request asks for Accept: text/markdown.
        </p>
        <p>robots.txt also declares content preferences with Content-Signal directives.</p>
      </article>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: "API Docs | Devender Gupta",
  meta: [
    { name: "description", content: "Discovery and API documentation for the portfolio site." }
  ]
})
</script>

<style scoped>
.api-docs {
  padding-block: var(--space-16);
}

.hero {
  max-width: 44rem;
  margin-bottom: var(--space-12);
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 0.75rem;
  color: var(--color-text-muted);
  margin-bottom: var(--space-3);
}

.hero h1 {
  margin: 0 0 var(--space-4);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: var(--space-6);
}

.card {
  padding: var(--space-6);
  border: var(--border-subtle);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
}

.card h2 {
  margin-top: 0;
}

.card ul {
  padding-left: 1.25rem;
  margin: 0;
}
</style>
