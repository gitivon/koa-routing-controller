let cfg = require('./pm2.common');

cfg.apps[0] = Object.assign(cfg.apps[0], {
  "env": {
    "NODE_ENV": "pre"
  },
  "out_file": "/opt/tuniu/logs/app/api-out.log",
  "error_file": "/opt/tuniu/logs/app/api-error.log"
})

module.exports = cfg