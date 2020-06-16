const session = require('express-session');

async function get(req, res, next) {
    if (!session.username) {
        session.username = [];
    }

    console.log(session.username);
    res.status(201).json(session.username);
}

module.exports.get = get;

const destroy = async () => {
    session.username = [];
};

module.exports.destroy = destroy;
 
