const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    ticketPrice: {
        type: Number,
        required: true,
        min: 0
    },
    remainingTickets: {
        type: Number,
        required: true,
        min: 0
    },
    totalNumberOfTickets: {
        type: Number,
        required: true,
        min: 0
    },
    Organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status:{
        type:String,
        enum:["pending","approved","declined"],
        default:"pending"
    }
}, { timestamps: true });

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;