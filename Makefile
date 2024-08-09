# Команда для сборки фронтенда
build:
	npm ci
	npm run build

start-backend:
	npx start-server

start-frontend:
	make -C frontend start

start:
	make start-backend

develop:
	make start-backend & make start-frontend