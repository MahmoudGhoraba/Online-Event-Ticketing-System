const express=require("express")
const router=express.Router()

const userController=require("../Controllers/userController")

router.post("/register",userController.registerUser)
router.post("/login",userController.login)

router.post("/logout", (req, res) => {
  // Clear the JWT cookie (assuming cookie name is 'token')
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
});




router.put("/forgetPassword",userController.forgetPassword)
router.post("/authOTP",userController.authOTP)




module.exports=router;