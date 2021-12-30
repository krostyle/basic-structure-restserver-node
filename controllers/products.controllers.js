const { Product } = require("../models");

const createProduct = async(req, res) => {
    try {
        const { description, price, category } = req.body;
        const nameUpper = req.body.name.toUpperCase();
        const product = await Product.findOne({ name: nameUpper });
        if (product) {
            return res.status(400).send(`Product ${nameUpper} already exists`);
        }
        const productData = {
            name: nameUpper,
            description,
            price,
            category,
            user: req.user._id
        };
        const newProduct = new Product(productData);
        await newProduct.save();
        res.status(201).json({
            message: "Product created successfully",
            newProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error, error while creating product");
    }
}
const getProduct = async(req, res) => {
    try {
        const { id } = req.params;
        // console.log(id);
        const product = await Product.findById(id).populate("category", "name").populate("user", "name");
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.json(product);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error, error while getting product");
    }
}

const getProducts = async(req, res) => {
    try {
        const { limit = 5, skip = 0 } = req.query;
        const query = { state: true };
        const [products, total] = await Promise.all([
            Product.find(query).limit(Number(limit)).skip(Number(skip)).
            populate("category", "name").populate("user", "name"),
            Product.countDocuments(query)
        ]);
        res.json({
            products,
            total
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error, error while getting products");
    }
}
const updateProduct = async(req, res) => {
    try {
        const { id } = req.params;
        const { state, user, ...data } = req.body;
        if (data.name) {
            data.name = data.name.toUpperCase();
        }
        data.user = req.user._id
        const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });
        res.json({
            message: "Product updated successfully",
            updatedProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error, error while updating product");
    }
}
const deleteProduct = async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, { state: false }, { new: true });
        res.json({
            message: "Product deleted successfully",
            product
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error, error while deleting product");
    }
}


module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct
}