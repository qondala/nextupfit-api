module.exports = {
  apps: [
    {
      name: "nextupfit",
      script: "dist/src/main.js",
      instances: "max",
      exec_mode: "cluster",
      watch: true,
    },
  ],
};
