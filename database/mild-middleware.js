const jwt = require('jsonwebtoken');
const { users, Designs } = require('./connection');

module.exports = function (req, res, next) {
    if (req.session.token) {
        let verifyToken = jwt.verify(req.session.token, 'abcdefghijklmnopqrstuvwxyz');
        if (verifyToken) {
            users.findById(verifyToken.user._id)
                .populate({
                    path: 'Designs',
                    model: Designs
                })
                .exec()
                .then(user => {
                    if (user) {
                        res.body = user;
                        next();
                    } else {
                        next();
                    }
                })
                .catch(err => {
                    throw err
                })
        } else {
            next();
        }
    } else {
        next();
    }
}