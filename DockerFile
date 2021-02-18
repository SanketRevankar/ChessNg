FROM node:10-alpine as build-step
RUN mkdir -p /app
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build --prod

FROM nginx:1.17.1-alpine
COPY --from=build-step /app/dist/ChessNG /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
