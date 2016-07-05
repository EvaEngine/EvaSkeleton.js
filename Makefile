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

docker-pre-build:
	cd dockerfiles && docker-compose build

docker-build:
	git pull
	docker run -v $(shell pwd -P):/opt/htdocs/EvaSkeleton.js --rm -it evaskeleton-node npm install
	docker run -v $(shell pwd -P):/opt/htdocs/EvaSkeleton.js --rm -it evaskeleton-node npm run build

docker-up:
	cd dockerfiles && docker-compose up

