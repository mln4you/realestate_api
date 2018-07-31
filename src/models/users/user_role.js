const mongoose = require('mongoose')
const Schema = mongoose.Schema


//create user_role Schema & Model

const UserRoleSchema = Schema({
    uloga: {
        type: String,
        required: [true, "Uloga je neophodna"]
    },
    korisnici: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

const UserRole = mongoose.model("UserRole", UserRoleSchema)
module.exports = UserRole