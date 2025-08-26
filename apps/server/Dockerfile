# ---------- Builder ----------
FROM node:22-alpine AS builder
WORKDIR /app

# Keep npm version consistent with your repo
RUN corepack enable && corepack prepare npm@10.8.2 --activate

# Copy manifests first for deterministic install
COPY package.json package-lock.json ./
COPY apps/server/package.json apps/server/
COPY packages/config/package.json packages/config/
COPY packages/db/package.json packages/db/
COPY packages/auth/package.json packages/auth/

# Install all workspace deps (root + targeted workspaces)
RUN npm ci --workspaces --include-workspace-root

# Copy tsconfig + sources
COPY tsconfig.base.json tsconfig.json ./
COPY drizzle.config.ts ./
COPY apps/server/tsconfig.json apps/server/
COPY apps/server/tsconfig.build.json apps/server/
COPY packages/config/tsconfig.json packages/config/
COPY packages/db/tsconfig.json packages/db/
COPY packages/auth/tsconfig.json packages/auth/
COPY apps/server/src apps/server/src
COPY packages/config/src packages/config/src
COPY packages/db/src packages/db/src
COPY packages/auth/src packages/auth/src

COPY drizzle ./drizzle

# Build (uses your root "build": "tsc -b")
RUN npm run build

# Prune dev deps for all workspaces
RUN npm prune --omit=dev --workspaces --include-workspace-root=false


# ---------- Runtime ----------
FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
# Optional: run DB migrations automatically if set to "true"
ENV MIGRATE_ON_START=false

# Non-root user
RUN addgroup -S app && adduser -S app -G app

# Copy node_modules + built artifacts + package.jsons
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

COPY --from=builder /app/apps/server/package.json ./apps/server/package.json
COPY --from=builder /app/apps/server/dist ./apps/server/dist

COPY --from=builder /app/packages/config/package.json ./packages/config/package.json
COPY --from=builder /app/packages/config/dist ./packages/config/dist

COPY --from=builder /app/packages/db/package.json ./packages/db/package.json
COPY --from=builder /app/packages/db/dist ./packages/db/dist

COPY --from=builder /app/packages/auth/package.json ./packages/auth/package.json
COPY --from=builder /app/packages/auth/dist ./packages/auth/dist

# Include drizzle migrations folder so migrate can run in-container
COPY --from=builder /app/drizzle ./drizzle

# Tiny entrypoint to optionally run migrations, then boot the API
COPY apps/server/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

USER app
EXPOSE 3000

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["node", "apps/server/dist/main.js"]
