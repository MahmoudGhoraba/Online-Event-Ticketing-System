const express=require("express")
const router=express.Router()
const userController=require("../Controllers/userController")
const eventController=require("../Controllers/eventController")
const bookingController=require("../Controllers/BookingController")
const authorizationMiddleware=require('../Middleware/authorizationMiddleware');
const authenticationMiddleware=require('../Middleware/authenticationMiddleware')

router.post("/",authenticateMiddleware,authorizationMiddleware(['User']),bookingController.createBooking)

router.get("/:id",authenticateMiddleware,authorizationMiddleware(['User']),bookingController.getAllBooking)
router.delete("/:id",authenticateMiddleware,authorizationMiddleware(['User']),bookingController.deleteBooking)




module.exports=router