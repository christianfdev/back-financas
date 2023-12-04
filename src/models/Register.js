const mongoose = require('mongoose');

const { Schema } = mongoose;

const registerSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, 
{ timestamps: true }
);

const Register = mongoose.model('Register', registerSchema);


module.exports = {
    Register,
    registerSchema
}