'use strict';

const express = require('express');

const app = express();

if (module === require.main) {

  const server = app.listen(process.env.PORT || 8081, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
}

var TestController = require('./TestController');
app.use('/test', TestController);

module.exports = app;