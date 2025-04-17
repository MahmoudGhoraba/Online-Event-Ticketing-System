const express=require("express")
const router=express.Router()
const userController=require("../Controllers/userController")
const eventController=require("../Controllers/eventController")
const bookingController=require("../Controllers/BookingController")

<<<<<<< HEAD
router.get("/",/*MIIDLEWARE ADMIN ONLY authorizationMiddleware(['Admin']),*/userController.getAllUsers)//HENA ESMAHA USERS

// here we put all types====>authenticated user
router.get("/profile",/*MIIDLEWARE all ppl authorizationMiddleware(['Admin',...,..]),*/userController.getUserProfile)
router.put("/profile",/*MIIDLEWARE all ppl authorizationMiddleware(['Admin',...,..]),*/userController.updateUserProfile)
=======
router.get("/",/*MIIDLEWARE ADMIN ONLY authorizationMiddleware(['Admin']),*/userController.getUsers)
router.get("/profile",userController.getUserById)
router.get("/events",authenticationMiddleware,authorizationMiddleware["Organizer"],userController.getUserEvents)
router.put("/profile",userController.updateUser)
>>>>>>> origin/main

router.get("/:id",/*MIIDLEWARE ADMIN ONLY authorizationMiddleware(['Admin']),*/userController.getUserById)
router.put("/:id",/*MIIDLEWARE ADMIN ONLY authorizationMiddleware(['Admin']),*/userController.updateUserRole)
router.delete("/:id",/*MIIDLEWARE ADMIN ONLY authorizationMiddleware(['Admin']),*/userController.deleteUser)
<<<<<<< HEAD


router.get("/bookings",/*MIIDLEWARE normal user ONLY authorizationMiddleware(['']),*/bookingController.getUserBookings)
=======
router.get("/events/analytics",/*MIIDLEWARE ADMIN ONLY authorizationMiddleware(['EventOragniser']),*/eventController.getOrganizerEventAnalytics)
///api/v1/users/bookings GET Get current user’s bookings Standard User
///api/v1/users/events GET Get current user’s events Event Organizer



>>>>>>> origin/main


router.get("/events",/*MIIDLEWARE ADMIN ONLY authorizationMiddleware(['EventOragniser']),*/userController)
router.get("/events/analytics",/*MIIDLEWARE ADMIN ONLY authorizationMiddleware(['EventOragniser']),*/eventController.getOrganizerEventAnalytics)