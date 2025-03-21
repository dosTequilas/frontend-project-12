build:
	npm run build

start-backend:
	npx start-server

start-frontend:
	make -C frontend start

start:
	make start-backend

develop:
	make start-backend & make start-frontend

install:
	npm ci 

test:
	npm run test:e2e
	