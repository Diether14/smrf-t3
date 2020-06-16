const oracledb = require('oracledb');
const database = require('../services/database.js');

const loginSql2 =
`SELECT 
  id,
  last_name,
  first_name,
  middle_name,
  username,
  user_level,
  img,
  department
FROM xxdom.TBL_USER WHERE USERNAME = :username AND PASSWORD = :password`;

async function validLogin(log) {

  const login = Object.assign({}, log);

  const result = await database.simpleExecute(loginSql2, login);
  return result.rows;
}

module.exports.validLogin = validLogin;
