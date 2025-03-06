module.exports = {
  testDir: "./tests", // Указываем папку, где лежат тесты
  timeout: 60000, // Максимальное время выполнения теста
  use: {
    baseURL: "http://localhost:5001", // URL бэкенда
    headless: true, // Запуск без UI (изменить на false, если хочешь видеть браузер)
  },
  webServer: {
    command: "npx start-server", // Команда для запуска сервера
    url: "http://localhost:5001/api/v1/channels", // Ожидаемый URL сервера
    timeout: 120000, // Время ожидания запуска сервера
    reuseExistingServer: true, // Использовать уже запущенный сервер
  },
};
