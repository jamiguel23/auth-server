'use strict';

const base64 = require('base-64');
// const { user } = require('../models/index.js')

module.exports = (users) => async (req, res, next) => {
  if (!req.headers.authorization) { 
    throw new Error('something with the headers, idk'); 
  }

  let basic = req.headers.authorization.split(' ').pop();
  let [username, pass] = base64.decode(basic).split(':');

  try {
    console.log('**********this is the pass', pass);
    req.user = await users.authenticateBasic(username, pass)
    next();
  } catch (e) {
    res.status(403).send('Invalid Login');
    console.log('basic error', e);
  }

}
