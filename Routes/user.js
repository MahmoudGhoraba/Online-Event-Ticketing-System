const express=require("express")
const router=express.Router()
const userController=require("../Controllers/userController")
const eventController=require("../Controllers/eventController")
const bookingController=require("../Controllers/BookingController")
const authorizationMiddleware=require('../Middleware/authorizationMiddleware');
const authenticationMiddleware=require('../Middleware/authenticationMiddleware')

router.get("/",authenticateMiddleware,authorizeMiddleware(["Admin"]),userController.getUsers)//HENA ESMAHA USERS

// here we put all types====>authenticated user
router.get("/profile",authenticationMiddleware,authorizeMiddleware(['Admin','User','Organizer']),userController.getUserProfile)
router.put("/profile",authenticationMiddleware,authorizeMiddleware(['Admin','User','Organizer']),userController.updateUserProfile)
router.get("/bookings",authenticationMiddleware,authorizationMiddleware(['User']),bookingController.getUserBookings)
router.get("/events",authenticationMiddleware,authorizationMiddleware(['Oragnizer']),userController.getUserEvents) // thats an error reminder
router.get("/events/analytics",authenticationMiddleware,authorizationMiddleware(['Oragnizer']),eventController.getOrganizerEventAnalytics)
router.get("/:id",authenticationMiddleware,authorizationMiddleware(['Admin']),userController.getUserById)
router.put("/:id",authenticationMiddleware,authorizationMiddleware(['Admin']),userController.updateUserRole)
router.delete("/:id",authenticationMiddleware,authorizationMiddleware(['Admin']),userController.deleteUser)
