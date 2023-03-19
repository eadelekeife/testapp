const jwt = require('jsonwebtoken');
const { users } = require('./connection');

module.exports = function (req,res,next) {
    if(req.session.token) {
        let verifyToken = jwt.verify(req.session.token, 'abcdefghijklmnopqrstuvwxyz');
        if(verifyToken) {
            users.findById(verifyToken.user._id, (err,user) => {
                if(err) throw err;
                if(user) {
                    res.body = user;
                    next();
                } else {
                    res.redirect('/signin');
                }
            })
        } else {
            res.redirect('signin');
        }
    } else {
        res.redirect('/signin');
    }
}