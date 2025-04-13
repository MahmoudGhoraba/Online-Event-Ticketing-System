const express=require("express")
const router=express.Router()
const userController=require("../Controllers/userController")
const eventController=require("../Controllers/eventController")
const bookingController=require("../Controllers/BookingController")

router.get("/",/*MIIDLEWARE ADMIN ONLY authorizationMiddleware(['Admin']),*/userController.getUsers)
router.get("/profile",userController.getUserById)
router.put("/profile",userController.updateUser)

router.get("/:id",/*MIIDLEWARE ADMIN ONLY authorizationMiddleware(['Admin']),*/userController.getUserById)
router.put("/:id",/*MIIDLEWARE ADMIN ONLY authorizationMiddleware(['Admin']),*/userController.updateUser)
router.delete("/:id",/*MIIDLEWARE ADMIN ONLY authorizationMiddleware(['Admin']),*/userController.deleteUser)

//===========> router.get("/events",/*MIIDLEWARE ADMIN ONLY authorizationMiddleware(['EventOragniser']),*/bookingController.g)
router.get("/events/analytics",/*MIIDLEWARE ADMIN ONLY authorizationMiddleware(['EventOragniser']),*/eventController.getOrganizerEventAnalytics)





