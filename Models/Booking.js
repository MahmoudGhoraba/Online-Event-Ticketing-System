const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },tickets: {
        type: Number,
        required: true,
        min: 1
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0 
    },
    bookingStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'canceled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    

});
    const Booking = mongoose.model("Booking", bookingSchema);
    module.exports = Booking;     