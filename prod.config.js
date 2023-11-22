module.exports = {
  apps: [
    {
      name: "GSuite User Activation",
      script: "index.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1000M",
      exec_mode: "cluster",
    },
  ],
};
