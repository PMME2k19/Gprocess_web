# Stage 0: compile angular frontend
FROM node:latest as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG CONFIG=qa
RUN npm run build -- --configuration=$CONFIG
# Stage 1: serve app with nginx server
FROM nginx:latest
COPY --from=build /app/dist/gprocess_web  /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080