const asyncHandler = require('express-async-handler')
const Restaurant = require('../models/restaurantModel')

const createRestaurant = asyncHandler(async (req, res) => {
    const { Name, Note, Adress, Image } = req.body;
    const user_id_user = req.user.id_user;
    console.log('user try to create restaurant with id: ', user_id_user);

    // Check if exist a restaurant with the same name
    const restaurantExist = await Restaurant.findOne({ where: { Name } });
    if (restaurantExist) {
        res.status(400);
        throw new Error('Restaurant already exist');
    }
    const restaurant = await Restaurant.create({
        Name,
        Note,
        Adress,
        user_id_user,
        Image
    });
    if (restaurant) {
        res.status(201).json({
            id_restaurant: restaurant.id_restaurant,
            Name: restaurant.Name,
            Note: restaurant.Note,
            Adress: restaurant.Adress,
            user_id_user: user_id_user,
            Image: restaurant.Image
        });
    } else {
        res.status(400);
        throw new Error('Invalid restaurant data');
    }
});

const getRestaurants = asyncHandler(async (req, res) => {
    const restaurants = await Restaurant.findAll()
    res.json(restaurants)
});

const getRestaurantById = asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.query.id)

    // Check if the user is the owner of the restaurant
    if (restaurant.user_id_user !== req.user.id_user) {
        res.status(401)
        throw new Error('You are not the owner of this restaurant')
    }

    if (restaurant) {
        res.json(restaurant)
    } else {
        res.status(404)
        throw new Error('Restaurant not found')
    }
});

const updateRestaurant = asyncHandler(async (req, res) => {
    const { Name, Note, Adress } = req.body
    const restaurant = await Restaurant.findByPk(req.query.id)
    // Check if the user is the owner of the restaurant
    if (restaurant.user_id_user !== req.user.id_user) {
        res.status(401)
        throw new Error('You are not the owner of this restaurant')
    }
    if (restaurant) {
        restaurant.Name = Name
        restaurant.Note = Note
        restaurant.Adress = Adress
        restaurant.user_id_user = req.user.id_user
        await restaurant.save()
        res.json(restaurant)
    } else {
        res.status(404)
        throw new Error('Restaurant not found')
    }
});

const deleteRestaurant = asyncHandler(async (req, res) => {
    const restaurant = await Restaurant.findByPk(req.query.id)
    // Check if the user is the owner of the restaurant
    if (restaurant.user_id_user !== req.user.id_user) {
        res.status(401)
        throw new Error('You are not the owner of this restaurant')
    }

    if (restaurant) {
        await restaurant.destroy()
        res.json({ message: 'Restaurant removed' })
    } else {
        res.status(404)
        throw new Error('Restaurant not found')
    }
});

const initRestaurants = asyncHandler(async () => {
    // Create some restaurants
    await Restaurant.bulkCreate([
        { Name: 'McDonalds', Note: 4.5, Adress: '1 rue de la paix', user_id_user: 1, Image: 'https://www.mcdonalds.fr/sites/default/files/2021-03/Logo_McDo_0.png' },
        { Name: 'KFC', Note: 4.3, Adress: '2 rue de la paix', user_id_user: 2, Image: 'https://www.kfc.fr/sites/default/files/2021-03/Logo_KFC_0.png' },
        { Name: 'Burger King', Note: 4.4, Adress: '3 rue de la paix', user_id_user: 3, Image: 'https://www.burgerking.fr/sites/default/files/2021-03/Logo_BK_0.png' },
        { Name: 'Quick', Note: 4.1, Adress: '4 rue de la paix', user_id_user: 4, Image: 'https://www.quick.fr/sites/default/files/2021-03/Logo_Quick_0.png' }
    ]);
});

module.exports = { createRestaurant, getRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant, initRestaurants };