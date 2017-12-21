let cfg = require('./pm2.common');

cfg.apps[0] = Object.assign(cfg.apps[0], {
  "env": {
    "NODE_ENV": "pre"
  },
})

module.exports = cfg