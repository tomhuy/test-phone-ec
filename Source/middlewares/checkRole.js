const jwt = require('jsonwebtoken')
process.env.SECRET_KEY = 'huynbao'

let CheckAdmin = function (req, res, next) {
    jwt.verify(req.headers['authorization'], process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route');
            res.sendStatus(403);
        } else {
            if (decoded.role === 'admin') {
                // console.log('permission gained');
                next(); // forward request
            } else {
                // console.log('this user do not have the permission to access');
                res.sendStatus(403);
            }

        }
    })
}

let CheckStaff = function (req, res, next) {
    if ( req.path == '/get') return next();
    jwt.verify(req.headers['authorization'], process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route');
            res.sendStatus(403);
        } else {
            if (decoded.role === 'staff' || decoded.role === 'admin')  {
                // console.log('permission gained');
                next(); // forward request
            } else {
                // console.log('this user do not have the permission to access');
                res.sendStatus(403);
            }

        }
    })
}

module.exports ={
    CheckAdmin: CheckAdmin,
    CheckStaff: CheckStaff
}

