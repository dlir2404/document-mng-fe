FROM node:18-alpine

WORKDIR /usr/src/app

# Cài đặt bash để tránh lỗi khi thực thi script bash
RUN apk add --no-cache bash

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x ./wait-for-it.sh

# Build ứng dụng
RUN npm run build

EXPOSE 3000

# Start ứng dụng sau khi build
CMD ["npm", "start"]
