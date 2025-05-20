const express=require("express")
const router=express.Router()

const userController=require("../Controllers/userController")

router.post("/register",userController.registerUser)
router.post("/login",userController.login)


router.put("/forgetPassword",userController.forgetPassword)
router.post("/authOTP",userController.authOTP)




module.exports=router;