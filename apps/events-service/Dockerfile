FROM node:20-alpine AS development
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npx nest build events-service

FROM node:20-alpine AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY --from=development /usr/src/app/package*.json ./
RUN npm install --only=production --omit=dev
COPY --from=development /usr/src/app/dist ./dist
EXPOSE 3000
CMD ["node", "dist/apps/events-service/main.js"]