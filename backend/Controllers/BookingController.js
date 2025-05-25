
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
  getUserBooking: async (req, res) => {
    try {
        // Check for booking existence with both booking ID and user ID
        const booking = await BookingModel.findOne({
            _id: req.params.id,
            user: req.user.userId
        }).populate("event"); // Populate event details if needed

        if (!booking) {
            return res.status(404).json({ message: 'No booking found for this user with the given ID' });
        }

        return res.status(200).json(booking);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
},
  createBooking: async (req, res) => {
    try {
        // Fetch the event from the database
        const event = await EventModel.findById(req.body.event);
        if (!event ) {
            return res.status(404).json({ message: "Event not found" });
        }
        if (event.status!=="approved" ) {
          return res.status(404).json({ message: "Event not approved" });
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
            bookingStatus: "pending"
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
            booking.bookingStatus='confirmed'
            await booking.save({ session });
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
      const booking = await BookingModel.findOne({
        _id: req.params.id,
        user: req.user.userId
      }).populate("event");
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      // do we make it a session?
      console.log("line 133")
      console.log(booking.bookingStatus)
      if(booking.bookingStatus==='confirmed' && (booking.event.date).getTime() >Date.now() ){
      booking.event.remainingTickets=booking.event.remainingTickets+booking.tickets
      await booking.event.save()
      }
      console.log("line 138")
      await BookingModel.findByIdAndDelete(req.params.id)
      return res
        .status(200)
        .json({ booking, msg: "booking deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  ,
  getUserBookings: async (req, res) => {
    try {
      const bookings = await BookingModel.find({ user: req.user.userId }).populate("event");
      if (bookings.length === 0) {
        return res.status(200).json({ message: 'No bookings found', bookings: [] });
      }
      return res.status(200).json(bookings);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
}
module.exports = BookingController;