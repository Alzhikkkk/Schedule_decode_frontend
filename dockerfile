FROM node:alpine
WORKDIR /frontend
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
RUN npm install -g serve --save

CMD ["npm", "start"]