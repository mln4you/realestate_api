const mongoose = require('mongoose')
const Schema = mongoose.Schema

//create user_type Schema & Model

const UserTypeSchema = Schema({
    tip: {
        type: String,
        required: [true, "Tip je obavezan"]
    },
    korisnik: [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

const UserType = mongoose.model("UserType", UserTypeSchema)
module.exports = UserType