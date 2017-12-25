let cfg = require('./pm2.common');

cfg.apps[0] = Object.assign(cfg.apps[0], {
  "env": {
    "NODE_ENV": "sit"
  },
})

module.exports = cfg