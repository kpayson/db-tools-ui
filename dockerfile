FROM node:20-alpine AS build
WORKDIR /app

COPY . .
COPY ./assets/config.prod.json ./src/assets/config.json
RUN npm install
RUN npm run build --configuration=production
# Serve Application using Nginx Server
FROM nginx:alpine
COPY --from=build /app/dist/db-tools-ui/ /usr/share/nginx/html
EXPOSE 80