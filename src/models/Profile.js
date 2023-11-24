const mongoose = require('mongoose');

const { Schema } = mongoose;

const { registerSchema } = require('./Register');

const profileSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    registers: {
        type: [registerSchema],
    },

},
{timestamps: true}
);

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;