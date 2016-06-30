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

docker-build:
	mkdir -p /tmp/npm
	docker run -v /tmp/npm:/root/.npm -v $(shell pwd -P):/opt/htdocs/EvaSkeleton.js --rm -it eva-node npm install --verbose

migrate:
	sequelize db:migrate

seeder:
	sequelize db:seed:all --harmony
