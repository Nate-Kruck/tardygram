const { Router } = require('express');
// const ensureAuth = require('../middleware/ensure-auth');
const UserService = require('../services/user-service');

const ONE_DAY_IN_MILLI = 1000 * 60 * 60 * 24;

const yummyCookie = (user, res) => {
  const token = UserService.makeToken(user);
  res.cookie('tardygram', token, {
    maxAge: ONE_DAY_IN_MILLI,
    httpOnly: true,
    sameSite: 'none'
  });
};

module.exports = Router()
  .post('/signup', (req, res, next) => {
    UserService
      .create(req.body)
      .then(user => {
        yummyCookie(user, res);
        res.send(user);
      })
      .catch(next);
  });

//   .post('/login', (req, res, next) => {
//     UserService
//       .authorize(req.body)
//       .then(user => {
//         yummyCookie(user, res);
//         res.send(user);
//       })
//       .catch(next);
//   })

//   .get('/verify', ensureAuth, (req, res) => {
//     res.send(req.user);
//   });
