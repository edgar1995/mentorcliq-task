'use strict';

const express = require('express');
const path = require('path');

const app = new express();

app.disable('x-powered-by');

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';

app.listen(port, err => {
  if (err) {
    return console.error(err);
  }

  console.info(`Server running on http://localhost:${port} ${env}`);
});
