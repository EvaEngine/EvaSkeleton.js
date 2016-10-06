list:
	@echo "build"
	@echo "pre-build"

pre-build:
	npm install -g nodemon babel-cli sequelize-cli git://github.com/AlloVince/sequelize-auto#feature/column-comments

build: install

install:
	git pull
	npm install
	bower install --allow-root
	gulp build
	npm run build

migrate:
	sequelize db:migrate

seeder:
	sequelize db:seed:all --harmony


docker-proxy:
	docker run -p 443:443  -p 80:80 -v /var/run/docker.sock:/tmp/docker.sock:ro --net nginx-proxy --rm --name nginx-proxy -t jwilder/nginx-proxy

docker-rm:
	docker rm $(shell docker ps -a -q)

docker-stop:
	docker stop $(shell docker ps -a -q)

docker-build:
	export VERSION=dev; \
    export MACHINE_IP=$(shell ipconfig getifaddr en0); \
	docker-compose -f docker-compose.dev.yml -f docker-compose.yml build
	docker run -v $(shell pwd -P):/opt/htdocs/EvaSkeleton.js -v /tmp/npm:/root/.npm --rm evaengine/evaskeleton-node:dev cnpm install
	docker run -v $(shell pwd -P):/opt/htdocs/EvaSkeleton.js --rm evaengine/evaskeleton-node:dev npm run build

docker-ship:
	@if [ "`git diff --exit-code`" ]; then \
	    echo "Not allow git has un-staged file before building images"; exit 2; \
	fi;
	if [[ "`git describe --exact-match --tags $(git log -n1 --pretty='%h') 2>&1`" =~ ^fatal.* ]]; then \
	    echo "Build image require current git hash exact match a tag"; exit 2; \
	fi; \
	echo "Zipping source codes to tmp/dev.tar.gz"; \
	tar zcf /tmp/dev.tar.gz --exclude=.git --exclude=tmp/* --exclude=logs/*.log --exclude=compose --exclude=dockerfiles . ; \
	mv /tmp/dev.tar.gz tmp; \
	export VERSION=`git describe --tags`; \
	docker-compose -f docker-compose.test.yml -f docker-compose.yml build
	make docker-push


docker-gen:
	@export VERSION=$(shell git describe --tags); \
	export MACHINE_IP="____MACHINE_IP____"; \
	docker-compose -f docker-compose.test.yml -f docker-compose.yml config \
	   | sed -E "s/ +build://g" \
	   | sed -E "s/ +context.+//g" \
	   | sed -E "s/____MACHINE_IP____/\"\$${MACHINE_IP}\"/g" \
	   > compose/$${VERSION}_docker-compose.yml; \
	docker-compose -f docker-compose.production.yml -f docker-compose.yml config \
	   | sed -E "s/ +build://g" \
	   | sed -E "s/ +context.+//g" \
	   > compose/$${VERSION}_docker-compose.production.yml; \
	export VERSION=dev; \
	docker-compose -f docker-compose.dev.yml -f docker-compose.yml config \
	   | sed -E "s/ +build://g" \
	   | sed -E "s/____MACHINE_IP____/\"\$${MACHINE_IP}\"/g" \
	   | sed -E "s/ +context.+//g" \
	   > compose/docker-compose.dev.yml;

docker-push:
	@export VERSION=$(shell git describe --tags); \
	export MACHINE_IP=$(shell ipconfig getifaddr en0); \
	echo "Start push docker images with tag $${VERSION}"; \
	docker push evaengine/evaskeleton-source:$${VERSION}; \
	docker push evaengine/evaskeleton-node:$${VERSION}; \
	docker push evaengine/evaskeleton-nginx:$${VERSION};
	make docker-gen

docker-up:
	export VERSION=dev; \
	export MACHINE_IP=$(shell ipconfig getifaddr en0); \
	docker-compose -f docker-compose.dev.yml -f docker-compose.yml up

docker-clear:
	docker rmi -f $(shell docker images | grep evaskeleton | awk '{print $3}')
	docker rmi -f $(shell docker images | grep "^<none>" | awk '{print $3}')
