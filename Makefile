list:
	@echo "build"
	@echo "pre-build"

pre-build:
	npm install -g nodemon tramp-cli

build: install

install:
	git pull
	npm install

migrate:
	tramp migrate
