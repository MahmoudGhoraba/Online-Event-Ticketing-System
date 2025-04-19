const express=require("express")
const router=express.Router()
const userController=require("../Controllers/userController")
const eventController=require("../Controllers/eventController")
const bookingController=require("../Controllers/BookingController")
const authorizationMiddleware=require('../Middleware/authorizeMiddleware');
const authenticationMiddleware=require('../Middleware/authenticateMiddleware')

router.get("/",authenticationMiddleware,authorizationMiddleware(["Admin"]),userController.getUsers)//HENA ESMAHA USERS

// here we put all types====>authenticated user
router.get("/profile",authenticationMiddleware,authorizationMiddleware(['Admin','User','Organizer']),userController.getUserProfile)
router.put("/profile",authenticationMiddleware,authorizationMiddleware(['Admin','User','Organizer']),userController.updateUserProfile)
router.get("/bookings",authenticationMiddleware,authorizationMiddleware(['User']),bookingController.getUserBookings)
router.get("/events",authenticationMiddleware,authorizationMiddleware(['Organizer']),userController.getUserEvents) // thats an error reminder
router.get("/events/analytics",authenticationMiddleware,authorizationMiddleware(['Organizer']),eventController.getOrganizerEventAnalytics)
router.get("/:id",authenticationMiddleware,authorizationMiddleware(['Admin']),userController.getUserById)
router.put("/:id",authenticationMiddleware,authorizationMiddleware(['Admin']),userController.updateUserRole)
router.delete("/:id",authenticationMiddleware,authorizationMiddleware(['Admin']),userController.deleteUser)

module.exports=router;