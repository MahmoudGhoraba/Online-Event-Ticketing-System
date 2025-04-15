const User = require('../Models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = 'mySuperSecretKey123'; // just make sure it's long/random enough
const userController = {
// Get all users
 getUsers : async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
},

// Get single user by ID
 getUserById : async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
},

// Update a user
 updateUser : async (req, res) => {
    try {
        const { name, email, profilePicture, role } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, email, profilePicture, role },
            { new: true }
        );

        if (!updatedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
},

// Delete a user
deleteUser : async (req, res) => {
    try {
        // maybe add the tickects he had if he has any tickets
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
},
// REGISTER
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

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
},

// LOGIN
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
      res.status(500).json({ message: "Server error" });
    }
},

};

module.exports = userController;
