# Команда для сборки фронтенда
build:
	cd frontend && npm run build

# Команда для запуска сервера
start:
	npx start-server -s ./frontend/build -p 5002


