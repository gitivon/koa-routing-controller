module.exports = {
  "apps": [
    {
      "name": "api",
      "script": "./dist/app.js",
      "watch": "./dist/",
      "watch_options": {
        persistent: true,
        "usePolling": true
      },
      "env": {
        "NODE_ENV": "development"
      },
      "log_date_format": "YYYY-MM-DD HH:mm:ss"
    }
  ]
}