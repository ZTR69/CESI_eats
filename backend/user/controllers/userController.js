const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const UserModel = require('../models/userModel')
const { query } = require('../config/db')

const registerUser = asyncHandler(async (req, res) => {
    try {
        // Retrieving body informations.
        const { username, email, password, address, phone, rib, id_role, friend_code} = req.body
        // Check if the email is in the correct format
        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
        if (!emailRegex.test(email)) {
            res.status(400);
            throw new Error('Invalid email format');
        }
        // Check if all fields are filled
        if (!username || !email || !password) {
            res.status(400)
            throw new Error('Please add all fields')
        }
        
        // Check if user already exists
        const users = await query('SELECT * FROM user');
        const userExists = users.find(user => user.email === email);

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Generate a sponsorship code
        const sponsorshipCode = Math.floor(Math.random() * 1000000000); // This will generate a random integer between 0 and 999999999

        // Create the user
        const result_user = await query('INSERT INTO user (username, email, password, address, phone, rib, sponsorship_code) VALUES (?, ?, ?, ?, ?, ?, ?)', [username, email, hashedPassword, address || null, phone || null, rib || null, sponsorshipCode]);
        if (result_user.affectedRows === 0) {
            throw new Error('Error inserting the user');
        }

        // Get the id of the inserted user
        const userId = result_user.insertId;

        // Insert a new row in the user_role table
        const result_role = await query('INSERT INTO user_has_role (user_id_user, role_id_role) VALUES (?, ?)', [userId, id_role]);
        if (result_role.affectedRows === 0) {
            throw new Error('Error inserting the  role of the user');
        }
        // If a sponsorship code was provided, insert a new row in the sponsorship table
        if (friend_code) {
            // Check if the sponsorship code exists
            const [sponsor] = await query('SELECT * FROM user WHERE sponsorship_code = ?', [friend_code]);
            if (!sponsor) {
                throw new Error('Sponsorship code does not exist');
            }
            await query('UPDATE user SET friend_code = ? WHERE id_user = ?', [friend_code, userId]);
        }
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

const loginUser = asyncHandler(async (req, res) => {
    // Retrieving body infos.
    const { email, password } = req.body

    // Check if the email exists in the db
    const [user] = await query('SELECT * FROM user WHERE email = ?', [email]);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401);
        throw new Error('Invalid email or password');
    } else {
        // Handling the response
        res.status(200).json({
            _id: user.id_user,
            username: user.username,
            email: user.email,
            token: generateToken(user.id_user)
        })
    }
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

const getMe = asyncHandler(async (req, res) => {
    if (req.user) {
        const [sponsorshipCodeResult] = await query('SELECT sponsorship_code FROM user WHERE id_user = ?', [req.user.id_user]);
        res.json({
            id_user: req.user.id_user,
            name: req.user.username,
            email: req.user.email,
            sponsorshipCode: sponsorshipCodeResult.sponsorship_code,
            token: req.headers.authorization
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

const updateUser = asyncHandler(async (req, res) => {
    try {
        // Get the user id and the new data from the request
        const { id, username, email, password, address, phone, rib } = req.body;

        // Check if the user exists
        const [user] = await query('SELECT * FROM user WHERE id = ?', [id]);
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        // Update the user
        await query('UPDATE user SET username = ?, email = ?, password = ?, address = ?, phone = ?, rib = ? WHERE id = ?', [username, email, password, address, phone, rib, id]);

        // Send a success response
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    try {
        // Get the user id from the request
        const { id } = req.body;

        // Check if the user exists
        const [user] = await query('SELECT * FROM user WHERE id = ?', [id]);
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        // Delete the user
        await query('DELETE FROM user WHERE id = ?', [id]);

        // Send a success response
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = {
    registerUser,
    loginUser,
    getMe,
    updateUser,
    deleteUser
};
