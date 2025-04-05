const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// @router POST /api/users/register
// @desc Register a new user
// @access Public
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Cek apakah user sudah ada
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Buat user baru
        user = new User({ name, email, password });
        await user.save();

        // Buat payload JWT
        const payload = { user: { id: user._id, role: user.role } };

        // Sign token
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" }, (err, token) => {
            if (err) throw err;

            // Send user and token response
            res.status(201).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token,
            });
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
});

// @router POST /api/users/login
// @desc Authenticate user
// @access Public
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        let user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "Invalid Credentials" });

        const isMatch = await user.isPasswordMatch(password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

        // Buat payload JWT
        const payload = { user: { id: user._id, role: user.role } };

        // Sign token
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "40h" }, (err, token) => {
            if (err) throw err;

            // Send user and token response
            res.json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                token,
            });
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// @

module.exports = router;
