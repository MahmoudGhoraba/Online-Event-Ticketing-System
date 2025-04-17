const express=require("express")
const router=express.Router()
const userController=require("../Controllers/userController")
const eventController=require("../Controllers/eventController")
const bookingController=require("../Controllers/BookingController")


router.post("/",/*MIIDLEWARE nomraluser ONLY authorizationMiddleware(['']),*/bookingController.createBooking)

router.get("/:id",/*MIIDLEWARE nomraluser ONLY authorizationMiddleware(['']),*/bookingController.getBooking)//HENA FE HAGA ESMAHA getUserBooking????
router.delete("/:id",/*MIIDLEWARE nomraluser ONLY authorizationMiddleware(['']),*/bookingController.deleteBooking)