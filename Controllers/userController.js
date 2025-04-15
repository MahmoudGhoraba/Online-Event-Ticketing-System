const User = require('../Models/user');
const bcrypt = require('bcryptjs');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");


const secretKey = 'mySuperSecretKey123'; 
const userController = {
 getUsers : async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
},
getUserProfile: async (req,res)=>{
     try{
        const userProfile=await User.findById(req.user.userId);
        return res.status(200).json({userProfile});
     }catch(error){
        return res.status(500).json({ error: err.message });
     }
},
 getUserById : async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
},
 updateUserProfile:async (req, res) => {
    try {
        const { name, email, profilePicture, role } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.user.userId,
            { name, email, profilePicture, role },
            { new: true }
        );

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
},
updateUserRole: async (req, res) => {
    try {
        const {role} = req.body.role;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {role},
            { new: true }
        );
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json(updatedUser);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
},
deleteUser : async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
},
registerUser : async (req, res) => {
    try {
        const { name, email, password, role, profilePicture } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            profilePicture,
        });

        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
},
login: async (req, res) => {
    try {
      const {email, password} = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "email not found" });
      }

      console.log("password (hashed in DB): ", user.password);

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(405).json({ message: "incorrect password" });
      }

      const currentDateTime = new Date();
      const expiresAt = new Date(currentDateTime.getTime() + 1800000); // 30 mins

      const token = jwt.sign(
        { user: { userId: user._id, role: user.role } },
        secretKey,
        { expiresIn: 3 * 60 * 60 }
      );
      return res
        .cookie("token", token, {
          expires: expiresAt,
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .status(200)
        .json({ message: "login successfully", user });
    } catch (error) {
      console.error("Error logging in:", error);
      return res.status(500).json({ message: "Server error" });
    }
},forgetPassword: async(req,res)=>{
    const theusere_mail=req.body.email
try{
    const user=await User.findOne({email:theusere_mail})

    // check if the user is logged in if he we might not allow forget password for amr

    if(!flag){
        return res.status(404).json({message:"Somethin is wrong we cpuldnt find the user (forget password)"})
    }

    const otp_pass=crypto.randomInt(10000000,99999999)
    const enddate=new Date(Date.now+ 10*60*1000)

    user.otp.temp=otp_pass
    user.otp.expiry=enddate
    
    const testAccount=await nodemailer.createTestAccount()


    let transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // Ethereal test user
          pass: testAccount.pass, // Ethereal test password
        },
      });

      
    
    await user.save()

    let info = await transporter.sendMail({
        from: '"BOOKING FULL STACK" <no-reply@example.com>', // sender
        to: "TEAM SPAGEHTII@example.com",                      // receiver
        subject: "Hello from Nodemailer!",
        text: `the opt is: ${user.otp.temp} , the date for expiry us: ${user.otp.expiry}`,
        html: "<b>This is an HTML message</b>",
      });

      console.log("Preview URL:", nodemailer.getTestMessageUrl(info));


      // we need to make it for gmail




    return res.status(200).json({message:`the otp value :${otp_pass} and the enddate is ${enddate} done as expected`})
}
catch(error){
    console.error("AN ERROR OCCURED IN USER_CONTROLLER FORGOT PASSWORD")
    return res.status(500).json({ message: "Server error of await" });
}

},  authOTP: async(req,res)=>{
    const {email,otp,pass}=req.body
    try{
        const user=User.findOne({email})
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        if(otp !==user.otp.temp || otp.expiry<=Date.now()){
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;

        user.otp.temp = null;
        user.otp.expiry = null;
        await user.save();
        return res.status(200).json({ message: "OTP verified successfully" });
    }
    catch(error){
        console.log("error in authotp")
        return res.status(500).json({message:"error in authotp"})
    }
}
}
module.exports = userController;
