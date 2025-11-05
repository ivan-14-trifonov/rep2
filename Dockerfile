ARG NODE_REPO=docker.io/oven/bun:1.3-alpine
ARG NODE_LOCK=bun.lock
ARG NPM=bun
ARG NODE=bun

# ARG NODE_REPO=node:20-alpine
# ARG NODE_LOCK=pnpm-lock.yaml
# ARG NPM=pnpm
# ARG NODE=pnpm


FROM ${NODE_REPO} AS deps
ARG NODE_LOCK
ARG NPM
WORKDIR /app
COPY package.json ${NODE_LOCK} ./
COPY @imarketplace/ @imarketplace/
RUN ${NPM} install --frozen-lockfile



FROM deps AS builder
ARG NPM
ARG NEXT_PUBLIC_BASE_PATH
ARG NEXT_PUBLIC_BACKEND_URL
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_BASE_PATH=${NEXT_PUBLIC_BASE_PATH}
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}

COPY package.json next.config.js postcss.config.js tsconfig.json components.json eslint.config.js ./
COPY src/ src/
COPY public/ public/

RUN ${NPM} run build



# Production image
FROM ${NODE_REPO} AS runner
WORKDIR /app

# Создаем группу и пользователя nextjs с правильными UID/GID
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001 -G nodejs

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Устанавливаем права на директорию приложения
RUN chown -R nextjs:nodejs /app

# Переключаемся на пользователя nextjs
USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
