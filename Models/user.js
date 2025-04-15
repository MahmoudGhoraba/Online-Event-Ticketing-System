const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,  
        required: true,
    },
    profilePicture: {
        type: String, 
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['User', 'Organizer', 'Admin'],
        required: true,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
    },
    otp:{
        temp: Number,
        expiry: Date
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;