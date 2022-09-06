FROM node:alpine
WORKDIR /frontend
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
RUN npm install -g serve --save

RUN npm run build

FROM nginx:1.17.8-alpine
COPY --from=build ./build /var/www/html/react
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# CMD ["npm", "start"]