const express=require("express")
const router=express.Router()
const userController=require("../Controllers/userController")
const eventController=require("../Controllers/eventController")
const bookingController=require("../Controllers/BookingController")

router.get("/",authenticateMiddleware,authorizeMiddleware(["Admin"]),userController.getUsers)//HENA ESMAHA USERS

// here we put all types====>authenticated user
router.get("/profile",authenticateMiddleware,authorizeMiddleware(['Admin','User','Organizer']),userController.getUserProfile)
router.put("/profile",authenticateMiddleware,authorizeMiddleware(['Admin','User','Organizer']),userController.updateUserProfile)
router.get("/bookings",authenticateMiddleware,authorizationMiddleware(['User']),bookingController.getUserBookings)
router.get("/events",authenticateMiddleware,authorizationMiddleware(['Oragnizer']),userController.getUserEvents) // thats an error reminder
router.get("/events/analytics",authenticateMiddleware,authorizationMiddleware(['Oragnizer']),eventController.getOrganizerEventAnalytics)
router.get("/:id",authenticateMiddleware,authorizationMiddleware(['Admin']),userController.getUserById)
router.put("/:id",authenticateMiddleware,authorizationMiddleware(['Admin']),userController.updateUserRole)
router.delete("/:id",authenticateMiddleware,authorizationMiddleware(['Admin']),userController.deleteUser)
