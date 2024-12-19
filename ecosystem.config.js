module.exports = {
    apps: [
        {
            name: "natep_apply",
            script: "yarn",
            args: "start",
            env: {
                PORT: 1000,  // Set the port here
                NODE_ENV: "production",
            },
            instances: "max",  // Adjust for cluster mode or set to a specific number like "4"
            exec_mode: "cluster", // Enable cluster mode if you want multiple instances
            watch: true,               // Enable watching for file changes
            ignore_watch: ["node_modules", "logs"], // Ignore changes in these directories
        },
    ],
};