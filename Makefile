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
