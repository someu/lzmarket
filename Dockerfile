FROM node:14.19.1

RUN mkdir -p /lzmarket/server
RUN mkdir -p /lzmarket/frontend
COPY . /lzmarket/
RUN cd /lzmarket/server && npm install --registry=https://registry.npm.taobao.org
EXPOSE 8080
WORKDIR  /lzmarket/server
CMD npm run start
