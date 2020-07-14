const oracle = require('oracledb');
const database = require('../services/database.js');

const insert = async (data) => {
    const sql = `INSERT INTO ${process.env.SCHEMA}.TBL_USER 
                    (LAST_NAME, FIRST_NAME, MIDDLE_NAME, USERNAME, PASSWORD, USER_LEVEL, DEPARTMENT) 
                    VALUES 
                    (:last_name, :first_name, :middle_name, :username, 'welcome', :user_level, :department)`;
    const user = Object.assign({}, data);
    const result = await database.simpleExecute(sql, user);

    return result;
};

module.exports.insert = insert;