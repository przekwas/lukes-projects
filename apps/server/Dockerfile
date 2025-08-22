# -------- Builder --------
FROM node:22-alpine AS builder
WORKDIR /app

# Enable corepack for npm workspaces reliability
RUN corepack enable

# Copy only manifests first (faster caching)
COPY package.json package-lock.json ./
COPY apps/server/package.json apps/server/
COPY packages/config/package.json packages/config/
COPY packages/db/package.json packages/db/

# Install deps for all workspaces
RUN npm ci

# Copy source
COPY tsconfig.base.json ./
COPY apps/server/tsconfig.json apps/server/
COPY packages/config/tsconfig.json packages/config/
COPY packages/db/tsconfig.json packages/db/
COPY apps/server/src apps/server/src
COPY packages/config/src packages/config/src
COPY packages/db/src packages/db/src

# Build the server (and any packages it depends on)
RUN npm run -w @lukes-projects/server build \
 && npm run -w @lukes-projects/config build \
 && npm run -w @lukes-projects/db build

# Prune dev deps to slim runtime
RUN npm prune --omit=dev --workspaces

# -------- Runtime --------
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# AWS Global RDS bundle (works for Lightsail PG)
ADD https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem /etc/ssl/certs/rds-ca-global.pem

# Copy node_modules and built artifacts
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/server/dist ./apps/server/dist
COPY --from=builder /app/apps/server/package.json ./apps/server/package.json
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["node", "apps/server/dist/main.js"]
