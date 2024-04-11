const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const UserRole = require('../models/userRoleModel')
const Role = require('../models/roleModel')

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
        const userExists = await User.findOne({ where: { email } });

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
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            address: address || null,
            phone: phone || null,
            rib: rib || null,
            sponsorship_code: sponsorshipCode
        });

        // Get the id of the inserted user
        const userId = user.id_user;

        // Insert a new row in the user_role table
        const userRole = await UserRole.create({
            user_id_user: userId,
            role_id_role: id_role
        });

        if (!userRole) {
            throw new Error('Error inserting the role of the user');
        }

        // If a sponsorship code was provided, insert a new row in the sponsorship table
        if (friend_code) {
            // Check if the sponsorship code exists
            const sponsor = await User.findOne({ where: { sponsorship_code: friend_code } });

            if (!sponsor) {
                throw new Error('Sponsorship code does not exist');
            }

            const user = await User.findByPk(userId);
            user.friend_code = friend_code;
            await user.save();
        }
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const loginUser = asyncHandler(async (req, res) => {
    // Retrieving body infos.
    const { email, password } = req.body

    // Check if the email exists in the db
    const user = await User.findOne({ where: { email } });

    // Get role of the user
    const role = await UserRole.findOne({ where: { user_id_user: user.id_user } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        res.status(401);
        throw new Error('Invalid email or password');
    } else {
        // Handling the response
        res.status(200).json({
            _id: user.id_user,
            username: user.username,
            email: user.email,
            token: generateToken(user.id_user, role.role_id_role)
        })
    }
});

// Generate JWT
const generateToken = (id_user, id_role) => {
    return jwt.sign(
        { id_user: id_user, id_role: id_role },
        process.env.JWT_SECRET,
        { expiresIn: '15min' }  // Token expires in 30 days
)};

const getMe = asyncHandler(async (req, res) => {
    if (req.user) {
        const user = await User.findByPk(req.user.id_user);

        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        res.json({
            id_user: user.id_user,
            name: user.username,
            email: user.email,
            address: user.address,
            phone: user.phone,
            sponsorshipCode: user.sponsorship_code,
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
        const id = req.user.id_user;
        const { username, email, password, address, phone, rib } = req.body;

        // Check if the user exists
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Update the user
        user.username = username;
        user.email = email;
        user.password = hashedPassword;
        user.address = address;
        user.phone = phone;
        user.rib = rib;
        await user.save();

        // Send a success response
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    try {
        // Get the user id from the request
        const id = req.user.id_user;

        // Check if the user exists
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        // Delete the user's roles
        await UserRole.destroy({ where: { user_id_user: id } });

        // Delete the user
        await User.destroy({ where: { id_user: id } });

        // Send a success response
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const getMeCommercial = asyncHandler(async (req, res) => {
    try {
        // Get the user id from the request
        const id = req.query.id;

        // Check if the user exists
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        // Get user name, email, address, phone, rib
        const { username, email, address, phone, rib } = user;

        // Define the relationships between the models
        Role.hasMany(UserRole, { foreignKey: 'role_id_role' });
        UserRole.belongsTo(Role, { foreignKey: 'role_id_role' });

        // Get the user's roles
        const roles = await UserRole.findOne({
            where: { user_id_user: id },
            include: {
                model: Role,
                attributes: ['title', 'description']
            }
        });

        // Send the user's roles
        res.json({ 
            id_user: id,
            username,
            email,
            address,
            phone,
            rib,
            roles
         });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const updateCommercial = asyncHandler(async (req, res) => {
    try {
        // Get the user id and the new data from the request
        const id = req.query.id;
        const { username, email, password, address, phone, rib, id_role } = req.body;

        // Check if the user exists
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Update the user
        user.username = username;
        user.email = email;
        user.password = hashedPassword;
        user.address = address;
        user.phone = phone;
        user.rib = rib;
        await user.save();

        // Update the user's roles
        await UserRole.destroy({ where: { user_id_user: id } });
        await UserRole.create({ user_id_user: id, role_id_role: id_role });

        // Send a success response
        res.json({ message: 'Commercial updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const deleteCommercial = asyncHandler(async (req, res) => {
    try {
        // Get the user id from the request
        const id = req.query.id;

        // Check if the user exists
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        // Delete the user's roles
        await UserRole.destroy({ where: { user_id_user: id } });

        // Delete the user
        await User.destroy({ where: { id_user: id } });

        // Send a success response
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const suspendCommercial = asyncHandler(async (req, res) => {
    try {
        // Get the user id from the request
        const id = req.query.id;
        console.log('id to suspend : ' + id);

        // Check if the user exists
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        // Update the user
        user.suspended_until = Date.now();
        await user.save();
        await UserRole.update({ role_id_role: 6 }, { where: { user_id_user: id } });
        // Generate a new token with the updated user role
        const token = jwt.sign({ id_user: id, id_role: 6 }, process.env.JWT_SECRET, { expiresIn: '30d' });

        // Send a success response with the new token
        res.json({ message: 'User suspended successfully', token: token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const unsuspendCommercial = asyncHandler(async (req, res) => {
    try {
        // Get the user id from the request
        const id = req.query.id;
        console.log('id to unsuspend : ' + id);

        // Check if the user exists
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        // Update the user
        user.suspended_until = null;
        await user.save();

        // Send a success response
        res.json({ message: 'User unsuspended successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = {
    registerUser,
    loginUser,
    getMe,
    updateUser,
    deleteUser,
    getMeCommercial,
    updateCommercial,
    deleteCommercial,
    suspendCommercial,
    unsuspendCommercial
};
