# Node
FROM node:12 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV production
ENV PUBLIC_URL /

COPY . .
RUN npm install
RUN npm run build

#Nginx
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]