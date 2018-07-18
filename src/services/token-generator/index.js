const bcrypt = require('bcryptjs');


module.exports = {
    
    verify_token: async () => {
        // Generate a salt
        const date = new Date().getTime();
        const stringDate = date.toString();
        const salt = await bcrypt.genSalt(10);
        const token = await bcrypt.hash(stringDate, salt);
        return token;
    }
    
}