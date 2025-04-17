const express=require("express")
const router=express.Router()
const userController=require("../Controllers/userController")
const eventController=require("../Controllers/eventController")
const bookingController=require("../Controllers/BookingController")

router.get("/:id",/*MIIDLEWARE ADMIN ONLY authorizationMiddleware(['user']),*/bookingController.getAllBooking)

router.post("/",/*MIIDLEWARE ADMIN ONLY authorizationMiddleware(['user']),*/bookingController.createBooking)

router.delete("/:id",/*MIIDLEWARE ADMIN ONLY authorizationMiddleware(['user']),*/bookingController.deleteBooking)

module.exports=router