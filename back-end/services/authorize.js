const jwt = require('jsonwebtoken');
const secret = require('../configuration.json').token_secret;

const verifyToken = function (req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({ message: 'Not authorized' });
    }

    const trimmedToken = token.split(" ")[1];
    const verified = jwt.verify(trimmedToken, secret,
        function (err, decoded) {
            if (err) {
                return res.status(403).send({ message: "Forbidden", err: err });
            } else {
                req.user = decoded;
                next();
            }
        });
}


function authorize(roles = []) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return [
        // authenticate JWT token and attach user to request object (req.user)
        expressJwt({ secret }),

        // authorize based on user role
        (req, res, next) => {
            if (roles.length && !roles.includes(req.user.role)) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }

            // authentication and authorization successful
            next();
        }
    ];
}

module.exports = {
    verifyToken
}
