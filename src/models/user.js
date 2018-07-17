const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create a schema
const userSchema = new Schema({
    method: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        required: true
    },
    local: {
        email: {
            type: String,
            lowercase: true
        },
        lozinka: {
            type: String
        }
    },
    google: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    },
    facebook: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    },
    tip : [{ type: Schema.Types.ObjectId, ref: 'UserType' }],
    uloga : [{ type: Schema.Types.ObjectId, ref: 'UserRole' }],
    ime : {
        type: String,
    },
    prezime : {
        type: String,
    },
    verify_token : {
        type: String,
    },
    status : {
        type: Boolean,
        required: [false, "Status je neophodan"],
    },
    telefon : {
        type: Number,
        required: [false]
    },
    naziv_kompanije : {
        type: String,
    },
    favorite_properties : [{ type: Schema.Types.ObjectId, ref: 'Property' }]
});


//When save method is triggered do this before
userSchema.pre('save', async function (next) {

    // Not fat arrow function because of its way that handles this.password (wont work) so using standard funcion keyword
    try {
        if(this.method !== 'local') {
            next();
        }

        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(this.local.lozinka, salt);
        
        // Reasign hashed version over original, plain text password
        this.local.lozinka = passwordHash;
        next();
    } catch(error) {
        next(error)
    }
});

// Compare passwords
userSchema.methods.isValidPassword = async function(newPassword) {
    try{
        return await bcrypt.compare(newPassword, this.local.password);
    } catch(error){
        throw new Error(error);
    }
}

// Create a model
const User = mongoose.model('user', userSchema);

// Export the model
module.exports = User;