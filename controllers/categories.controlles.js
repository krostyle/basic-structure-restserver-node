const { Category } = require('../models/index');


const createCategory = async(req, res) => {
    try {
        const name = req.body.name.toUpperCase();
        const categoryDB = await Category.findOne({ name });
        if (categoryDB) {
            return res.status(400).json({
                message: `The category ${categoryDB.name} already exist`
            })
        }
        console.log(req.user);

        const categoryData = {
            name,
            user: req.user._id
        }

        const category = new Category(categoryData);
        await category.save();
        res.status(201).json({
            message: 'Category created successfully',
            category
        })

    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }

}

const getCategories = async(req, res) => {
    try {
        console.log(req.query);
        const { limit = 5, skip = 0 } = req.query;
        const query = { state: true };

        const [categories, total] = await Promise.all([
            Category.find(query).limit(Number(limit)).skip(Number(skip)).populate('user', 'name'),
            Category.countDocuments(query)
        ]);

        res.json({
            categories,
            total
        })


    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}

const getCategory = async(req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id).populate('user', 'name');
        res.json({
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}

const updateCategory = async(req, res) => {}

const deleteCategory = async(req, res) => {}





module.exports = {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory
}