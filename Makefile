list:
	@echo "build"
	@echo "pre-build"

pre-build:
	npm install -g nodemon babel-cli tramp-cli

build: install

install:
	git pull
	npm install
	npm run build

migrate:
	tramp migrate
