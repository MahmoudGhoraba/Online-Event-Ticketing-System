
const express = require("express");
const router = express.Router();
const bookingController = require("../Controllers/BookingController");
const authorizationMiddleware = require('../Middleware/authorizeMiddleware');
const authenticationMiddleware = require('../Middleware/authenticateMiddleware');

router.post("/", authenticationMiddleware, authorizationMiddleware(['User']), bookingController.createBooking);


router.get("/:id", authenticationMiddleware, authorizationMiddleware(['User']), bookingController.getAllBooking);

// Route to delete a booking
router.delete("/:id", authenticationMiddleware, authorizationMiddleware(['User']), bookingController.deleteBooking);

module.exports = router;