FROM node:18-alpine

# 安装git
RUN apk add --no-cache git

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3012

EXPOSE 3012

CMD ["npm", "start"]
