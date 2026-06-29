module.exports = {
  apps: [
    {
      name: 'v723975-api',
      script: '/var/www/venezuela723975/apps/api/dist/server.js',
      instances: 1,
      exec_mode: 'fork',
      env_file: '/var/www/venezuela723975/.env',
      log_file: '/var/log/venezuela723975/api.log',
      error_file: '/var/log/venezuela723975/api-error.log',
      time: true,
      restart_delay: 3000,
      max_restarts: 10,
    },
    {
      name: 'v723975-web',
      script: '/var/www/venezuela723975/apps/web/.next/standalone/apps/web/server.js',
      instances: 1,
      exec_mode: 'fork',
      env_file: '/var/www/venezuela723975/.env',
      log_file: '/var/log/venezuela723975/web.log',
      error_file: '/var/log/venezuela723975/web-error.log',
      time: true,
      restart_delay: 3000,
      max_restarts: 10,
    },
  ],
}
