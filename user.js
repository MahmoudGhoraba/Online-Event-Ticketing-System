const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
      String,
      required: true,
   },
    email: {
      Strting,
      required: true,
   },

    profilePicture: {
      String, 
   },
    password: {
      String,
      required: true,
   },
    role: {
      String,
      enum: ['User', 'Organizer', 'System Admin'],
      required: true,
    },
    createdAt:{
       type: Date,
       immutable: true,
       default: () => Date.now(),
    }
    })

const User = mongoose.model('User', userSchema)
module.exports = User
