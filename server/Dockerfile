FROM node:latest

RUN mkdir -p /lzmarket/server
WORKDIR  /lzmarket/server
COPY . /lzmarket/server
RUN npm install --registry=https://registry.npm.taobao.org
EXPOSE 8080
CMD npm run start
