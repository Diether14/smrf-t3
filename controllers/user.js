const user = require('../db_apis/user.js');

const post = async (req, res, next) => {
    try {
        const data = {
            last_name: transform(req.body.last_name),
            first_name: transform(req.body.first_name),
            middle_name: transform(req.body.middle_name),
            username: req.body.username,
            user_level: req.body.user_level,
            department: req.body.department
        };

        let newUser = await user.insert(data);

        res.status(201).json(newUser);
    } catch(error) {
        next(error);
    }
};

module.exports.post = post;

const transform = (string) => {
    const arr = string.split('');
    arr[0] = arr[0].toUpperCase();
    return arr.join('');
}