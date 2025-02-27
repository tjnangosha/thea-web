# Build stage
FROM node:16-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

LABEL org.opencontainers.image.source="https://github.com/tjnangosha/thea-web"

# Production stage
FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]