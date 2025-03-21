module.exports = {
  testDir: "./tests", // Указываем папку, где лежат тесты
  use: {
    baseURL: "http://localhost:3000",
  },
  webServer: {
    command: "make develop", // Команда для запуска сервера
    url: "http://localhost:3000", // Ожидаемый URL сервера
    reuseExistingServer: true,
  },
};
