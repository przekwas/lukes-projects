# -------- Builder --------
FROM node:22-alpine AS builder
WORKDIR /app
RUN corepack enable

# Manifests first
COPY package.json package-lock.json ./
COPY apps/server/package.json apps/server/
COPY packages/config/package.json packages/config/
COPY packages/db/package.json packages/db/

RUN npm ci

# Copy tsconfig + sources
COPY tsconfig.base.json tsconfig.json ./
COPY apps/server/tsconfig.json apps/server/
COPY apps/server/tsconfig.build.json apps/server/
COPY packages/config/tsconfig.json packages/config/
COPY packages/db/tsconfig.json packages/db/
COPY apps/server/src apps/server/src
COPY packages/config/src packages/config/src
COPY packages/db/src packages/db/src

# Build via root (tsc -b) or workspaces
RUN npm run build  # uses "tsc -b" or "npm run -ws build" depending on your choice

# Prune dev deps
RUN npm prune --omit=dev --workspaces

# -------- Runtime --------
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# node_modules + built artifacts
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/server/dist ./apps/server/dist
COPY --from=builder /app/apps/server/package.json ./apps/server/package.json
COPY --from=builder /app/packages/config/dist ./packages/config/dist
COPY --from=builder /app/packages/config/package.json ./packages/config/package.json
COPY --from=builder /app/packages/db/dist ./packages/db/dist
COPY --from=builder /app/packages/db/package.json ./packages/db/package.json
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["node", "apps/server/dist/main.js"]