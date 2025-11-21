# syntax=docker/dockerfile:1
FROM node:20-alpine AS base

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV TURBO_TELEMETRY_DISABLED=1
ENV DO_NOT_TRACK=1

RUN apk update
RUN apk add --no-cache libc6-compat
RUN corepack enable
RUN yarn set version 4.9.1

FROM base AS builder
WORKDIR /app

RUN npm install -g turbo
COPY . .
RUN turbo prune backend --docker


FROM base AS installer

WORKDIR /app/apps

COPY --from=builder /app/out/json .
RUN yarn install

COPY --from=builder /app/out/full .
RUN yarn turbo prisma:generate
RUN yarn turbo build

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nestjs
RUN adduser --system --uid 1001 nestjs
USER nestjs

COPY --from=installer --chown=nestjs:nestjs /app/apps/packages ./apps/packages
COPY --from=installer --chown=nestjs:nestjs /app/apps/node_modules ./apps/node_modules
COPY --from=installer --chown=nestjs:nestjs /app/apps/backend/dist ./apps/backend

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

EXPOSE 3000

CMD ["node", "apps/backend/main.js"]
