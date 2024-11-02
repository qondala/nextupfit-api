module.exports = {
  apps: [
    {
      name: "nextupfit",
      script: "dist/main.js",
      instances: 1,
      autorestart: true,
      watch: false,
      error_file: "err.log",
    },
  ],
};
