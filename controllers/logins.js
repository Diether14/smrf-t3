const logins = require('../db_apis/logins.js');
const session = require('express-session');

function loginForm(req) {
    const login = {
      username: req.body.username,
      password: req.body.password
    };
    
    return login;
}

  async function post(req, res, next) {
    try {
      let login = loginForm(req);
      
      login = await logins.validLogin(login);

      if (login.length > 0) {
        session.username = login;
        res.status(200).json(login);
      } else {
        res.status(200).json(null);
      }
    } catch (err) {
      next(err);
    }
  }
   
  module.exports.post = post;