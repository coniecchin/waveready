import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

import healthHandler from './api/health.js';
import onemapHandler from './api/onemap.js';
import neaHandler from './api/nea.js';
import tidesHandler from './api/tides.js';
import uvHandler from './api/uv.js';
import heatStressHandler from './api/heat-stress.js';
import windHandler from './api/wind.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === 'production';

async function startServer() {
  const app = express();

  app.use(express.json());

  // API endpoints
  app.get('/api/health', (req, res) => healthHandler(req, res));
  app.get('/api/onemap', (req, res) => onemapHandler(req, res));
  app.get('/api/nea', (req, res) => neaHandler(req, res));
  app.get('/api/tides', (req, res) => tidesHandler(req, res));
  app.get('/api/uv', (req, res) => uvHandler(req, res));
  app.get('/api/heat-stress', (req, res) => heatStressHandler(req, res));
  app.get('/api/wind', (req, res) => windHandler(req, res));

  if (!isProduction) {
    // Mount Vite middlewares in development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`WaveReady full-stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
