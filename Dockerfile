# PRODUCTION image (ใช้กับ Render): build เว็บ Expo แล้วเสิร์ฟด้วย Express
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx expo export --platform web

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --omit=dev
COPY server.js ./
COPY --from=build /app/dist ./dist
EXPOSE 10000
CMD ["node", "server.js"]
