'use strict';

const express = require('express');
const authRouter = express.Router();

const { users } = require('./models/index.js');
const basicAuth = require('./middleware/basic.js')
const bearerAuth = require('./middleware/bearer.js');
// const { Sequelize, DataTypes } = require('sequelize');


authRouter.use(express.json());

authRouter.get('/', (req, res, next) => {
  res.status(200).send("main page hit");
});

authRouter.post('/signup', async (req, res, next) => {
  console.log(req.body);
  try {
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token
    };
    res.status(201).json(output);
  } catch (e) {
    next(e.message);
  }
});

authRouter.post('/signin', basicAuth(users), (req, res, next) => {
  const user = {
    user: req.user,
    token: req.user.token
  };
  console.log(user)
  res.status(200).json(user);
});

// Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hdHQiLCJpYXQiOjE2NDI1NjE1OTUsImV4cCI6MTY0MjU2MjQ5NX0.sAGnU4-KyhmqiAfgZdWVQ-hhr3zbwnm5fQQaHNmZBbg

authRouter.get('/users', bearerAuth(users), async (req, res, next) => {
  const users = await Users.findAll({});
  const list = users.map(user => user.username);
  res.status(200).json(list);
});

authRouter.get('/secret', bearerAuth(users), async (req, res, next) => {
  res.status(200).send("Welcome to the secret area!")
});


module.exports = authRouter;
