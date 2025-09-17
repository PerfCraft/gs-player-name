// server.js
const express = require('express');
const path = require('path');

const app = express();
// If you're behind a reverse proxy (e.g. nginx) enable trust proxy:
app.set('trust proxy', true);

// Allowed debug IP (your IP)
const DEBUG_IP = '188.237.175.111';

// Serve static assets normally
app.use('/static', express.static(path.join(__dirname, 'static')));

// Middleware to serve debug page only to DEBUG_IP
app.get(['/', '/index.html'], (req, res) => {
  // req.ip will consider X-Forwarded-For if trust proxy is true
  const clientIp = req.ip || req.connection.remoteAddress || '';
  // Normalize IPv6-style addresses that include IPv4, e.g. ::ffff:188.237.175.111
  const normalized = clientIp.replace(/^.*:/, '');

  if (normalized === DEBUG_IP) {
    // Serve the debug (unprotected) version
    res.sendFile(path.join(__dirname, 'index_debug.html'));
  } else {
    // Serve the protected/locked version
    res.sendFile(path.join(__dirname, 'index_protected.html'));
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on ${port}`));
