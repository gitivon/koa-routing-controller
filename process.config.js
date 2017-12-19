module.exports = {
  "apps": [
    {
      "name": "api",
      "script": "./dist/server.js",
      "watch": "./src/",
      "env": {
        "NODE_ENV": "development"
      },
      "log_date_format": "YYYY-MM-DD HH:mm Z"
    }
  ]
}