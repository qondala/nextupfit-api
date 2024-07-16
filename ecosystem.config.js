module.exports = {
  apps: [
    {
      name: "nextupfit",
      script: "dist/main.js",
      instances: "max",
      exec_mode: "cluster",
      watch: true,
    },
  ],
};
