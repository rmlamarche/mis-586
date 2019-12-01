module.exports = {
  apps: [
    {
      name: 'mis586',
      script: './app.js',
      env_production: {
        NODE_ENV: 'production',
        PORT: 5860,
        DOCUMENT_ROOT: '/arouge'
      }
    }
  ]
};
