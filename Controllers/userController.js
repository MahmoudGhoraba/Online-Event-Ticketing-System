const User = require('../Models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = 'mySuperSecretKey123'; 
const userController = {
getUserEvents : async (req, res) => {
    try {
        const userId = req.user.userId; 
        const events = await Event.find({ organizer: userId }); 
        return res.status(200).json({ events });
    } catch (err) {
        return res.status(500).json({ error: "Failed to fetch user events" });
        }
},
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
      const { email, password } = req.body;

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
},

};

module.exports = userController;
