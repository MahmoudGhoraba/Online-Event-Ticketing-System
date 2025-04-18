
const BookingModel = require("../Models/Booking");
const EventModel = require("../Models/Event");

const BookingController = {
  getAllBooking: async (req, res) => {
    try {
      //maybe add a line for the case someone didnt book before
      const Bookings = await BookingModel.find();
      return res.status(200).json(Bookings);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  },
  getBooking: async (req, res) => {
    try {
            //maybe add a line for the case someone didnt book before
      const Booking = await BookingModel.findById(req.params.id);
      return res.status(200).json(Booking);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  createBooking: async (req, res) => {
    const the_event=await EventModel.findById({_id:req.body.event})
    const amount = req.body.tickets * the_event.ticketPrice;
    const remainingTickets = the_event.remainingTickets - req.body.tickets;
    if(remainingTickets < 0) {
      return res.status(400).json({ message: "Not enough tickets available" });
    }
    const booking = new BookingModel({
      user: req.user.userId,
      event: req.body.event,
      tickets: req.body.tickets,
      totalPrice: req.body.totalPrice,
      status: "pending",
    });
    try {
      //
      const newBooking = await booking.save();
      newBooking.status = "confirmed";
      const confirmed = await booking.save();
      await EventModel.findByIdAndUpdate(req.body.event._id, {
        remainingTickets: remainingTickets,
      });
      return res.status(201).json(confirmed);
    } catch (e) {
      return res.status(400).json({ message: e.message });
    }
  },
  updateBooking: async (req, res) => {
    try {
      // lw fe values negative
      const Booking = await BookingModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      return res
        .status(200)
        .json({ Booking, msg: "booking updated successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  deleteBooking: async (req, res) => {
    try {
      // doesnt add the deleted tickets to the event
      // hena fe haga esmaha ?. used for chaining escpically nested or optional fields
      const booking=await BookingModel.findById(req.params.id).populate("event")
      if(booking.bookingStatus==='confirmed' && (booking.event.date).getTime() >Date.now() ){
      booking.event.remainingTickets=booking.event.remainingTickets+booking.tickets
      booking.event.totalNumberOfTickets=booking.event.totalNumberOfTickets+booking.tickets
      }
    

      const Booking = await BookingModel.findByIdAndDelete(req.params.id);
      if (!Booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      return res
        .status(200)
        .json({ Booking, msg: "booking deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  getUserBooking: async (req, res) => {
    try {
      //checkfor userexistance
      const booking = await BookingModel.findById(req.params.id)
      return res.status(200).json(booking.event);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getUserBookings: async (req, res) => {
    try {
      const bookings = await BookingModel.find({ user: req.user._id }).populate("event");
      return res.status(200).json(bookings);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
module.exports = BookingController;
