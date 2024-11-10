const express = require('express');
const next = require('next');
const cluster = require('cluster');
const os = require('os');

const dev = process.env.NODE_ENV !== 'production';
const numCPUs = os.cpus().length;
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;

// Function to start the server
const startServer = async () => {
  await app.prepare();
  const server = express();

  // Example of a custom route
  server.get('/custom-route', (req, res) => {
    return app.render(req, res, '/', req.query);
  });

  // Default catch-all handler to allow Next.js to handle all other routes
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Start the Express server
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
};

// Cluster mode
if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    // Optionally restart the worker
    cluster.fork();
  });
} else {
  // Worker processes have a http server.
  startServer();
  console.log(`Worker ${process.pid} started`);
}
