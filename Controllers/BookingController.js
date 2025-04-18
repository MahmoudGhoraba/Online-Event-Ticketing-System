
const BookingModel = require("../Models/Booking");
const EventModel = require("../Models/Event");

const BookingController = {
  getAllBooking: async (req, res) => {
    try {
      //maybe add a line for the case someone didnt book before
      const Bookings = await BookingModel.find();
      if(!Bookings){
        return res.status(500).json({ message: 'no Bookings are found'})
      }
      return res.status(200).json(Bookings);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  },
  getBooking: async (req, res) => {
    try {
            //maybe add a line for the case someone didnt book before
      const Booking = await BookingModel.findById(req.params.id);
      if(!Bookings){
        return res.status(500).json({ message: 'no Booking ID are found'})
      }
      return res.status(200).json(Booking);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  createBooking: async (req, res) => {
    try {
        // Fetch the event from the database
        const event = await EventModel.findById(req.body.event);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        // Check ticket availability
        const remainingTickets = event.remainingTickets - req.body.tickets;
        if (remainingTickets < 0) {
            return res.status(400).json({ message: "Not enough tickets available" });
        }

        // Calculate total price
        const totalPrice = req.body.tickets * event.ticketPrice;

        // Create a new booking
        const booking = new BookingModel({
            user: req.user.userId,
            event: event._id,
            tickets: req.body.tickets,
            totalPrice: totalPrice,
            bookingStatus: "confirmed", // Directly set to confirmed
        });

        // Save the booking and update the event atomically
        const session = await BookingModel.startSession();
        session.startTransaction();
        try {
            await booking.save({ session });
            await EventModel.findByIdAndUpdate(
                event._id,
                { remainingTickets: remainingTickets },
                { session }
            );
            await session.commitTransaction();
            session.endSession();

            return res.status(201).json(booking);
        } catch (err) {
            await session.abortTransaction();
            session.endSession();
            throw err;
        }
    } catch (e) {
        return res.status(400).json({ message: e.message });
    }
}
  /*createBooking: async (req, res) => {
    const amount = req.body.tickets * req.body.event.ticketPrice;
    const remainingTickets = req.body.event.remainingTickets - req.body.tickets;
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
  }*/,
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
      const booking=await BookingModel.findById(req.params.id).populate("Event")
      if(booking.bookingStatus==='confirmed' && booking.event.getTimestamp >=Date.now ){
      linkedevent.event.remainingTickets=linkedevent.event.remainingTickets+linkedevent.tickets
      linkedevent.event.totalNumberOfTickets=linkedevent.event.totalNumberOfTickets+linkedevent.tickets
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
      if(!booking){
        return res.status(500).json({ message: 'no Booking ID are found'})
      }
      return res.status(200).json(booking.event);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getUserBookings: async (req, res) => {
    try {
      const bookings = await BookingModel.find({ user: req.user._id }).populate("event");
      if(!bookings){
        return res.status(500).json({ message: 'no Booking ID are found'})
      }
      return res.status(200).json(bookings);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
module.exports = BookingController;
