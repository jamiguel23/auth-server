'use strict';

// const { users } = require('../models/index.js');

module.exports = (users) => async (req, res, next) => {

  try {

    if (!req.headers.authorization) { next('Invalid Login'); return; }

    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateToken(token);
    // console.log(validUser);

    req.user = validUser;
    req.token = validUser.token;
    next();

  } catch (e) {
    res.status(403).send('Invalid Login');
    console.log(e);
  }

}
