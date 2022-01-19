'use strict';

// Start up DB Server
const server = require('./src/server.js');

const { db } = require('./src/auth/models/index.js');
db.sync()
  .then(() => {

    // Start the web server
    server.start(process.env.PORT || 3000);
  })
  .catch(console.error);

