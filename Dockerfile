FROM node:latest

RUN mkdir -p /lzmarket/
WORKDIR  /lzmarket/
COPY . /lzmarket/
RUN cd /lzmarket/server && npm install --registry=https://registry.npm.taobao.org \
    cd /lzmarket/server && npm install --registry=https://registry.npm.taobao.org && npm run build \

EXPOSE 8080
CMD npm run start
