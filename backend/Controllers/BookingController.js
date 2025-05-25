const BookingModel = require("../Models/Booking");
const EventModel = require("../Models/Event");

const BookingController = {
  getAllBooking: async (req, res) => {
    try {
      const bookings = await BookingModel.find();
      if (!bookings?.length) {
        return res.status(200).json({ 
          message: 'No bookings found',
          data: []
        });
      }
      return res.status(200).json(bookings);
    } catch (e) {
      return res.status(500).json({ message: e?.message || 'Internal server error' });
    }
  },

  getUserBooking: async (req, res) => {
    try {
      if (!req?.params?.id || !req?.user?.userId) {
        return res.status(400).json({ 
          message: 'Missing required parameters' 
        });
      }

      const booking = await BookingModel.findOne({
        _id: req.params.id,
        user: req.user.userId
      }).populate("event");

      if (!booking) {
        return res.status(404).json({ 
          message: 'No booking found for this user with the given ID' 
        });
      }

      return res.status(200).json(booking);
    } catch (error) {
      return res.status(500).json({ 
        message: error?.message || 'Internal server error' 
      });
    }
  },

  createBooking: async (req, res) => {
    try {
      // Validate required fields
      if (!req?.body?.event || !req?.body?.tickets || !req?.user?.userId) {
        return res.status(400).json({ 
          message: "Missing required booking information" 
        });
      }

      const event = await EventModel.findById(req?.body?.event);
      if (!event) {
        return res.status(404).json({ 
          message: "Event not found" 
        });
      }

      if (event?.status !== "approved") {
        return res.status(400).json({ 
          message: "Event not approved" 
        });
      }

      const ticketsRequested = Number(req.body.tickets);
      if (isNaN(ticketsRequested) || ticketsRequested < 1) {
        return res.status(400).json({ 
          message: "Invalid number of tickets requested" 
        });
      }

      const remainingTickets = event.remainingTickets - ticketsRequested;
      if (remainingTickets < 0) {
        return res.status(400).json({ 
          message: "Not enough tickets available",
          available: event.remainingTickets 
        });
      }

      const totalPrice = ticketsRequested * (event?.ticketPrice ?? 0);
      if (totalPrice <= 0) {
        return res.status(400).json({ 
          message: "Invalid ticket price calculation" 
        });
      }

      const booking = new BookingModel({
        user: req.user.userId,
        event: event._id,
        tickets: ticketsRequested,
        totalPrice,
        bookingStatus: "confirmed"
      });

      await booking.save();
      await EventModel.findByIdAndUpdate(event._id, {
        remainingTickets: remainingTickets
      });

      return res.status(201).json(booking);
    } catch (e) {
      return res.status(400).json({ 
        message: e?.message || 'Failed to create booking' 
      });
    }
  },

  updateBooking: async (req, res) => {
    try {
      if (!req?.params?.id || !req?.body) {
        return res.status(400).json({ 
          message: "Missing required update information" 
        });
      }

      const booking = await BookingModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!booking) {
        return res.status(404).json({ 
          message: "Booking not found" 
        });
      }

      return res.status(200).json({ 
        booking, 
        message: "Booking updated successfully" 
      });
    } catch (error) {
      return res.status(500).json({ 
        message: error?.message || 'Failed to update booking' 
      });
    }
  },

  deleteBooking: async (req, res) => {
    try {
      if (!req?.params?.id || !req?.user?.userId) {
        return res.status(400).json({ 
          message: "Missing required deletion information" 
        });
      }

      const booking = await BookingModel.findOne({
        _id: req.params.id,
        user: req.user.userId
      }).populate("event");

      if (!booking) {
        return res.status(404).json({ 
          message: "Booking not found" 
        });
      }

      // Check if refund is possible
      if (
        booking?.bookingStatus === 'confirmed' && 
        booking?.event?.date && 
        new Date(booking.event.date) > new Date()
      ) {
        // Update event tickets only if conditions are met
        booking.event.remainingTickets += booking.tickets;
        await booking.event.save();
      }

      await BookingModel.findByIdAndDelete(req.params.id);

      return res.status(200).json({ 
        booking, 
        message: "Booking deleted successfully" 
      });
    } catch (error) {
      return res.status(500).json({ 
        message: error?.message || 'Failed to delete booking' 
      });
    }
  },

  getUserBookings: async (req, res) => {
    try {
      if (!req?.user?.userId) {
        return res.status(400).json({ 
          message: "User ID is required" 
        });
      }

      const bookings = await BookingModel.find({ 
        user: req.user.userId 
      }).populate("event");

      return res.status(200).json({
        bookings: bookings ?? [],
        count: bookings?.length ?? 0
      });
    } catch (error) {
      return res.status(500).json({ 
        message: error?.message || 'Failed to fetch user bookings' 
      });
    }
  },
};

module.exports = BookingController;