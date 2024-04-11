const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const UserRole = require('../models/userRoleModel')
const Role = require('../models/roleModel')

/**
 * @swagger
 * /api/users/register:
 *  post:
 *   summary: Register a new user
 *  description: Register a new user
 *  requestBody:
 *   required: true
 *  content:
 *  application/json:
 *  schema:
 *  type: object
 * properties:
 * username:
 * type: string
 * email:
 * type: string
 * password:
 * type: string
 * address:
 * type: string
 * phone:
 * type: string
 * rib:
 * type: string
 * id_role:
 * type: integer
 * friend_code:
 * type: string
 * required:
 * - username
 * - email
 * - password
 * - id_role
 * responses:
 * 201:
 * description: User created successfully
 * 400:
 * description: Invalid email format
 * 400:
 * description: Please add all fields
 *  400:
 * description: User already exists
 * 500:
 * description: An error occurred
 * tags:
 * - users
 * security:
 * - bearerAuth: []
 * 
 */
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

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email.
 *               password:
 *                 type: string
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: The user was logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: A JWT for the authenticated user.
 *       400:
 *         description: Bad request. User not found or password is wrong.
 *       500:
 *         description: There was an error logging in the user.
 */
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

/**
 * @swagger
 * components:
 *   schemas:
 *     Token:
 *       type: object
 *       properties:
 *         id_user:
 *           type: integer
 *           description: The user's id.
 *         id_role:
 *           type: integer
 *           description: The role's id.
 *       example:
 *         id_user: 1
 *         id_role: 2
 * 
 * /generateToken:
 *   post:
 *     summary: Generate a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Token'
 *     responses:
 *       200:
 *         description: The token was generated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: A JWT for the authenticated user.
 *       500:
 *         description: There was an error generating the token.
 */
const generateToken = (id_user, id_role) => {
    return jwt.sign(
        { id_user: id_user, id_role: id_role },
        process.env.JWT_SECRET,
        { expiresIn: '15min' }  // Token expires in 30 days
)};

/**
 * @swagger
 * /getMe:
 *   get:
 *     summary: Get the authenticated user's information
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The user's information was retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_user:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 // Add other user properties here
 *       404:
 *         description: The user was not found.
 *       500:
 *         description: There was an error retrieving the user's information.
 */
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

/**
 * @swagger
 * /updateUser:
 *   put:
 *     summary: Update the authenticated user's information
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *               rib:
 *                 type: string
 *     responses:
 *       200:
 *         description: The user's information was updated successfully.
 *       404:
 *         description: The user was not found.
 *       500:
 *         description: There was an error updating the user's information.
 */
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

/**
 * @swagger
 * /deleteUser:
 *   delete:
 *     summary: Delete the authenticated user's account
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The user's account was deleted successfully.
 *       404:
 *         description: The user was not found.
 *       500:
 *         description: There was an error deleting the user's account.
 */
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

/**
 * @swagger
 * /getMeCommercial:
 *   get:
 *     summary: Get the commercial user's information
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The commercial user's information was retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_user:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 // Add other user properties here
 *       404:
 *         description: The commercial user was not found.
 *       500:
 *         description: There was an error retrieving the commercial user's information.
 */
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

/**
 * @swagger
 * /updateCommercial:
 *   put:
 *     summary: Update the commercial user's information
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *               rib:
 *                 type: string
 *               id_role:
 *                 type: integer
 *     responses:
 *       200:
 *         description: The commercial user's information was updated successfully.
 *       404:
 *         description: The commercial user was not found.
 *       500:
 *         description: There was an error updating the commercial user's information.
 */
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

/**
 * @swagger
 * /deleteCommercial:
 *   delete:
 *     summary: Delete the commercial user's account
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The commercial user's account was deleted successfully.
 *       404:
 *         description: The commercial user was not found.
 *       500:
 *         description: There was an error deleting the commercial user's account.
 */
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

/**
 * @swagger
 * /suspendCommercial:
 *   put:
 *     summary: Suspend the commercial user's account
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The commercial user's account was suspended successfully.
 *       404:
 *         description: The commercial user was not found.
 *       500:
 *         description: There was an error suspending the commercial user's account.
 */
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

/**
 * @swagger
 * /unsuspendCommercial:
 *   put:
 *     summary: Unsuspend the commercial user's account
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The commercial user's account was unsuspended successfully.
 *       404:
 *         description: The commercial user was not found.
 *       500:
 *         description: There was an error unsuspending the commercial user's account.
 */
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
