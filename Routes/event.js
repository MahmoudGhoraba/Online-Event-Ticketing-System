const express=require("express");
 const eventController=require("../Controllers/eventController");
 const authorizationMiddleware=require('../Middleware/authorizeMiddleware');
 const authenticationMiddleware=require('../Middleware/authenticateMiddleware')
 const router=express.Router();
 router.post("/",authenticationMiddleware,authorizationMiddleware(["Organizer"]),eventController.createEvent);
 router.get("/",eventController.getPostedEvents);
 //api/v1/events/:id GET Get details of a single event Public
 router.get("/:id",eventController.getSingleEvent);
 router.put("/:id",authenticationMiddleware,authorizationMiddleware(["Organizer","Admin"]),eventController.updateEvent);
 router.delete("/:id",authenticationMiddleware,authorizationMiddleware(["Organizer","Admin"]),eventController.deleteEvent);
 module.exports=router;