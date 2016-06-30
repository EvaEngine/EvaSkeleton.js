FROM node:4

RUN npm install -g nodemon babel-cli gulp sequelize-cli mysql bower coffee-script git://github.com/AlloVince/sequelize-auto#feature/column-comments

VOLUME ["/opt/htdocs/EvaSkeleton.js"]

# 可挂载npm缓存
VOLUME ["/root/.npm"]
WORKDIR "/opt/htdocs/EvaSkeleton.js"
EXPOSE 19000
CMD PORT=19000 npm start
