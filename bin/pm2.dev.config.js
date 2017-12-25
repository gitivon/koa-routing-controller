let cfg = require('./pm2.common');

cfg.apps[0] = Object.assign(cfg.apps[0], {
  "env": {
    "NODE_ENV": "dev"
  },
  "out_file": "./logs/api-out.log",
  "error_file": "./logs/api-error.log"
})

module.exports = cfg