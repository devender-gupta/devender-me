# API Catalog

/.well-known/api-catalog returns an application/linkset+json document.

It advertises:

- service-desc: /openapi.json
- service-doc: /docs/api
- status: /api/health

This helps automated clients discover the site's API surface.
