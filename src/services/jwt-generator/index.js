const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('../../config');

module.exports = {
    // Generate JWT token
    signToken: user  => {
        return JWT.sign({
            iss : 'nodeAuth',
            sub : user.id,
            iat : new Date().getTime(), //current time
            exp : new Date().setDate(new Date().getDate() + 1),  // current time + 1 day
        }, JWT_SECRET);
    }
}
