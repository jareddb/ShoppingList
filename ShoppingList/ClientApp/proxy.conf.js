const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:65305';

const PROXY_CONFIG = [
  {
    context: [
      "/shoppinglist/**",
   ],
    "target": target,
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug",
  }
]

module.exports = PROXY_CONFIG;
