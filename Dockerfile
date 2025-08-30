FROM node:22.19-alpine as build

WORKDIR /app
COPY . .
RUN npm ci && npm run build 

FROM nginx:stable-alpine as prod

COPY --from=build /app/dist /usr/share/nginx/html 
COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf
