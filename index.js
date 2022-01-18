'use strict';

// Start up DB Server
const { db } = require('./lib/auth/models/index.js');
db.sync()
  .then(() => {

    // Start the web server
    require('./lib/server.js').start(process.env.PORT);
  });

