
# ---------- Stage 1: build ----------
# Node only exists in this stage; none of it ships in the final image.
FROM node:20-alpine AS build
WORKDIR /app

# Copy manifests first so `npm ci` is cached until dependencies change.
COPY package.json package-lock.json ./
RUN npm ci

# Now copy the rest and build the static site.
COPY . .
RUN npm run build

# ---------- Stage 2: serve ----------
# Tiny production image: just nginx + the built static files (~50 MB).
FROM nginx:1.27-alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://localhost/ >/dev/null 2>&1 || exit 1
CMD ["nginx", "-g", "daemon off;"]
