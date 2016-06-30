pull:
	docker pull nginx:1.9
	docker pull php:5.6-fpm
	docker pull mysql:5.6
	docker pull redis:3.0
	docker pull memcached:1.4
	docker pull elasticsearch:1.5
	docker pull node:5.3

build-all:
	make build-source
	make build-nginx
	make build-mysql
	make build-node

run-all:
	make run-source
	make run-redis
	make run-node
	make run-nginx

build-nginx:
	docker build -t eva-nginx ./nginx

run-nginx:
	docker run -it -d -p 80:80 -p 443:443 --volumes-from eva_source --name eva_nginx -t eva-nginx

in-nginx:
	docker exec -it eva_nginx /bin/bash

build-mysql:
	docker build -t eva-mysql ./mysql

run-mysql:
	docker run -i -d -p 3306:3306 -v ~/opt/data/mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=huaerjie001 --name eva_mysql -t eva-mysql

in-mysql:
	docker run -i -p 3306:3306  -v ~/data/mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=huaerjie001 -t eva/mysql /bin/bash

build-node:
	docker build -t eva-node ./nodejs

run-node:
	docker run -it -d -p 19000:19000 --volumes-from eva_source --name eva_node -t eva-node

in-node:
	docker exec -it eva_node /bin/bash

build-redis:
	docker build -t eva-redis ./redis

run-redis:
	docker run -it -d --name eva_redis -t eva-redis

build-source:
	docker build -t eva-source ./source

run-source:
	docker run -it --name eva_source -v ~/opt/htdocs/EvaSkeleton.js:/opt/htdocs/EvaSkeleton.js -d eva-source

clean:
	docker rm `docker ps -a | grep 'months ago' | awk '{print $1}'`
	docker rmi -f $(shell docker images | grep "<none>" | awk "{print \$3}")
