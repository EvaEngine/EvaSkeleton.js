FROM mhart/alpine-node:6

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/' /etc/apk/repositories
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org

WORKDIR "/opt/htdocs/EvaSkeleton.js"
VOLUME ["/opt/htdocs/EvaSkeleton.js"]

CMD npm start
