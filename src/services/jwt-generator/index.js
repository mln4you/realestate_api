const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config');

module.exports = {
    // Generate JWT token
    signToken: user  => {
        return JWT.sign({
            iss : 'nodeAuth',
            sub : user.id,
            iat : new Date().getTime(), //current time
            exp : new Date().setMinutes(new Date().getMinutes() + 30),  // current time + 30 minutes
        }, JWT_SECRET);
    },
    decodeJWT: (token) => {
        return JWT.decode(token);
    }
}
