FROM node:14.19.1

RUN mkdir -p /lzmarket/server
RUN mkdir -p /lzmarket/frontend
WORKDIR  /lzmarket/
COPY . /lzmarket/
RUN cd /lzmarket/server && npm install --registry=https://registry.npm.taobao.org && cd /lzmarket
EXPOSE 8080
CMD npm run start
