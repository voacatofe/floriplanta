FROM node:20-alpine AS base

# Instala dependências apenas para compilação
FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Etapa de desenvolvimento
FROM base AS development
WORKDIR /app

# Instala dependências de desenvolvimento
COPY package.json package-lock.json* ./
RUN npm ci

# Copia o código fonte
COPY . .

# Gera o cliente Prisma
RUN npx prisma generate

# Expõe a porta 3000
EXPOSE 3000

# Comando padrão para desenvolvimento
CMD ["npm", "run", "dev"]

# Etapa de build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Etapa de produção
FROM base AS runner
WORKDIR /app

ENV NODE_ENV="production"
ENV NEXT_TELEMETRY_DISABLED="1"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Configura as permissões corretas para o cache do Next.js
RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT="3000"
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]