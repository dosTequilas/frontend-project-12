build:
	npm run build

start-backend:
	npx start-server

start-frontend:
	make -C frontend start

start:
	npm run start

develop:
	make start-backend & make start-frontend

install:
	npm ci 