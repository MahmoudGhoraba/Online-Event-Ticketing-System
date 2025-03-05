const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    email: Strting,
    profilePicture: String,
    password: String,
    role: String,
    createdAt:{
       type: Date,
       immutable: true,
       default: () => Date.now(),
    }
    })
