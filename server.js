// Production server for Render: serves the Expo web build from /dist
const express = require('express');
const path = require('path');
const app = express();
const dist = path.join(__dirname, 'dist');
app.get('/health', (_req, res) => res.send('ok'));
app.use(express.static(dist));
app.use((_req, res) => res.sendFile(path.join(dist, 'index.html')));
const port = process.env.PORT || 10000;
app.listen(port, '0.0.0.0', () => console.log('Listening on ' + port));
