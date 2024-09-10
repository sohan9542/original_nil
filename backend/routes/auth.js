const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const requestIp = require('request-ip');
const axios = require('axios');
const router = express.Router();

// Sign up route
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ name, email, password });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Fetch user location based on IP address
        const clientIp = requestIp.getClientIp(req);
        const locationResponse = await axios.get(`https://ipapi.co/${clientIp}/json/`);
        
        if (locationResponse.data) {
            user.city = locationResponse.data.city || 'Unknown';
            user.country = locationResponse.data.country_name || 'Unknown';
        } else {
            user.city = 'Unknown';
            user.country = 'Unknown';
        }

        await user.save();

        // Generate JWT
        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Sign in route
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const payload = { user: { id: user.id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
