# Docker — efficient containerization

This site is static, so the container's job is just: build once, serve the files
with a tiny web server. The `Dockerfile` uses a **multi-stage build** so none of
the Node/npm build tooling ends up in the shipped image.

## What makes it efficient

- **Two stages.** Stage 1 (`node:20-alpine`) installs deps and runs the build.
  Stage 2 (`nginx:1.27-alpine`) copies only the built `dist/` output. The final
  image is ~50 MB instead of ~1 GB — none of `node_modules` ships.
- **Layer caching.** `package.json` + `package-lock.json` are copied and
  `npm ci` runs *before* the rest of the source. Editing a component doesn't
  bust the dependency layer, so rebuilds are fast.
- **`.dockerignore`** keeps `node_modules`, `.git`, docs, and `dist` out of the
  build context — smaller, faster builds.
- **Alpine base + nginx** for a minimal, production-grade static server with
  gzip and long-lived caching of hashed assets (see `nginx.conf`).
- **Healthcheck** so orchestrators (Cloud Run, Fly.io, ECS, Kubernetes) know if
  the container is alive.

## Build & run

```bash
# build the image
docker build -t sujay-portfolio:latest .

# run it, mapping container port 80 to localhost:8080
docker run --rm -p 8080:80 sujay-portfolio:latest
# open http://localhost:8080
```

Check the size:

```bash
docker images sujay-portfolio:latest
```

## Optional: docker compose

```yaml
# compose.yaml
services:
  web:
    build: .
    ports:
      - "8080:80"
```

```bash
docker compose up --build
```

## Should you deploy the portfolio with Docker?

For **this** site, Vercel (see DEPLOY.md) is simpler and free — a static CDN
needs no container. Reach for this image when you want to host on a container
platform (Google Cloud Run, Fly.io, AWS ECS, a VPS) or to show Docker fluency.

> Higher-impact move: apply this same multi-stage pattern to your **AI projects**
> (DocuMind, AutoHub) so a recruiter can `docker run` a live demo in one command.
> A containerized, one-command RAG demo says more than a Dockerized static page.
