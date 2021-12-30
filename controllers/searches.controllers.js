const { ObjectId } = require('mongoose').Types;
const { User, Category, Product } = require('../models/index');

const allowedCollections = ['users', 'categories', 'products', 'roles'];

const searchUsers = async(query, res) => {
    try {
        const isMongoId = ObjectId.isValid(query);
        if (isMongoId) {
            const user = await User.findById(query);
            return res.status(200).json({
                result: (user) ? [user] : []
            });
        } else {
            const regex = new RegExp(query, 'i');
            const users = await User.find({
                $or: [{ name: regex }, { email: regex }],
                $and: [{ state: true }]
            });
            console.log(users);
            return res.status(200).json({
                result: users
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'something went wrong'
        });

    }

}
const searchCategories = async(query, res) => {
    try {
        const isMongoId = ObjectId.isValid(query);
        if (isMongoId) {
            const category = await Category.findById(query);
            return res.status(200).json({
                result: (category) ? [category] : []
            });
        } else {
            const regex = new RegExp(query, 'i');
            const categories = await Category.find({ name: regex, state: true });
            return res.status(200).json({
                result: categories
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'something went wrong'
        });

    }
}
const searchProducts = async(query, res) => {
    try {
        const isMongoId = ObjectId.isValid(query);
        if (isMongoId) {
            const product = await Product.findById(query).populate('category', 'name');
            return res.status(200).json({
                result: (product) ? [product] : []
            });
        } else {
            const regex = new RegExp(query, 'i');
            const products = await Product.find({ name: regex, state: true }).populate('category', 'name');
            return res.status(200).json({
                result: products
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'something went wrong'
        });
    }
}

const search = async(req, res) => {
    const { collection, query } = req.params;
    if (!allowedCollections.includes(collection)) {
        return res.status(400).json({
            message: `collection not allowed , allowed collections are ${allowedCollections}`
        });
    }

    switch (collection) {
        case 'users':
            searchUsers(query, res);
            break;
        case 'categories':
            searchCategories(query, res);
            break;
        case 'products':
            searchProducts(query, res);
            break;
        default:
            res.status(500).json({
                message: 'something went wrong'
            });
            break;
    }
}

module.exports = {
    search
}