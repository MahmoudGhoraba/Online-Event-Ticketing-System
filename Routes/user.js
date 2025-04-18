const express=require("express")
const router=express.Router()
const userController=require("../Controllers/userController")
const eventController=require("../Controllers/eventController")
const bookingController=require("../Controllers/BookingController")

router.get("/",/*MIIDLEWARE ADMIN ONLY authorizationMiddleware(['Admin']),*/userController.getAllUsers)//HENA ESMAHA USERS

// here we put all types====>authenticated user
router.get("/profile",/*MIIDLEWARE all ppl authorizationMiddleware(['Admin',...,..]),*/userController.getUserProfile)
router.put("/profile",/*MIIDLEWARE all ppl authorizationMiddleware(['Admin',...,..]),*/userController.updateUserProfile)

router.get("/:id",/*MIIDLEWARE ADMIN ONLY authorizationMiddleware(['Admin']),*/userController.getUserById)
router.put("/:id",/*MIIDLEWARE ADMIN ONLY authorizationMiddleware(['Admin']),*/userController.updateUserRole)
router.delete("/:id",/*MIIDLEWARE ADMIN ONLY authorizationMiddleware(['Admin']),*/userController.deleteUser)


router.get("/bookings",/*MIIDLEWARE normal user ONLY authorizationMiddleware(['']),*/bookingController.getUserBookings)


router.get("/events",/*MIIDLEWARE ADMIN ONLY authorizationMiddleware(['EventOragniser']),*/userController.getUserEvents)// thats an error reminder
router.get("/events/analytics",/*MIIDLEWARE ADMIN ONLY authorizationMiddleware(['EventOragniser']),*/eventController.getOrganizerEventAnalytics)