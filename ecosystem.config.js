module.exports = {
  apps: [{
    name: 'colombian-news-scraper',
    script: 'server.js',
    instances: 1,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 44444
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: process.env.PORT || 44444
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    restart_delay: 5000,
    max_restarts: 5
  }]
}