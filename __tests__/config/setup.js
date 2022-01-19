'use strict';

const { db } = require('../../src/auth/models');


// const config = {
//   verbose: true,
// };

// module.exports = config;

// // Or async function
// module.exports = async () => {
//   return {
//     verbose: true,
//   };
// };

db.sync();
