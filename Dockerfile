FROM node:16.14.0 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.21.1-alpine
EXPOSE 4200
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/first-app /usr/share/nginx/html